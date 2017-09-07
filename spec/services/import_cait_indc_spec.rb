require 'rails_helper'

object_contents = {
  'cait_indc/Backend-CAIT INDC Map - indicators.csv' => <<~END,
    Category,Indicator,Indicator Type,Summary List,On Map,Omit from detailed view,Show in Dashboard
    "The reference point (including, as appropriate, a base year)",Base year(s)/period,Category,No,Yes,,
    ,GHG target type,Category,Yes,Yes,x,
  END
  'cait_indc/Backend-CAIT INDC Map - legend.csv' => <<~END,
    Indicator Name,Legend Item Name,Color,Chart Title
    GHG target type,Base year target,#003F6A,Types of GHG Target
  END
  'cait_indc/Backend-CAIT INDC Map - data.csv' => <<~END,
    Country,Highlight Outline,Marker Lat/Lng,GHG target type
    Afghanistan,,,Baseline scenario target
  END
}

RSpec.describe ImportCaitIndc do
  subject { ImportCaitIndc.new.call }

  before :all do
    Aws.config[:s3] = {
      stub_responses: {
        get_object: lambda { |context|
          {body: object_contents[context.params[:key]]}
        }
      }
    }
  end

  before :each do
    FactoryGirl.create(
      :location, iso_code3: 'ABW', wri_standard_name: 'Afghanistan'
    )
  end

  after :all do
    Aws.config[:s3] = {
      stub_responses: nil
    }
  end

  it 'Creates new CAIT INDC records' do
    expect { subject }.to change { CaitIndc::Value.count }.by(1)
  end
end
