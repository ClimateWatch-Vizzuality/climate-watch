require 'rails_helper'

RSpec.describe ImportNdcContent do
  subject { ImportNdcContent.new.call }
  before(:each) do
    @location = FactoryGirl.create(
      :location, iso_code3: 'AFG', wri_standard_name: 'Afghanistan'
    )
  end
  it 'Links NDC to correct location' do
    expect { subject }.to change { @location.ndcs.count }.by(1)
  end
end
