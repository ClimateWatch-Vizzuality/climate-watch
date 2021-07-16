module Api
  module V1
    class ZipFilesController < ApiController
      def index
        render json: ZipFile.all.order(:created_at),
               adapter: :json,
               each_serializer: Api::V1::ZipFileSerializer,
               root: :data
      end
    end
  end
end
