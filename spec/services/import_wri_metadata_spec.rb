require 'rails_helper'

object_contents = {
  "#{CW_FILES_PREFIX}wri_metadata/Acronyms.csv" => <<~END,
    Acronym,Definition
    WRI ,World Resources Institute
  END
  "#{CW_FILES_PREFIX}wri_metadata/metadata_sources.csv" => <<~END,
    dataset,title,subtitle
    historical_emissions_climate_watch,Climate Watch Historical Emissions,Climate Watch Historical Emissions
  END
  "#{CW_FILES_PREFIX}wri_metadata/metadata_sources_descriptions.csv" => <<~END
    id,description
    title,Title (75 character limit)
    subtitle,"Subtitle (Abbreviated Source, ex. NASA)"
  END
}

RSpec.describe ImportWriMetadata do
  subject { ImportWriMetadata.new.call }

  before :all do
    Aws.config[:s3] = {
      stub_responses: {
        get_object: lambda { |context|
          {body: object_contents[context.params[:key]]}
        }
      }
    }
  end

  after :all do
    Aws.config[:s3] = {
      stub_responses: nil
    }
  end

  it 'Creates new acronym definitions' do
    expect { subject }.to change { WriMetadata::Acronym.count }.by(1)
  end

  it 'Creates new dataset properties' do
    expect { subject }.to change { WriMetadata::Value.count }.by(2)
  end
end
