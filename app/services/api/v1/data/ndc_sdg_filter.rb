module Api
  module V1
    module Data
      class NdcSdgFilter
        include Api::V1::Data::SanitisedSorting
        include Api::V1::Data::ColumnHelpers

        # @param params [Hash]
        # @option params [Array<String>] :countries
        # @option params [Array<Integer>] :goal_ids
        # @option params [Array<Integer>] :target_ids
        # @option params [Array<Integer>] :sector_ids
        # @option params [String] :sort_col
        # @option params [String] :sort_dir
        def initialize(params)
          initialize_filters(params)
          initialise_sorting(params[:sort_col], params[:sort_dir])
          @query = ::NdcSdg::NdcTargetSector.
            joins(:sector, ndc_target: [{ndc: :location}, {target: :goal}])
        end

        def call
          dict_columns = [:status, :climate_response, :type_of_information]
          dict_query = @query.select(
            dict_columns.map { |column| "INITCAP(#{column}) AS #{column}" }
          )
          @dict = Hash[dict_columns.map do |column|
            [column, dict_query.map(&column).compact.uniq.sort]
          end]
          apply_filters
          @query.
            select(select_columns).
            order(sanitised_order)
        end

        def meta
          @dict.merge(sorting_manifest).merge(column_manifest)
        end

        private

        # rubocop:disable Metrics/MethodLength
        def select_columns_map
          [
            {
              column: 'id',
              alias: 'id',
              visible: false
            },
            {
              column: 'locations.iso_code3',
              alias: 'iso_code3'
            },
            {
              column: 'locations.wri_standard_name',
              alias: 'country'
            },
            {
              column: 'ndc_sdg_ndc_targets.indc_text',
              alias: 'indc_text'
            },
            {
              column: 'ndc_sdg_ndc_targets.status',
              alias: 'status'
            },
            {
              column: 'ndc_sdg_ndc_targets.climate_response',
              alias: 'climate_response'
            },
            {
              column: 'ndc_sdg_ndc_targets.type_of_information',
              alias: 'type_of_information'
            },
            {
              column: 'ndc_sdg_sectors.name',
              alias: 'sector'
            },
            {
              column: 'ndc_sdg_targets.number',
              alias: 'target_number'
            },
            {
              column: 'ndc_sdg_targets.title',
              alias: 'target'
            },
            {
              column: 'ndc_sdg_goals.number',
              alias: 'goal_number'
            },
            {
              column: 'ndc_sdg_goals.title',
              alias: 'goal'
            },
            {
              column: 'ndcs.document_type',
              alias: 'document_type'
            },
            {
              column: 'ndcs.language',
              alias: 'document_language'
            }
          ]
        end
        # rubocop:enable Metrics/MethodLength

        def initialize_filters(params)
          # integer arrays
          [
            :goal_ids, :target_ids, :sector_ids
          ].map do |param_name|
            if params[param_name].present? && params[param_name].is_a?(Array)
              value = params[param_name].map(&:to_i)
            end
            instance_variable_set(:"@#{param_name}", value)
          end
          @countries = params[:countries]
        end

        def apply_filters
          apply_location_filter
          # rubocop:disable Style/IfUnlessModifier
          if @goal_ids
            @query = @query.where('ndc_sdg_targets.goal_id' => @goal_ids)
          end
          # rubocop:enable Style/IfUnlessModifier
          if @target_ids
            @query = @query.where(
              'ndc_sdg_ndc_targets.target_id' => @target_ids
            )
          end
          @query = @query.where(sector_id: @sector_ids) if @sector_ids
        end

        def apply_location_filter
          return unless @countries
          @query = @query.where(
            'locations.iso_code3' => @countries
          )
        end
      end
    end
  end
end
