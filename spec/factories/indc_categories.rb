FactoryGirl.define do
  factory :indc_category, class: 'Indc::Category' do
    name 'MyName'
    sequence :slug { |n| 'my-slug-' + ('AA'..'ZZ').to_a[n] }
    association :category_type, factory: :indc_category_type
  end
end
