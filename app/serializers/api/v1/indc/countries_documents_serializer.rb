module Api
  module V1
    module Indc
      class CountriesDocumentsSerializer < ActiveModel::Serializer
        attributes :documents, :laws, :policies, :data

        def data
          result = object.data.map do |datum|
            [datum.iso_code3,
             ::Indc::Document.joins(values: :location).
             where(locations: {iso_code3: datum.iso_code3}).
             order(:ordering).distinct.to_a
             ]
          end.to_h
          result
        end

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
