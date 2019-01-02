module Api
  module V1
    module Data
      module AgricultureProfile
        class AreaSerializer < ActiveModel::Serializer
          attributes :location_id, :year, :share_in_land_area_1, :share_in_land_area_2,
                     :share_in_land_area_3, :share_in_land_area_4, :share_in_agricultural_area_1,
                     :share_in_agricultural_area_2, :share_in_agricultural_area_3
        end
      end
    end
  end
end
