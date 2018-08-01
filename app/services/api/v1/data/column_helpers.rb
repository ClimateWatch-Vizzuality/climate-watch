module Api
  module V1
    module Data
      module ColumnHelpers
        extend ActiveSupport::Concern

        def column_aliases
          select_columns_map.map do |column_properties|
            column_properties[:alias]
          end
        end

        def column_manifest
          select_columns_map.map do |column_properties|
            sortable =
              if column_properties[:order].nil?
                true
              else
                column_properties[:order]
              end
            tmp = {
              name: column_properties[:alias],
              sortable: sortable
            }
            # rubocop:disable Style/IfUnlessModifier
            if @sorting_column == column_properties[:column]
              tmp[:current] = @sorting_direction
            end
            # rubocop:enable Style/IfUnlessModifier
            tmp
          end
        end

        private

        def alias_to_name(column_alias)
          tmp = select_columns_map.find do |column_properties|
            column_properties[:alias] == column_alias
          end
          tmp && tmp[:column]
        end

        def select_columns
          select_columns_map.map do |column_properties|
            column = column_properties[:column]
            column_alias = column_properties[:alias]
            if column != column_alias
              [column, 'AS', column_alias].join(' ')
            else
              column
            end
          end
        end

        def group_columns
          groupable_columns = select_columns_map.select do |column_properties|
            column_properties[:group].nil? || column_properties[:group] == true
          end
          groupable_columns.map do |column_properties|
            column_properties[:column]
          end
        end
      end
    end
  end
end
