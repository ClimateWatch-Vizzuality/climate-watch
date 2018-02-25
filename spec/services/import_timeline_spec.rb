require 'rails_helper'

object_contents = {
  "#{CW_FILES_PREFIX}timeline/NAP.csv" => <<~END,
    wri_standard_name,iso_code3,NAP_text,NAP_language,NAP_note,YYYY,MM,DD,link
    Brazil,BRA,National Adaptation Plan ,pt, Part 1 ,2016,5,12,http://www4.unfccc.int/nap/Documents/Parties/Brazil/Brazil%20PNA%20-%20Volume%201.pdf
    Brazil,BRA,National Adaptation Plan ,pt, Executive Summary ,2017,5,12,http://www4.unfccc.int/nap/Documents/Parties/Brazil/Brazil%20PNA%20-%20Sumario%20Executivo.pdf
  END
  "#{CW_FILES_PREFIX}timeline/BR.csv" => <<~END,
    wri_standard_name,iso_code3,BR_text,BR_language,BR_note,YYYY,MM,DD,BR_link
    Andorra,AND,First Biennial Update Report ,fr,,2014,12,19,http://unfccc.int/files/national_reports/non-annex_i_parties/biennial_update_reports/application/pdf/and_bur1_definitiu.pdf
    Andorra,AND,Second Biennial Update Report ,fr,,2017,8,2,http://unfccc.int/files/national_reports/non-annex_i_parties/biennial_update_reports/application/pdf/976051_andorra-bur2-1-bur_2_2016.pdf
  END
}

RSpec.describe ImportTimeline do
  subject { ImportTimeline.new.call }

  before :all do
    Aws.config[:s3] = {
      stub_responses: {
        list_objects: {
          contents: [
            {key: "#{CW_FILES_PREFIX}timeline/NAP.csv"},
            {key: "#{CW_FILES_PREFIX}timeline/NAP_metadata.csv"},
            {key: "#{CW_FILES_PREFIX}timeline/BR.csv"},
            {key: "#{CW_FILES_PREFIX}timeline/BR_metadata.csv"}
          ]
        },
        get_object: lambda { |context|
          {body: object_contents[context.params[:key]]}
        }
      }
    }
  end

  before :each do
    FactoryBot.create(
      :location, iso_code3: 'AND', wri_standard_name: 'Andorra'
    )

    FactoryBot.create(
      :location, iso_code3: 'BRA', wri_standard_name: 'Brazil'
    )
  end

  after :all do
    Aws.config[:s3] = {
      stub_responses: nil
    }
  end

  it 'Creates new timeline records' do
    expect { subject }.to change { Timeline::Document.count }.by(4)
  end
end
