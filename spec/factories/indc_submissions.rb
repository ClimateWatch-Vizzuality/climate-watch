FactoryBot.define do
  factory :indc_submission, class: 'Indc::Submission' do
    location
    submission_type 'MySubmissionType'
    language 'my-lang'
    url 'http://internet.tld/path/file.ext'
  end
end
