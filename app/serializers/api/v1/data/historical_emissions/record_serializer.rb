module Api
  module V1
    module Data
      module HistoricalEmissions
        class RecordSerializer < ActiveModel::Serializer
          attribute :id
          attribute(:region) { object['region'] }
          attribute(:iso_code3) { object['iso_code3'] }
          attribute(:data_source) { object['data_source'] }
          attribute(:sector) { object['sector'] }
          attribute(:gas) { object['gas'] }
          attribute(:unit) { "MtCO\u2082e" }
          attribute(:emissions)
        end
      end
    end
  end
end
