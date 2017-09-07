FactoryGirl.define do
  factory :ndc_sdg_goal, class: 'NdcSdg::Goal' do
    number '1'
    title 'End poverty in all its forms everywhere'
    cw_title 'No poverty'
    colour '#000000'
  end
end
