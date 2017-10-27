FactoryGirl.define do
  factory :indc_sector, class: 'Indc::Sector' do
    name 'MyName'
    sequence :slug { |n| "my-slug-" + ('AA'..'ZZ').to_a[n] }
  end
end
