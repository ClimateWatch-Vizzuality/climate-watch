require 'rails_helper'

object_contents = {
  "#{CW_FILES_PREFIX}zip_files/zip_files.csv" => <<~END,
"drop_down","zip_file","metadata","s3_folder","file_name_raw","file_name_zip"
"ALL DATA","ClimateWatch_AllData.zip",,,,,
"NDC CONTENT","ClimateWatch_NDC_Content.zip",,"indc","NDC_metadata.csv","CW_NDC_metadata.csv"
"NDC CONTENT","ClimateWatch_NDC_Content.zip","2020_NDC","indc","NDC_single_version.csv","CW_NDC_tracker.csv"
"NDC CONTENT","ClimateWatch_NDC_Content.zip","NDC_WB
NDC_DIE
NDC_CW","indc","NDC_data.csv","CW_NDC_data_highlevel.csv"
"LTS CONTENT","ClimateWatch_LTS.zip","NDC_LTS","indc","NDC_LTS_data.csv","CW_LTS_data_highlevel.csv"
"LTS CONTENT","ClimateWatch_LTS.zip",,"indc","NDC_LTS_data_sectoral.csv","CW_LTS_data_sector.csv"
  END
}

RSpec.describe ImportZIPFiles do
  subject { ImportZIPFiles.new.call }

  before :all do
    Aws.config[:s3] = {
      stub_responses: {
        list_objects: {
          contents: [
            {key: "#{CW_FILES_PREFIX}zip_files/zip_files.csv"}
          ]
        },
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

  it 'Creates new zip files records' do
    expect { subject }.to change { ZipFile.count }.by(3)

    z1 = ZipFile.find_by(dropdown_title: 'ALL DATA')
    z2 = ZipFile.find_by(dropdown_title: 'NDC CONTENT')

    expect(z1.zip_filename).to eq('ClimateWatch_AllData.zip')
    expect(z1.metadata).to eq([])
    expect(z1.files).to eq([])

    expect(z2.zip_filename).to eq('ClimateWatch_NDC_Content.zip')
    expect(z2.metadata).to eq(%w(2020_NDC NDC_WB NDC_DIE NDC_CW))
    expect(z2.files.map(&:symbolize_keys)).to eq(
      [
        {s3_folder: 'indc', filename_original: 'NDC_metadata.csv', filename_zip: 'CW_NDC_metadata.csv'},
        {s3_folder: 'indc', filename_original: 'NDC_single_version.csv', filename_zip: 'CW_NDC_tracker.csv'},
        {s3_folder: 'indc', filename_original: 'NDC_data.csv', filename_zip: 'CW_NDC_data_highlevel.csv'}
      ]
    )
  end
end
