# == Schema Information
#
# Table name: indc_sources
#
#  id         :bigint           not null, primary key
#  name       :text             not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
FactoryBot.define do
  factory :indc_source, class: 'Indc::Source' do
    name { 'CAIT' }

    initialize_with { Indc::Source.find_or_create_by(name: name) }
  end
end
