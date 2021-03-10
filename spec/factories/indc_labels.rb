# == Schema Information
#
# Table name: indc_labels
#
#  id           :bigint           not null, primary key
#  indicator_id :bigint           not null
#  value        :text             not null
#  index        :integer          not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  slug         :string
#
FactoryBot.define do
  factory :indc_label, class: 'Indc::Label' do
    association :indicator, factory: :indc_indicator
    value { 'MyLabel' }
    sequence(:index) { |n| (0..99).to_a[n] }
  end
end
