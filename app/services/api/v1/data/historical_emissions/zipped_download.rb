module Api
  module V1
    module Data
      module HistoricalEmissions
        class ZippedDownload
          attr_reader :filename

          def initialize(filter, params)
            @filter = filter
            initialize_metadata_filter(params)

            @filename = 'historical_emissions'
            @metadata_filename = 'sources.csv'
          end

          def call
            zipped_download = Api::V1::Data::ZippedDownload.new(@filename)
            zipped_download.add_file_content(
              Api::V1::Data::HistoricalEmissions::CsvContent.new(@filter).call,
              @filename + '.csv'
            )
            zipped_download.add_file_content(
              Api::V1::Data::Metadata::CsvContent.new(@metadata_filter).call,
              @metadata_filename
            )
            zipped_download.call
          end

          private

          def initialize_metadata_filter(params)
            source_names =
              if params[:source_ids].present?
                sources = ::HistoricalEmissions::DataSource.where(
                  id: params[:source_ids]
                )
                sources.pluck(:name).map do |name|
                  "historical_emissions_#{name.downcase}" # careful UNFCCC
                end
              else
                %w(
                  historical_emissions_pik
                  historical_emissions_climate_watch
                  historical_emissions_unfccc
                )
              end
            @metadata_filter = Api::V1::Data::Metadata::Filter.new(
              source_names: source_names
            )
          end
        end
      end
    end
  end
end
