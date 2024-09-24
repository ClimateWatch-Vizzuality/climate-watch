module Api
  module V1
    module Data
      module NdcContent
        class TimelinesController < Api::V1::Data::ApiController
          def index
            timelines = ::Indc::Timeline.includes(:location)
            timelines = timelines.where(location_id: params[:location_id]) if params[:location_id]
            timelines = timelines.where("date >= ?", params[:date_from]) if params[:date_from]
            timelines = timelines.where("date <= ?", params[:date_to]) if params[:date_to]
            render json: timelines,
                   adapter: :json,
                   each_serializer: Api::V1::Data::NdcContent::TimelineSerializer,
                   root: :data
          end
        end
      end
    end
  end
end
