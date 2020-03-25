module Api
  module V1
    module Indc
      class CountriesDocumentsSerializer < ActiveModel::Serializer
        has_many :data, serializer: CountryDocumentSerializer

        attributes :documents, :laws, :policies

        def documents
          ::Indc::Document.order(:ordering)
        end

        def laws
          {}
        end

        def policies
          {}
        end
      end
    end
  end
end
