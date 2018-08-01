module Api
  module V1
    module Data
      module SanitisedSorting
        extend ActiveSupport::Concern
        SORTING_DIRECTIONS = %w(ASC DESC).freeze
        DEFAULT_SORTING_DIRECTION = 'ASC'.freeze

        private

        def sanitised_order
          @query.klass.send(
            :sanitize_sql_for_order,
            "#{@sorting_column} #{@sorting_direction}"
          )
        end

        def initialise_sorting(column, direction)
          @sorting_column = sanitise_sorting_column(column)
          @sorting_direction = sanitise_sorting_direction(direction)
        end

        def sanitise_sorting_column(column)
          return default_sorting_column unless column.present?
          column = column.downcase
          # rubocop:disable Style/IfUnlessModifier
          if available_sorting_columns.include?(column)
            return alias_to_name(column)
          end
          # rubocop:enable Style/IfUnlessModifier
          default_sorting_column
        end

        def sanitise_sorting_direction(direction)
          return DEFAULT_SORTING_DIRECTION unless direction
          direction = direction.upcase
          return direction if SORTING_DIRECTIONS.include?(direction)
          DEFAULT_SORTING_DIRECTION
        end

        def default_sorting_column
          if available_sorting_columns.include? 'iso_code3'
            alias_to_name('iso_code3')
          else
            available_sorting_columns.first
          end
        end

        def available_sorting_columns
          column_aliases
        end
      end
    end
  end
end
