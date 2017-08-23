require 'rails_helper'

RSpec.describe ImportLocations do
  before(:each) do
    Aws.config[:s3][:stub_responses][:get_object] = {
      body: <<~END
        iso_code3,iso_code2,pik_name,cait_name,ndcp_navigators_name,wri_standard_name,unfccc_group,location_type,show_in_cw
        ABW,,Aruba,,,,,COUNTRY,No
      END
    }
  end

  subject { ImportLocations.new.call }

  it 'Creates a new location' do
    expect { subject }.to change { Location.count }.by(1)
  end
end
