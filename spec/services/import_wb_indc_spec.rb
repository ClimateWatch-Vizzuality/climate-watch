require 'rails_helper'

object_contents = {
  'wb_indc/CW_NDC_WB_metadata_w_definitions.csv' => <<~END,
    QuestionType,category,category_2,QuestionCode,QuestionText,Definition
    Adaptation,General Information,Adaptation Target,A_Tg_AdInclu,Adaptation Included in INDC (Yes/No),Whether or not the NDC includes adaptation
    Adaptation,General Information,Adaptation Target,A_Tg_TarYr,Target Year for Adaptation,The year by which adaptation objectives are expected to be achieved
    Adaptation,Sectoral Information,Sectoral Commitments,A_Sc_CapBud,Capacity Building Needs for Sectorial Implementation
    Adaptation,Sectoral Information,Sectoral Commitments,A_Sc_ConAct,Sectorial Conditional Actions
    Mitigation,Economy-wide Information,Target,M_TarYr,Target year
  END

  'wb_indc/CW_NDC_WB_sectoral.csv' => <<~END,
    CountryCode,Sector,SubSector,QuestionCode,ResponseText
    AF,Water,Water Infrastructure,A_Sc_CapBud,Ecological engineering and spatial planning for water resources
    AF,Water,Water Infrastructure,A_Sc_ConAct,"Development of water resources through rehabilitation and reconstruction of small-, medium-, and large-scale infrastructure"
  END
  'wb_indc/CW_NDC_WB_economy_wide.csv' => <<~END
    CountryCode,QuestionCode,ResponseText
    AF,A_Tg_AdInclu,Yes
    AF,A_Tg_TarYr,2030
    AF,M_TarYr,2030
    DZ,A_Tg_AdInclu,Yes
    DZ,A_Tg_TarYr,2030
    DZ,M_TarYr,2030
  END
}

describe ImportWbIndc do
  subject { ImportWbIndc.new.call }

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
    [{
      iso_code2: 'AF',
      wri_standard_name: 'Afghanistan'
    }, {
      iso_code2: 'DZ',
      wri_standard_name: 'Algeria'
    }].each do |c|
      FactoryGirl.create(:location, c)
    end
  end

  after :all do
    Aws.config[:s3] = {
      stub_responses: nil
    }
  end

  it 'Creates new WB INDC records' do
    expect { subject }.to change { WbIndc::Value.count }.by(8)
  end
end
