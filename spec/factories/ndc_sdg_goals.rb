FactoryGirl.define do
  factory :ndc_sdg_goal, class: 'NdcSdg::Goal' do
    sequence :number { |n| ('00'..'99').to_a[n] }
    title 'End poverty in all its forms everywhere'
    cw_title 'No poverty'
    colour '#000000'
  end
end
