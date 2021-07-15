require 'rails_helper'

RSpec.describe ZipFile, type: :model do
  subject { FactoryBot.build(:zip_file) }

  it { is_expected.to be_valid }

  it 'should be invalid without dropdown title' do
    subject.dropdown_title = nil
    expect(subject).to have(1).errors_on(:dropdown_title)
  end

  it 'should be invalid without zip_filename' do
    subject.zip_filename = nil
    expect(subject).to have(1).errors_on(:zip_filename)
  end
end
