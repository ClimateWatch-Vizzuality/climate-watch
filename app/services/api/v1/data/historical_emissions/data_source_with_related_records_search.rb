module Api
  module V1
    module Data
      module HistoricalEmissions
        class DataSourceWithRelatedRecordsSearch
          def call
            data_sources.map do |source|
              source.
                slice(:id, :name, :display_name, :metadata_dataset).
                merge(related_records[source.id] || {})
            end
          end

          private

          def data_sources
            ::HistoricalEmissions::DataSource.all
          end

          def related_records
            @related_records ||= ::HistoricalEmissions::Record.
              select(
                <<-SQL
              data_source_id,
              ARRAY_AGG(DISTINCT sector_id) AS sector_ids,
              ARRAY_AGG(DISTINCT gas_id) AS gas_ids,
              ARRAY_AGG(DISTINCT location_id) AS location_ids
            SQL
              ).
              group('data_source_id').
              as_json.
              map { |h| [h['data_source_id'], h.symbolize_keys.except(:id)] }.
              to_h
          end
        end
      end
    end
  end
end
