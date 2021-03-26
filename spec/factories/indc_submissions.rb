# == Schema Information
#
# Table name: indc_submissions
#
#  id              :bigint           not null, primary key
#  location_id     :bigint           not null
#  submission_type :text             not null
#  language        :text             not null
#  submission_date :date             not null
#  url             :text             not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  document_id     :bigint
#
FactoryBot.define do
  factory :indc_submission, class: 'Indc::Submission' do
    location
    submission_type { 'MySubmissionType' }
    language { 'my-lang' }
    url { 'http://internet.tld/path/file.ext' }
  end
end
