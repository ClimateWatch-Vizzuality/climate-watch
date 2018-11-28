module Api
  module V1
    module Data
      module NdcContent
        class ZippedDownload
          attr_reader :filename

          def initialize(filter)
            @filter = filter
            @metadata_filter = Api::V1::Data::Metadata::Filter.new(
              source_names: %w(ndc_cait ndc_wb ndc_die)
            )
            @filename = 'ndc_content'
            @metadata_filename = 'sources.csv'
          end

          def call
            zipped_download = Api::V1::Data::ZippedDownload.new(@filename)
            zipped_download.add_file_content(
              Api::V1::Data::NdcContent::CsvContent.new(@filter).call,
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
