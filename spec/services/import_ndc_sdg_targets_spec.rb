require 'rails_helper'

RSpec.describe ImportNdcSdgTargets do
  subject { ImportNdcSdgTargets.new.call }

  before :all do
    Aws.config[:s3] = {
      stub_responses: {
        get_object: {
          body: <<~END
            Country,wri_standard_name,iso_code3,Goal,Target,INDC_text,Status,Sector,Climate_response,Type_of_information
            Afghanistan,Afghanistan,AFG,Goal 1 - No Poverty,1.1,"Improving access by rural communities and farmers to water to support food security, reduce poverty and improve agricultural productions",Future,"cross-cutting, Agriculture, Water, cross-cutting, Agriculture, Water",Adaptation,Action
          END
        }
      }
    }
  end

  before(:each) do
    full_text = <<~END
      The NDC text contains the quote "Improving access by rural communities and farmers to water to support food security, reduce poverty and improve agricultural productions", which is amazing.
    END
    afg = FactoryBot.create(
      :location, iso_code3: 'AFG', location_type: 'COUNTRY'
    )
    FactoryBot.create(:ndc, location: afg, full_text: full_text)
    FactoryBot.create(:ndc_sdg_target, number: '1.1')
  end

  # TODO: fix the import
  skip 'Creates a new NDC-SDG target link' do
    expect { subject }.to change { NdcSdg::NdcTarget.count }.by(1)
  end
end
