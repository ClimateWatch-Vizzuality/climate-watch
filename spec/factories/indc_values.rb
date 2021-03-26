# == Schema Information
#
# Table name: indc_values
#
#  id           :bigint           not null, primary key
#  indicator_id :bigint           not null
#  location_id  :bigint           not null
#  sector_id    :bigint
#  label_id     :bigint
#  value        :text             not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  document_id  :bigint
#
FactoryBot.define do
  factory :indc_value, class: 'Indc::Value' do
    location
    association :indicator, factory: :indc_indicator
    association :label, factory: :indc_label
    association :sector, factory: :indc_sector
    association :document, factory: :indc_document
    value { 'myvalue' }
  end
end
