FactoryBot.define do
  factory :quantification_label, class: 'Quantification::Label' do
    sequence(:name) { |n| "#{2020 + n * 5} Low pledge" }
  end
end
