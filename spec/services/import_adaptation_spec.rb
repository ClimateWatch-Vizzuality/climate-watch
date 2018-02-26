require 'rails_helper'

object_contents = {
  "#{CW_FILES_PREFIX}adaptation/adaptation_metadata.csv" => <<~END,
    column_name,long_name
    country,Country
    poverty_14,Population living below the national income poverty line (%)
    climate_risks,Climate Risk Index score
  END
  "#{CW_FILES_PREFIX}adaptation/adaptation.csv" => <<~END,
    country,poverty_14,climate_risks
    AFG,35.8,36.17
  END
}

RSpec.describe ImportAdaptation do
  subject { ImportAdaptation.new.call }

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
      :location, iso_code3: 'AFG', wri_standard_name: 'Afghanistan'
    )
  end

  after :all do
    Aws.config[:s3] = {
      stub_responses: nil
    }
  end

  it 'Creates new adaptation records' do
    expect { subject }.to change { Adaptation::Value.count }.by(3)
  end
end
