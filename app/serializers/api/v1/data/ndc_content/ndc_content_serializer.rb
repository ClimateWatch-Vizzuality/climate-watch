module Api
  module V1
    module Data
      module NdcContent
        class NdcContentSerializer < ActiveModel::Serializer
          attribute :id
          attribute(:country) { object['country'] }
          attribute(:iso_code3) { object['iso_code3'] }
          attribute(:indicator) { object['indicator'] }
          attribute(:value) { object['value'] }
          attribute(:source) { object['source'] }
          attribute(:categories) { object['categories'] }
          attribute(:label) { object['label'] }
          attribute(:sector) { object['sector'] }
        end
      end
    end
  end
end
