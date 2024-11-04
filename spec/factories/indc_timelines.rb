# == Schema Information
#
# Table name: indc_timelines
#
#  id          :bigint           not null, primary key
#  location_id :bigint           not null
#  submission  :string
#  date        :date
#  url         :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
FactoryBot.define do
  factory :indc_timeline, class: 'Indc::Timeline' do
    location
    submission { 'MySubmission' }
    date { '11/3/24' }
    url { 'http://internet.tld/path/file.ext' }
  end
end
