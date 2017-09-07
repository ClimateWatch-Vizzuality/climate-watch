require 'rails_helper'

object_contents = {
  'he/CW_HistoricalEmisisons_metadata_sectors.csv' => <<~END,
    Source,Sector,SubsectorOf
    CAIT,Total excluding LUCF,
    PIK,Total including LUCF,
  END
  'he/CW_HistoricalEmisisons_sampledata_CAIT.csv' => <<~END,
    Country,Source,Sector,Gas,GWP,1990,1991,1992
    ABW,CAIT,Total excluding LUCF,All GHG,AR2,15.21284765,15.28643902,14.01053087,14.02811754
  END
  'he/CW_HistoricalEmisisons_sampledata_PIK.csv' => <<~END,
    Country,Source,Sector,Gas,GWP,1850,1851,1852
    ABW,PIK,Total including LUCF,CH4,AR2,0.00000469,0.00000475,0.00000483
  END
}

RSpec.describe ImportHistoricalEmissions do
  subject { ImportHistoricalEmissions.new.call }

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
      :location, iso_code3: 'ABW', wri_standard_name: 'Aruba'
    )
  end

  after :all do
    Aws.config[:s3] = {
      stub_responses: nil
    }
  end

  it 'Creates new historical emission records' do
    expect { subject }.to change { HistoricalEmissions::Record.count }.by(2)
  end
end
