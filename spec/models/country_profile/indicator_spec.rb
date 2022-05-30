# == Schema Information
#
# Table name: country_profile_indicators
#
#  id              :bigint           not null, primary key
#  slug            :string           not null
#  name            :string
#  short_name      :string
#  metadata_source :string
#  file            :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
require 'rails_helper'

RSpec.describe CountryProfile::Indicator, type: :model do
  subject { build(:country_profile_indicator) }

  it { is_expected.to be_valid }

  it 'should be invalid when slug not present' do
    subject.slug = nil
    expect(subject).to have(1).errors_on(:slug)
  end
end
