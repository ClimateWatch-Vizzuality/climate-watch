module Api
  module V1
    module Data
      module AgricultureProfile
        class MeatProductionSerializer < ActiveModel::Serializer
          attributes :location_id,:year, :production_agr_1, :production_agr_2,
                     :production_agr_3, :production_agr_4, :production_agr_5,
                     :production_agr_6, :production_agr_7,
                     :production_agr_8, :production_agr_9, :production_agr_10,
                     :iso_code3

          def iso_code3
            object.location&.iso_code3
          end
        end
      end
    end
  end
end
