FactoryGirl.define do
  factory :indc_category_type, class: 'Indc::CategoryType' do
    sequence :name { |n| "My Name " + ('AA'..'ZZ').to_a[n] }
  end
end

