require 'fileutils'
require 'zip'

# @abstract
# Superclass for zipped downloads
module Api
  module V1
    module Data
      class ZippedDownload
        attr_reader :download_name
        # @param download_name [String]
        def initialize(download_name)
          @download_name = download_name
          @temp_dir = "#{Rails.root}/tmp/#{Time.now.strftime('%Y%m%d%H%M%S')}"
          @data_entries = []
        end

        def add_file_content(content, filename)
          @data_entries << {content: content, name: filename}
        end

        # @return [String] compressed data
        def call
          FileUtils.mkdir_p(@temp_dir)
          compressed_stream = compress_data_entries
          compressed_stream.read
        ensure
          FileUtils.rm_rf(@temp_dir)
        end

        private

        def compress_data_entries
          compressed_stream = Zip::OutputStream.write_buffer do |stream|
            @data_entries.each do |entry|
              path = @temp_dir + '/' + entry[:name]
              File.open(path, 'w') { |f| f.write entry[:content] }
              stream.put_next_entry(entry[:name])
              stream.write File.read(path)
            end
          end
          compressed_stream.rewind
          compressed_stream
        end
      end
    end
  end
end
