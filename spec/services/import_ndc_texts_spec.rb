require 'rails_helper'

RSpec.describe ImportNdcTexts do
  subject { ImportNdcTexts.new.call }

  before :all do
    Aws.config[:s3] = {
      stub_responses: {
        list_objects: {
          contents: [
            {key: 'new_ndcs/AFG-INDC-EN.html'},
            {key: 'new_ndcs/ALB-INDC-EN.html'}
          ]
        }
      }
    }
  end

  before(:each) do
    @location = FactoryGirl.create(
      :location, iso_code3: 'AFG', wri_standard_name: 'Afghanistan'
    )
  end

  after :all do
    Aws.config[:s3] = {
      stub_responses: nil
    }
  end

  it 'Links NDC to correct location' do
    expect { subject }.to change { @location.ndcs.count }.by(1)
  end
end
