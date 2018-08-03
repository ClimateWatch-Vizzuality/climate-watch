module Api
  module V1
    module Data
      class NdcSdgFilter
        # @param params [Hash]
        # @option params [Array<String>] :countries
        # @option params [Array<Integer>] :goal_ids
        # @option params [Array<Integer>] :target_ids
        # @option params [Array<Integer>] :sector_ids
        def initialize(params)
          @query = ::NdcSdg::NdcTargetSector.
            joins(:sector, ndc_target: [{ndc: :location}, {target: :goal}])
          initialize_filters(params)
        end

        def call
          apply_filters
          @query.
            select(self.class.select_columns)
        end

        def self.column_aliases
          select_columns_with_aliases.map do |column, column_alias|
            column_alias || column
          end
        end

        def self.select_columns
          select_columns_with_aliases.map do |column, column_alias|
            if column_alias
              [column, 'AS', column_alias].join(' ')
            else
              column
            end
          end
        end

        private

        private_class_method def self.select_columns_with_aliases
          [
            ['id'],
            ['locations.iso_code3', 'iso_code3'],
            ['locations.wri_standard_name', 'country'],
            ['ndc_sdg_ndc_targets.indc_text', 'indc_text'],
            ['ndc_sdg_ndc_targets.status', 'status'],
            ['ndc_sdg_ndc_targets.climate_response', 'climate_response'],
            ['ndc_sdg_ndc_targets.type_of_information', 'type_of_information'],
            ['ndc_sdg_sectors.name', 'sector'],
            ['ndc_sdg_targets.number', 'target_number'],
            ['ndc_sdg_targets.title', 'target'],
            ['ndc_sdg_goals.number', 'goal_number'],
            ['ndc_sdg_goals.title', 'goal'],
            ['ndcs.document_type', 'document_type'],
            ['ndcs.language', 'document_language']
          ]
        end

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
