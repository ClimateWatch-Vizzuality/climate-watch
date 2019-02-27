require 'rails_helper'

# rubocop:disable Metrics/LineLength
object_contents = {
  ImportHistoricalEmissions::META_SOURCES_FILEPATH => <<~END,
    Name,Display name,Metadata dataset
    CAIT,CAIT,historical_emissions_CAIT
    PIK,PIK,historical_emissions_PIK
    UNFCCC_AI,UNFCCC Annex I,historical_emissions_UNFCCC
    UNFCCC_NAI,UNFCCC Non-Annex I,historical_emissions_UNFCCC
  END
  ImportHistoricalEmissions::META_SECTORS_FILEPATH => <<~END,
    Source,AnnexType,Sector,SubsectorOf
    CAIT,,Total excluding LUCF,
    PIK,,Total including LUCF,
    UNFCCC_AI,AI,Total GHG emissions without LULUCF,
  END
  ImportHistoricalEmissions::DATA_CAIT_FILEPATH => <<~END,
    Country,Source,Sector,Gas,GWP,1990,1991,1992
    ABW,CAIT,Total excluding LUCF,All GHG,AR2,15.21284765,15.28643902,14.01053087,14.02811754
  END
  ImportHistoricalEmissions::DATA_PIK_FILEPATH => <<~END,
    Country,Source,Sector,Gas,GWP,1850,1851,1852
    ABW,PIK,Total including LUCF,CH4,AR2,0.00000469,0.00000475,0.00000483
  END
  ImportHistoricalEmissions::DATA_UNFCCC_FILEPATH => <<~END,
    Country,Source,Sector,Gas,GWP,1990,1991,1992
    ABW,UNFCCC_AI,Total GHG emissions without LULUCF,Aggregate F-gases,AR4,6.242714951,6.264371648,6.183325393
  END
}
# rubocop:enable Metrics/LineLength

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
    FactoryBot.create(
      :location, iso_code3: 'ABW', wri_standard_name: 'Aruba'
    )
  end

  after :all do
    Aws.config[:s3] = {
      stub_responses: nil
    }
  end

  it 'Creates new historical emission records' do
    expect { subject }.to change {
      HistoricalEmissions::Record.count
    }.by(3)
  end
end
