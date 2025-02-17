module Api
  module V1
    module Data
      module NdcContent
        class CountryEmissionSerializer < ActiveModel::Serializer
          belongs_to :location

          attributes :id, :location_id, :historical_cw1990, :historical_cw2005, :historical_cw2018,
                     :targets_nfgs_uc2030, :targets_nfgs_c2030, :targets_nfgs_uc2035, :targets_nfgs_c2035,
                     :baseline1990_2030_uc, :baseline1990_2030_uc_percentage, :baseline1990_2035_uc,
                     :baseline1990_2035_uc_percentage, :baseline1990_2035_c, :baseline1990_2035_c_percentage,
                     :baseline2005_2030_uc, :baseline2005_2030_uc_percentage, :baseline2005_2035_uc,
                     :baseline2005_2035_uc_percentage, :baseline2005_2035_c, :baseline2005_2035_c_percentage,
                     :baseline2018_2030_uc, :baseline2018_2030_uc_percentage, :baseline2018_2035_uc,
                     :baseline2018_2035_uc_percentage, :baseline2018_2035_c, :baseline2018_2035_c_percentage,
                     :absolute_emissions_comparison_c, :absolute_emissions_comparison_uc, :created_at,
                     :updated_at
        end
      end
    end
  end
end
