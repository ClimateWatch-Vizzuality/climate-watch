module Api
  module V1
    module Data
      module ColumnHelpers
        extend ActiveSupport::Concern

        def column_aliases
          visible_columns.map do |column_properties|
            column_properties[:alias]
          end
        end

        def column_display_names
          visible_columns.map do |column_properties|
            column_properties[:display] || column_properties[:alias]&.humanize
          end
        end

        def column_manifest
          sortable_columns = select_columns_map.select do |column_properties|
            if column_properties[:order].nil? || column_properties[:order]
              true
            else
              column_properties[:order]
            end
          end
          {columns: sortable_columns.map { |cp| cp[:alias] }}
        end

        private

        def visible_columns
          select_columns_map.select do |column_properties|
            column_properties[:visible].nil? || column_properties[:visible] == true
          end
        end

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
