# == Schema Information
#
# Table name: quantification_values
#
#  id           :bigint           not null, primary key
#  location_id  :bigint
#  label_id     :bigint
#  year         :integer
#  first_value  :float
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  second_value :float
#
FactoryBot.define do
  factory :quantification_value, class: 'Quantification::Value' do
    location
    association :label, factory: :quantification_label
    year { '2025' }
    first_value { 1.5 }
  end
end
