# == Schema Information
#
# Table name: ndc_sdg_sectors
#
#  id         :bigint           not null, primary key
#  name       :text
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
FactoryBot.define do
  factory :ndc_sdg_sector, class: 'NdcSdg::Sector' do
    name { 'MyText' }
  end
end
