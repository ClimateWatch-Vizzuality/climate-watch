module Api
  module V1
    module Data
      class NetZeroContentController < Api::V1::Data::NdcContentController
        private

        def meta_links
          [:data_sources, :indicators, :categories]
        end

        def zip_filename
          'net_zero_content'
        end

        def link_prefix
          '/api/v1/data/net_zero_content/'
        end

        def parametrise_filter
          params[:source_ids] = ::Indc::Source.net_zero.pluck(:id)
          @filter = Data::NdcContent::Filter.new(params)
        end
      end
    end
  end
end
