module Api
  module V1
    module Indc
      class CountryDocumentSerializer < ActiveModel::Serializer
        attributes :iso_code3, :slugs

        def slugs
          ::Indc::Document.joins(values: :location).
            where(locations: {iso_code3: object.iso_code3}).
            order(:ordering).distinct
        end
      end
    end
  end
end
