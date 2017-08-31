module Api
  module V1
    class NdcFullTextSerializer < ActiveModel::Serializer
      include Rails.application.routes.url_helpers

      attributes :iso_code3, :links, :html

      def iso_code3
        object.location.try(:iso_code3)
      end

      def links
        {self: full_api_v1_ndc_path(code: iso_code3)}
      end

      def html
        if query_present?
          object.pg_search_highlight.html_safe
        else
          object.full_text.html_safe
        end
      end

      def query_present?
        @instance_options[:query].present?
      end
    end
  end
end
