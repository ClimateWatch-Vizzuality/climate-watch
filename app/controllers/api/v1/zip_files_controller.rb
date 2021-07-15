module Api
  module V1
    class ZipFilesController < ApiController
      def index
        render json: {
          data: ZipFile.all.map { |f| f.as_json(only: [:dropdown_title], methods: [:url]) }
        }
      end
    end
  end
end
