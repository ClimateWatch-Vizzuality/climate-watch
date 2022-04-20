# == Schema Information
#
# Table name: indc_sectors
#
#  id         :bigint           not null, primary key
#  parent_id  :bigint
#  name       :text             not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
FactoryBot.define do
  factory :indc_sector, class: 'Indc::Sector' do
    name { 'MyName' }
    sector_type { 'lts' }
  end
end
