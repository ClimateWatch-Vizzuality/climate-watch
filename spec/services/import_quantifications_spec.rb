require 'rails_helper'

# rubocop disable:LineLength
object_contents = {
  "#{CW_FILES_PREFIX}quantifications/CW_NDC_quantification_commas.csv" => <<~END_OF_CSV,
    ISO,Document,Country,Year,Value,Range,Label
    AFG,First NDC,Afghanistan,2025,40.3,No,2025 High pledge
    AFG,First NDC,Afghanistan,2030,48.93954,No,2030 Low pledge
    AGO,First NDC,Angola,2025,113.28797,No,2025 High pledge
  END_OF_CSV
}
# rubocop enable:LineLength

RSpec.describe ImportQuantifications do
  subject { ImportQuantifications.new.call }

  before :all do
    Aws.config[:s3] = {
      stub_responses: {
        get_object: lambda do |context|
          {body: object_contents[context.params[:key]]}
        end
      }
    }
  end

  before :each do
    FactoryBot.create(
      :location, iso_code3: 'AFG', wri_standard_name: 'Afghanistan'
    )
    FactoryBot.create(
      :location, iso_code3: 'AGO', wri_standard_name: 'Angola'
    )
  end

  after :all do
    Aws.config[:s3] = {
      stub_responses: nil
    }
  end

  it 'Creates new label records' do
    expect { subject }.to change { Quantification::Label.count }.by(2)
  end

  it 'Creates new quantification records' do
    expect { subject }.to change { Quantification::Value.count }.by(3)
  end
end
