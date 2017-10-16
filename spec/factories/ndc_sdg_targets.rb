FactoryGirl.define do
  factory :ndc_sdg_target, class: 'NdcSdg::Target' do
    association :goal, factory: :ndc_sdg_goal
    sequence :number { |n| ('00'..'99').to_a[n] }
    title <<~EOT
      'By 2030, eradicate extreme poverty for all people everywhere, currently measured as people living on less than $1.25 a day'
    EOT
  end
end
