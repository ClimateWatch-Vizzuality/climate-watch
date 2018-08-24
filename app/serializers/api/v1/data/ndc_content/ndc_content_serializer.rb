module Api
  module V1
    module Data
      module NdcContent
        class NdcContentSerializer < ActiveModel::Serializer
          attribute :id
          attribute(:source) { object['source'] }
          attribute(:iso_code3) { object['iso_code3'] }
          attribute(:country) { object['country'] }
          attribute(:global_category) { object['global_category'] }
          attribute(:overview_category) { object['overview_category'] }
          attribute(:sector) { object['sector'] }
          attribute(:indicator_id) { object['indicator_slug'] }
          attribute(:indicator_name) { object['indicator_name'] }
          attribute(:value) { object['value'] }
        end
      end
    end
  end
end
