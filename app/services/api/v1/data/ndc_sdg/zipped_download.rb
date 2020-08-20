module Api
  module V1
    module Data
      module NdcSdg
        class ZippedDownload
          attr_reader :filename

          def initialize(filter)
            @filter = filter
            @metadata_filter = Api::V1::Data::Metadata::Filter.new(
              source_names: ['ndc_sdg_all indicators']
            )
            @filename = 'ndc_sdg'
            @metadata_filename = 'sources.csv'
          end

          def call
            zipped_download = Api::V1::Data::ZippedDownload.new(@filename)
            zipped_download.add_file_content(
              Api::V1::Data::NdcSdg::CsvContent.new(@filter).call,
              @filename + '.csv'
            )
            zipped_download.add_file_content(
              Api::V1::Data::Metadata::CsvContent.new(@metadata_filter).call,
              @metadata_filename
            )
            zipped_download.call
          end
        end
      end
    end
  end
end
