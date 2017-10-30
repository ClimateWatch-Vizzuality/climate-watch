require 'rails_helper'

object_contents = {
  "#{CW_FILES_PREFIX}indc/NDC_metadata.csv" => <<~END,
    global_category,main_category,map_category,column_name,long_name,Definition,Source
    Overview,UNFCCC Process,Other,domestic_approval,Domestic Approval Processes Category,,CAIT
    Mitigation,Target,,M_TarYr,Target year,The year by which mitigation objectives are expected to be achieved,WB
    Mitigation,Target,,M_TarYr_2,Second target year,Whether the NDC has a second-year target,WB
    Adaptation,Adaptation Target,,A_Tg_AdInclu,Adaptation Included in INDC (Yes/No),Whether or not the NDC includes adaptation,WB
    Adaptation,Adaptation Target,,A_Tg_TarYr,Target Year for Adaptation,The year by which adaptation objectives are expected to be achieved,WB
    Sectoral Information,Sectoral Adaptation Commitments,,A_Sc_ConAct,Sectorial Conditional Actions,Condition actions of the sectoral level,WB
    Sectoral Information,Sectoral Adaptation Commitments,,A_Sc_ConActP,Page Number for Sectorial Conditional Actions,Link to the page reference for the sectoral condition actions,WB
    Sectoral Information,Sectoral Adaptation Commitments,,A_Sc_ConActImp,Implementing Agency for Sectorial Conditonal Actions,The agency responsible for implementing the sectoral conditional action,WB
    Sectoral Information,Sectoral Adaptation Commitments,,A_Sc_ConActDon,Funders for Sectorial Conditional Actions,The funders for sectoral conditional actions,WB
    Sectoral Information,Sectoral Adaptation Commitments,,A_Sc_ConActCost,Estimated Cost for Sectorial Conditional Actions ,The estimated costs for sectoral conditional actions,WB
    Sectoral Information,,,A_Sc_ConActCostH,Estimated Cost for Sectorial Conditional Actions (Harmonized in Million USD),,WB
    Sectoral Information,Sectoral Adaptation Commitments,,A_Sc_CapBud,Capacity Building Needs for Sectorial Implementation,Capacity building needs for sectorial implementation,WB
  END

  "#{CW_FILES_PREFIX}indc/NDC_submission.csv" => <<~END,
    ISO,Country,Type,Language,Date_of_Submission,URL
    AFG,Afghanistan,INDC,English,10/13/2015,http://www4.unfccc.int/Submissions/INDC/Published Documents/Afghanistan/1/INDC_AFG_Paper_En_20150927_.docx FINAL.pdf
  END

  "#{CW_FILES_PREFIX}indc/NDC_CAIT_data.csv" => <<~END,
    country,ISO,domestic_approval,domestic_approval_label
    Afghanistan,AFG,Executive + majority of two legislative bodies,Executive + majority of two legislative bodies/super-majority of one legislative body
    Algeria,DZA,Executive,Executive
    Andorra,AND,Not yet included in analysis
  END

  "#{CW_FILES_PREFIX}indc/NDC_CAIT_legend.csv" => <<~END,
    indicator_name,legend_item,chart_title
    domestic_approval,Executive,Domestic Approval Process
    domestic_approval,Executive + notify legislature,Domestic Approval Process
    domestic_approval,Executive + majority of one legislative body,Domestic Approval Process
    domestic_approval,Executive + majority of two legislative bodies/super-majority of one legislative body,Domestic Approval Process
    domestic_approval,Multiple executive and legislative bodies,Domestic Approval Process
    domestic_approval,Not yet included in analysis,Domestic Approval Process
  END

  "#{CW_FILES_PREFIX}indc/NDC_WB_data_sectoral.csv" => <<~END,
    CountryCode,Sector,SubSector,QuestionCode,ResponseText
    AF,Water,Water Infrastructure,A_Sc_CapBud,Ecological engineering and spatial planning for water resources
    AF,Water,Water Infrastructure,A_Sc_ConAct,"Development of water resources through rehabilitation and reconstruction of small-, medium-, and large-scale infrastructure"
  END

  "#{CW_FILES_PREFIX}indc/NDC_WB_data_wide.csv" => <<~END,
    CountryCode,QuestionCode,ResponseText
    AF,A_Tg_AdInclu,Yes
    AF,A_Tg_TarYr,2030
    AF,M_TarYr,2030
    DZ,A_Tg_AdInclu,Yes
    DZ,A_Tg_TarYr,2030
    DZ,M_TarYr,2030
  END

}

describe ImportIndc do
  subject { ImportIndc.new.call }

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
  end

  after :all do
    Aws.config[:s3] = {
      stub_responses: nil
    }
  end

  it 'Creates new INDC source records' do
    expect { subject }.to change { Indc::Source.count }.by(2)
  end

  it 'Creates new INDC indicator records' do
    expect { subject }.to change { Indc::Indicator.count }.by(12)
  end

  it 'Creates new INDC sector records' do
    expect { subject }.to change { Indc::Sector.count }.by(2)
  end

  it 'Creates new INDC value records' do
    expect { subject }.to change { Indc::Value.count }.by(11)
  end

  it 'Creates new INDC submission records' do
    expect { subject }.to change { Indc::Submission.count }.by(1)
  end
end
