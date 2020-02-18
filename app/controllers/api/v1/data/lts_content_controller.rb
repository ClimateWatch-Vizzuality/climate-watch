module Api
  module V1
    module Data
      class LtsContentController < Api::V1::Data::NdcContentController
        private

        def link_prefix
          '/api/v1/data/lts_content/'
        end

        def parametrise_filter
          params[:source_ids] = ::Indc::Source.lts.pluck(:id)
          @filter = Data::NdcContent::Filter.new(params)
        end
      end
    end
  end
end
