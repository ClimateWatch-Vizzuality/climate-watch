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
require 'rails_helper'

describe Indc::Submission, type: :model do
  it 'should be invalid when location not present' do
    expect(
      FactoryBot.build(:indc_submission, location: nil)
    ).to have(1).errors_on(:location)
  end

  it 'should be invalid when submission_type not present' do
    expect(
      FactoryBot.build(:indc_submission, submission_type: nil)
    ).to have(1).errors_on(:submission_type)
  end

  it 'should be invalid when language not present' do
    expect(
      FactoryBot.build(:indc_submission, language: nil)
    ).to have(1).errors_on(:language)
  end

  it 'should be invalid when url not present' do
    expect(
      FactoryBot.build(:indc_submission, url: nil)
    ).to have(2).errors_on(:url)
  end

  it 'should be invalid when url present but invalid' do
    expect(
      FactoryBot.build(:indc_submission, url: 'not an url')
    ).to have(1).errors_on(:url)
  end
end
