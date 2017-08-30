module Api
  module V1
    class NdcFullTextSerializer < ActiveModel::Serializer
      include Rails.application.routes.url_helpers

      attributes :iso_code3, :links

      def iso_code3
        object.location.try(:iso_code3)
      end

      def links
        { self: full_api_v1_ndc_path(code: iso_code3) }
      end
    end
  end
end
