FactoryGirl.define do
  factory :indc_source, class: 'Indc::Source' do
    sequence :name { |n| 'My Name ' + ('AA'..'ZZ').to_a[n] }
  end
end
