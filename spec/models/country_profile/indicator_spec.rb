require 'rails_helper'

RSpec.describe CountryProfile::Indicator, type: :model do
  subject { build(:country_profile_indicator) }

  it { is_expected.to be_valid }

  it 'should be invalid when slug not present' do
    subject.slug = nil
    expect(subject).to have(1).errors_on(:slug)
  end
end
