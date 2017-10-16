FactoryGirl.define do
  factory :ndc_sdg_ndc_target, class: 'NdcSdg::NdcTarget' do
    ndc
    association :target, factory: :ndc_sdg_target
    indc_text 'MyText'
    status 'MyText'
    climate_response 'MyText'
    type_of_information 'MyText'
  end
end
