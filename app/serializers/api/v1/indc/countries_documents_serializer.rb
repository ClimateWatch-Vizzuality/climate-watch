module Api
  module V1
    module Indc
      class CountriesDocumentsSerializer < ActiveModel::Serializer
        attributes :documents, :laws, :policies, :data

        def data
          object.data.map do |datum|
            [datum.iso_code3,
             ::Indc::Document.joins(values: :location).
             where(locations: {iso_code3: datum.iso_code3}).
             order(:ordering).distinct.to_a
             ]
          end.to_h
        end

        def documents
          ::Indc::Document.order(:ordering).map do |d|
            locs = Location.where(id: ::Indc::Value.select(:location_id).where(document_id: d.id).distinct.pluck(:location_id))
            total_countries = if locs.where(iso_code3: 'EUU').any?
                                # sum the 26 countries plus EUU entry to sum 27 countries in the EU
                                # to avoid double counting
                                locs.where(is_in_eu: [nil, false]).count + 26
                              else
                                locs.count
                              end
            {
              id: d.id,
              ordering: d.ordering,
              slug: d.slug,
              long_name: d.long_name,
              description: d.description,
              is_ndc: d.is_ndc,
              total_countries: total_countries
            }
          end
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
