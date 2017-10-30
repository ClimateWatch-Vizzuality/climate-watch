require 'rails_helper'

object_contents = {
  "#{CW_FILES_PREFIX}cait_indc/CW_NDC_CAIT_metadata.csv" => <<~END,
    category,column_name,long_name
    General,domestic_approval,Domestic Approval Processes Category
  END
  "#{CW_FILES_PREFIX}cait_indc/CW_NDC_CAIT_legend.csv" => <<~END,
    indicator_name,legend_item,chart_title
    domestic_approval,Executive,Domestic Approval Process
    domestic_approval,Executive + notify legislature,Domestic Approval Process
    domestic_approval,Executive + majority of one legislative body,Domestic Approval Process
    domestic_approval,Executive + majority of two legislative bodies/super-majority of one legislative body,Domestic Approval Process
    domestic_approval,Multiple executive and legislative bodies,Domestic Approval Process
    domestic_approval,Not yet included in analysis,Domestic Approval Process
  END
  "#{CW_FILES_PREFIX}cait_indc/CW_NDC_CAIT_data.csv" => <<~END,
    country,ISO,domestic_approval,domestic_approval_label
    Afghanistan,AFG,Executive + majority of two legislative bodies,Executive + majority of two legislative bodies/super-majority of one legislative body
    Algeria,DZA,Executive,Executive
    Andorra,AND,Not yet included in analysis
  END
  "#{CW_FILES_PREFIX}cait_indc/CW_NDC_Submission_URL.csv" => <<~END,
    ISO,Country,Type,Language,Date_of_Submission,URL
    AFG,Afghanistan,INDC,English,10/13/2015,http://www4.unfccc.int/Submissions/INDC/Published Documents/Afghanistan/1/INDC_AFG_Paper_En_20150927_.docx FINAL.pdf
  END
  "#{CW_FILES_PREFIX}wb_indc/CW_NDC_WB_metadata_w_definitions.csv" => <<~END,
    QuestionType,category,category_2,QuestionCode,QuestionText,Definition
    Adaptation,General Information,Adaptation Target,A_Tg_AdInclu,Adaptation Included in INDC (Yes/No),Whether or not the NDC includes adaptation
    Adaptation,General Information,Adaptation Target,A_Tg_TarYr,Target Year for Adaptation,The year by which adaptation objectives are expected to be achieved
    Adaptation,Sectoral Information,Sectoral Commitments,A_Sc_CapBud,Capacity Building Needs for Sectorial Implementation
    Adaptation,Sectoral Information,Sectoral Commitments,A_Sc_ConAct,Sectorial Conditional Actions
    Mitigation,Economy-wide Information,Target,M_TarYr,Target year
  END
  "#{CW_FILES_PREFIX}wb_indc/CW_NDC_WB_sectoral.csv" => <<~END,
    CountryCode,Sector,SubSector,QuestionCode,ResponseText
    AF,Water,Water Infrastructure,A_Sc_CapBud,Ecological engineering and spatial planning for water resources
    AF,Water,Water Infrastructure,A_Sc_ConAct,"Development of water resources through rehabilitation and reconstruction of small-, medium-, and large-scale infrastructure"
  END
  "#{CW_FILES_PREFIX}wb_indc/CW_NDC_WB_economy_wide.csv" => <<~END,
    CountryCode,QuestionCode,ResponseText
    AF,A_Tg_AdInclu,Yes
    AF,A_Tg_TarYr,2030
    AF,M_TarYr,2030
    DZ,A_Tg_AdInclu,Yes
    DZ,A_Tg_TarYr,2030
    DZ,M_TarYr,2030
  END
  "#{CW_FILES_PREFIX}global_indc/CW_NDC_metadata_combined.csv" => <<~END
    category,category_2,column_name,long_name,Definition,Source
    Overview,NDC,domestic_approval,,,CAIT
    Mitigation,Target,A_Tg_AdInclu,,,WB
    Mitigation,Target,M_TarYr,,,WB
  END
}

RSpec.describe ImportGlobalIndc do
  subject { ImportGlobalIndc.new.call }

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
      iso_code3: 'AFG',
      iso_code2: 'AF',
      wri_standard_name: 'Afghanistan'
    }, {
      iso_code3: 'DZA',
      iso_code2: 'DZ',
      wri_standard_name: 'Algeria'
    }, {
      iso_code3: 'AND',
      iso_code2: 'AD',
      wri_standard_name: 'Andorra'
    }].each do |c|
      FactoryGirl.create(:location, c)
    end

    ImportCaitIndc.new.call
    ImportWbIndc.new.call
  end

  after :all do
    Aws.config[:s3] = {
      stub_responses: nil
    }
  end

  it 'Creates new global INDC categories' do
    expect { subject }.to change { GlobalIndc::Category.count }.by(4)
  end

  it 'Creates new global INDC indicator links' do
    expect { subject }.to change { GlobalIndc::Indicator.count }.by(3)
  end
end
