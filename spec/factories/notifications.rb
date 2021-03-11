FactoryBot.define do
  factory :notification do
    description { '<div> Some Lorem Ipsum dolor</div>' }
    date { 2.days.ago }
  end
end
