module Api
  module V1
    module Data
      class NdcSdgZippedDownload
        attr_reader :filename

        def initialize(filter)
          @filter = filter
          @metadata_filter = Api::V1::Data::MetadataFilter.new(
            source_names: ['ndc_sdc_all indicators']
          )
          @filename = 'ndc_sdg'
          @metadata_filename = 'sources.csv'
        end

        def call
          zipped_download = Api::V1::Data::ZippedDownload.new(@filename)
          zipped_download.add_file_content(
            Api::V1::Data::NdcSdgCsvContent.new(@filter).call,
            @filename + '.csv'
          )
          zipped_download.add_file_content(
            Api::V1::Data::MetadataCsvContent.new(@metadata_filter).call,
            @metadata_filename
          )
          zipped_download.call
        end
      end
    end
  end
end
