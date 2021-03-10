# == Schema Information
#
# Table name: quantification_labels
#
#  id         :bigint           not null, primary key
#  name       :text             not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
FactoryBot.define do
  factory :quantification_label, class: 'Quantification::Label' do
    sequence(:name) { |n| "#{2020 + n * 5} Low pledge" }
  end
end
