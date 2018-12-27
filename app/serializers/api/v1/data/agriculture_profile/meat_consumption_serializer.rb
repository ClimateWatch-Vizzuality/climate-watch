module Api
  module V1
    module Data
      module AgricultureProfile
        class MeatConsumptionSerializer < ActiveModel::Serializer
          has_one :location
          attributes :year, :meat_consumption_1, :meat_consumption_2,
                     :meat_consumption_3, :meat_consumption_4, :meat_consumption_per_capita_1,
                     :meat_consumption_per_capita_2, :meat_consumption_per_capita_3,
                     :meat_consumption_per_capita_4
        end
      end
    end
  end
end
