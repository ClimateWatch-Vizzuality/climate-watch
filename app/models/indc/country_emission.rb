# == Schema Information
#
# Table name: indc_country_emissions
#
#  id                                :bigint           not null, primary key
#  location_id                       :bigint           not null
#  historical_cw1990                 :float
#  historical_cw2005                 :float
#  historical_cw2018                 :float
#  targets_nfgs_uc2030               :float
#  targets_nfgs_c2030                :float
#  targets_nfgs_uc2035               :float
#  targets_nfgs_c2035                :float
#  baseline1990_2030_uc              :float
#  baseline1990_2030_uc_percentage   :float
#  baseline1990_2035_uc              :float
#  baseline1990_2035_uc_percentage   :float
#  baseline1990_2035_c               :float
#  baseline1990_2035_c_percentage    :float
#  baseline2005_2030_uc              :float
#  baseline2005_2030_uc_percentage   :float
#  baseline2005_2035_uc              :float
#  baseline2005_2035_uc_percentage   :float
#  baseline2005_2035_c               :float
#  baseline2005_2035_c_percentage    :float
#  baseline2018_2030_uc              :float
#  baseline2018_2030_uc_percentage   :float
#  baseline2018_2035_uc              :float
#  baseline2018_2035_uc_percentage   :float
#  baseline2018_2035_c               :float
#  baseline2018_2035_c_percentage    :float
#  absolute_emissions_comparison_c   :float
#  absolute_emissions_comparison_uc  :float
#  total_emissions                   :float
#  latest_ndc                        :text
#  historical_cw2019                 :float
#  baseline2019_2030_uc              :float
#  baseline2019_2030_uc_percentage   :float
#  baseline2019_2035_uc              :float
#  baseline2019_2035_uc_percentage   :float
#  baseline2019_2035_c               :float
#  baseline2019_2035_c_percentage    :float
#  baseline1990_2030_c               :float
#  baseline2005_2030_c               :float
#  baseline2019_2030_c               :float
#  baseline1990_2030_c_percentage    :float
#  baseline2005_2030_c_percentage    :float
#  baseline2019_2030_c_percentage    :float
#  created_at                        :datetime         not null
#  updated_at                        :datetime         not null
#
module Indc
  class CountryEmission < ApplicationRecord
    belongs_to :location

    validates :location, presence: true
    validates :historical_cw1990, :historical_cw2005, :historical_cw2018,
              :targets_nfgs_uc2030, :targets_nfgs_c2030, :targets_nfgs_uc2035, :targets_nfgs_c2035,
              :baseline1990_2030_uc, :baseline1990_2030_uc_percentage, :baseline1990_2035_uc,
              :baseline1990_2035_uc_percentage, :baseline1990_2035_c, :baseline1990_2035_c_percentage,
              :baseline2005_2030_uc, :baseline2005_2030_uc_percentage, :baseline2005_2035_uc,
              :baseline2005_2035_uc_percentage, :baseline2005_2035_c, :baseline2005_2035_c_percentage,
              :baseline2018_2030_uc, :baseline2018_2030_uc_percentage, :baseline2018_2035_uc,
              :baseline2018_2035_uc_percentage, :baseline2018_2035_c, :baseline2018_2035_c_percentage,
              :absolute_emissions_comparison_c, :absolute_emissions_comparison_uc, :total_emissions,
              :historical_cw2019, :baseline2019_2030_uc, :baseline2019_2030_uc_percentage,
              :baseline2019_2035_uc, :baseline2019_2035_uc_percentage, :baseline2019_2035_c,
              :baseline2019_2035_c_percentage,
              :baseline1990_2030_c,
              :baseline2005_2030_c,
              :baseline2019_2030_c,
              :baseline1990_2030_c_percentage,
              :baseline2005_2030_c_percentage,
              :baseline2019_2030_c_percentage,
              numericality: {allow_nil: true}
  end
end
