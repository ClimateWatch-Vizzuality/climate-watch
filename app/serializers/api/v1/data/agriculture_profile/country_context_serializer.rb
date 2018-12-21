module Api
  module V1
    module Data
      module AgricultureProfile
        class CountryContextSerializer < ActiveModel::Serializer
          has_one :location
          attributes :year, :employment_agri_female, :employment_agri_male,
                     :employment_agri_total, :total_pesticides_use, :total_fertilizers,
                     :water_withdrawal, :water_withdrawal_rank, :value_added_agr
        end
      end
    end
  end
end
