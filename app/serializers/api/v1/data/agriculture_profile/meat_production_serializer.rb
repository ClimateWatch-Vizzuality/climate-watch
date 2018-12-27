module Api
  module V1
    module Data
      module AgricultureProfile
        class MeatProductionSerializer < ActiveModel::Serializer
          has_one :location
          attributes :year, :production_agr_1, :production_agr_2,
                     :production_agr_3, :production_agr_4, :production_agr_5,
                     :production_agr_6, :production_agr_7,
                     :production_agr_8, :production_agr_9, :production_agr_10
        end
      end
    end
  end
end
