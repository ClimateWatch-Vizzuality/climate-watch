require 'rails_helper'

object_contents = {
  "#{CW_FILES_PREFIX}indc/NDC_metadata.csv" => <<~END,
    global_category,overview_category,map_category,column_name,long_name,Definition,group_indicator,Source,multiple_version
    Overview,UNFCCC Process,Other,domestic_approval,Domestic Approval Processes Category,,,Climate Watch,TRUE
    Mitigation,Target,,M_TarYr,Target year,The year by which mitigation objectives are expected to be achieved,,WB,TRUE
    Mitigation,Target,,M_TarYr_2,Second target year,Whether the NDC has a second-year target,,WB,TRUE
    Adaptation,Adaptation Target,,A_Tg_AdInclu,Adaptation Included in INDC (Yes/No),Whether or not the NDC includes adaptation,,WB,TRUE
    Adaptation,Adaptation Target,,A_Tg_TarYr,Target Year for Adaptation,The year by which adaptation objectives are expected to be achieved,,WB,TRUE
    Sectoral Information,Sectoral Adaptation Commitments,,A_Sc_ConAct,Sectorial Conditional Actions,Condition actions of the sectoral level,,WB,TRUE
    Sectoral Information,Sectoral Adaptation Commitments,,A_Sc_ConActP,Page Number for Sectorial Conditional Actions,Link to the page reference for the sectoral condition actions,,WB,TRUE
    Sectoral Information,Sectoral Adaptation Commitments,,A_Sc_ConActImp,Implementing Agency for Sectorial Conditonal Actions,The agency responsible for implementing the sectoral conditional action,,WB,TRUE
    Sectoral Information,Sectoral Adaptation Commitments,,A_Sc_ConActDon,Funders for Sectorial Conditional Actions,The funders for sectoral conditional actions,,WB,TRUE
    Sectoral Information,Sectoral Adaptation Commitments,,A_Sc_ConActCost,Estimated Cost for Sectorial Conditional Actions ,The estimated costs for sectoral conditional actions,,WB,TRUE
    Sectoral Information,,,A_Sc_ConActCostH,Estimated Cost for Sectorial Conditional Actions (Harmonized in Million USD),,,WB,TRUE
    Sectoral Information,Sectoral Adaptation Commitments,,A_Sc_CapBud,Capacity Building Needs for Sectorial Implementation,Capacity building needs for sectorial implementation,,WB,TRUE
    Overview,UNFCCC Process,UNFCCC Process,submission,Latest submission,,,Climate Watch,FALSE
    Overview,UNFCCC Process,,submission_date,Latest submission date,,,Climate Watch,FALSE
    Mitigation,,Sectoral Mitigation Measures,m_buildings,Buildings,,,Climate Watch,TRUE
    Mitigation,,Sectoral Mitigation Measures,m_agriculture,Agriculture,,,Climate Watch,TRUE
    Adaptation,,Sectoral Adaptation Measures,a_agriculture,Agriculture,,,Climate Watch,TRUE
    Adaptation,,Sectoral Adaptation Measures,a_coastal_zone,Coastal Zone,,a_agriculture,Climate Watch,TRUE
    Sectoral Information,Adaptation Commitments,,ad_sec_action,Action and priority,Adaptation action/priority,,WB,TRUE
    Sectoral Information,Adaptation Commitments,,ad_sec_tar,Targets,Measurable targets or indicators,ad_sec_action,WB,TRUE
    Sectoral Information,Adaptation Commitments,,GCA_Sector,Adapt Now sector,GCA_Sector,ad_sec_action,WB,TRUE
    Sectoral Information,Adaptation Commitments,,GCA_subsector,Adapt Now subsector,GCA_subsector,ad_sec_action,WB,TRUE
    Sectoral Information,Adaptation Commitments,,GCA_Sector_2,Adapt Now sector (2),GCA_Sector_2,ad_sec_action,WB,TRUE
    Sectoral Information,Adaptation Commitments,,GCA_subsector_2,Adapt Now subsector (2),GCA_Subsector_2,ad_sec_action,WB,TRUE
  END

  "#{CW_FILES_PREFIX}indc/NDC_submission.csv" => <<~END,
    ISO,Country,Type,Language,Date_of_Submission,URL
    AFG,Afghanistan,INDC,English,10/13/2015,http://www4.unfccc.int/Submissions/INDC/Published Documents/Afghanistan/1/INDC_AFG_Paper_En_20150927_.docx FINAL.pdf
  END

  "#{CW_FILES_PREFIX}indc/NDC_documents.csv" => <<~END,
    Order Number,Slug,Long name,Description
      1,INDC,INDC,INDC Submission
      2,First NDC,First NDC,First NDC Submission
      3,Revised First NDC,Revised First NDC,Revised First NDC Submission
      4,Second NDC,Second NDC,Second NDC Submission
  END

  "#{CW_FILES_PREFIX}indc/NDC_data.csv" => <<~END,
    country,ISO,document, domestic_approval,domestic_approval_label
    Afghanistan,AFG,indc, Executive + majority of two legislative bodies,Executive + majority of two legislative bodies/super-majority of one legislative body
    Algeria,DZA,indc, Executive,Executive
    Andorra,AND,indc, Not yet included in analysis
  END

  "#{CW_FILES_PREFIX}indc/NDC_single_version.csv" => <<~END,
    Country,ISO,submission,submission_label,submission_date
    Afghanistan,AFG,First NDC Submitted,First NDC Submitted,11/23/2016
    Albania,ALB,First NDC Submitted,First NDC Submitted,9/21/2016
  END

  "#{CW_FILES_PREFIX}indc/NDC_legend.csv" => <<~END,
    indicator_name,legend_item,chart_title
    domestic_approval,Executive,Domestic Approval Process
    domestic_approval,Executive + notify legislature,Domestic Approval Process
    domestic_approval,Executive + majority of one legislative body,Domestic Approval Process
    domestic_approval,Executive + majority of two legislative bodies/super-majority of one legislative body,Domestic Approval Process
    domestic_approval,Multiple executive and legislative bodies,Domestic Approval Process
    domestic_approval,Not yet included in analysis,Domestic Approval Process
  END

  "#{CW_FILES_PREFIX}indc/NDC_WB_data_sectoral_all.csv" => <<~END,
    Country,Document,Sector,SubSector,QuestionCode,ResponseText
    AF,indc,Water,Water Infrastructure,A_Sc_CapBud,Ecological engineering and spatial planning for water resources
    AF,indc,Water,Water Infrastructure,A_Sc_ConAct,"Development of water resources through rehabilitation and reconstruction of small-, medium-, and large-scale infrastructure"
    AF,first_ndc,Agriculture,Climate smart agriculture,ad_sec_action,Action 1
    AF,first_ndc,Agriculture,Climate smart agriculture,ad_sec_tar,Not Available
    AF,first_ndc,Agriculture,Climate smart agriculture,GCA_Sector,Adapt sector
    AF,first_ndc,Agriculture,Climate smart agriculture,GCA_subsector,Adapt subsector
    AF,first_ndc,Agriculture,Climate smart agriculture,GCA_Sector_2,Adapt sector 2
    AF,first_ndc,Agriculture,Climate smart agriculture,GCA_subsector_2,Adapt subsector 2
    AF,first_ndc,Coastal Zone,Coastal management,ad_sec_action,Action 2
    AF,first_ndc,Coastal Zone,Coastal management,ad_sec_tar,Not Available
    AF,first_ndc,Coastal Zone,Coastal management,GCA_Sector,Adapt sector 2
    AF,first_ndc,Coastal Zone,Coastal management,GCA_subsector,Adapt subsector 2
    AF,first_ndc,Water,Water Infrastructure,ad_sec_action,Action 2
    AF,first_ndc,Water,Water Infrastructure,ad_sec_tar,Not Available
    AF,first_ndc,Water,Water Infrastructure,GCA_Sector,Adapt sector 2
    AF,first_ndc,Water,Water Infrastructure,GCA_subsector,Adapt subsector 2
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
      FactoryBot.create(:location, c)
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

  it 'Creates new INDC category records' do
    expect { subject }.to change { Indc::Category.count }.by(13)
  end

  it 'Creates new INDC indicator records' do
    expect { subject }.to change { Indc::Indicator.count }.by(22)
  end

  it 'Creates new INDC sector records' do
    expect { subject }.to change { Indc::Sector.where(sector_type: 'wb').count }.by(6)
  end

  it 'Creates new INDC value records' do
    expect { subject }.to change { Indc::Value.count }.by(20)
  end

  it 'Creates new INDC submission records' do
    expect { subject }.to change { Indc::Submission.count }.by(1)
  end

  it 'Creates new adaptation actions' do
    subject
    # 2 ad_sec_actions + 1 A_Sc_ConAct
    expect(Indc::AdaptationAction.count).to eq(3)
    expect(Indc::Sector.where(sector_type: 'adapt_now').count).to eq(4)

    wb_sector1 = Indc::Sector.find_by(sector_type: 'wb', name: 'Climate smart agriculture')
    wb_sector2 = Indc::Sector.find_by(sector_type: 'wb', name: 'Coastal management')
    wb_sector3 = Indc::Sector.find_by(sector_type: 'wb', name: 'Water Infrastructure')
    adapt_sector1 = Indc::Sector.find_by(sector_type: 'adapt_now', name: 'Adapt subsector')
    adapt_sector2 = Indc::Sector.find_by(sector_type: 'adapt_now', name: 'Adapt subsector 2')

    action1 = Indc::AdaptationAction.find_by(title: 'Action 1')
    action2 = Indc::AdaptationAction.find_by(title: 'Action 2')

    expect(wb_sector1.parent.name).to eq('Agriculture')
    expect(wb_sector2.parent.name).to eq('Coastal Zone')
    expect(adapt_sector1.parent.name).to eq('Adapt sector')
    expect(adapt_sector2.parent.name).to eq('Adapt sector 2')

    expect(action1.sectors.map(&:name)).to include(wb_sector1.name, adapt_sector1.name, adapt_sector2.name)
    expect(action2.sectors.map(&:name)).to include(wb_sector2.name, wb_sector3.name, adapt_sector2.name)
  end
end
