# == Schema Information
#
# Table name: indc_adaptation_actions
#
#  id          :bigint           not null, primary key
#  location_id :bigint           not null
#  document_id :bigint           not null
#  title       :text             not null
#
FactoryBot.define do
  factory :indc_adaptation_action, class: 'Indc::AdaptationAction' do
    location
    association :document, factory: :indc_document
    title { 'Develop and promote resilient and sustainable water resources management' }
  end
end
