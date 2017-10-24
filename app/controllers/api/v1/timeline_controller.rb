module Api
  module V1
    class TimelineController < ApiController
      def index
        documents = ::Timeline::Document.
          includes(:source, :location, :notes).
          order(:date).
          all

        render json: documents,
               each_serializer: Api::V1::Timeline::DocumentSerializer,
               show_location: true
      end

      def show
        location = Location.find_by!(iso_code3: params[:code])
        documents = ::Timeline::Document.
          includes(:source, :notes).
          where(location: location).
          order(:date).
          all

        render json: documents,
               each_serializer: Api::V1::Timeline::DocumentSerializer,
               show_location: false
      end
    end
  end
end
