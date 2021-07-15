module Api
  module V1
    class ZipFilesController < ApiController
      def index
        render json: {
          data: ZipFile.all.order(:created_at).map { |f| f.as_json(only: [:dropdown_title], methods: [:url, :size]) }
        }
      end
    end
  end
end
