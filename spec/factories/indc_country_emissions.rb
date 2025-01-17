# == Schema Information
#
# Table name: indc_country_emissions
#
#  id                                :bigint           not null, primary key
#  location_id                       :bigint
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
#  created_at                        :datetime         not null
#  updated_at                        :datetime         not null
#
FactoryBot.define do
  factory :indc_country_emission, class: 'Indc::CountryEmission' do
    location
    historical_cw1990 { 10.5 }
    historical_cw2005 { 20.3 }
    historical_cw2018 { 30.7 }
    targets_nfgs_uc2030 { 40.1 }
    targets_nfgs_c2030 { 50.2 }
    targets_nfgs_uc2035 { 60.3 }
    targets_nfgs_c2035 { 70.4 }
    baseline1990_2030_uc { 80.5 }
    baseline1990_2030_uc_percentage { 90.6 }
    baseline1990_2035_uc { 100.7 }
    baseline1990_2035_uc_percentage { 110.8 }
    baseline1990_2035_c { 120.9 }
    baseline1990_2035_c_percentage { 130.0 }
    baseline2005_2030_uc { 140.1 }
    baseline2005_2030_uc_percentage { 150.2 }
    baseline2005_2035_uc { 160.3 }
    baseline2005_2035_uc_percentage { 170.4 }
    baseline2005_2035_c { 180.5 }
    baseline2005_2035_c_percentage { 190.6 }
    baseline2018_2030_uc { 200.7 }
    baseline2018_2030_uc_percentage { 210.8 }
    baseline2018_2035_uc { 220.9 }
    baseline2018_2035_uc_percentage { 230.0 }
    baseline2018_2035_c { 240.1 }
    baseline2018_2035_c_percentage { 250.2 }
    absolute_emissions_comparison_c { 260.3 }
    absolute_emissions_comparison_uc { 270.4 }
    created_at { '2026-01-14 10:45:37' }
    updated_at { '2026-01-14 10:45:38' }
  end
end
