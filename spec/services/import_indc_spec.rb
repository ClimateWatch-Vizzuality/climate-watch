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

  "#{CW_FILES_PREFIX}indc/NDC_timeline.csv" => <<~END,
    Country,ISO,submission,date,url
    Afghanistan,AFG,First NDC Submitted,11/3/24,https://unfccc.int/NDCREG
    Algeria,DZA,First NDC Submitted,12/3/24,https://unfccc.int/NDCREG
  END

  "#{CW_FILES_PREFIX}indc/NDC_global_emissions.csv" => <<~END,
    year,Historical emissions,Current policies scenario,2020 NDCs conditional,2020 NDCs unconditional,2025 NDCs conditional,2025 NDCs unconditional,2C,1.5C
    2030,100,56,1,48,3,4,32,24
    2031,200,56,1,2,45,47,28,17
  END

  "#{CW_FILES_PREFIX}indc/NDC_country_emissions.csv" => <<~END
    iso_country,historical_cw1990,historical_cw2005,historical_cw2018,targets_nfgs_uc2030,targets_nfgs_c2030,targets_nfgs_uc2035,targets_nfgs_c2035,baseline1990_2030_uc,baseline1990_2030_uc_percentage,baseline1990_2035_uc,baseline1990_2035_uc_percentage,baseline1990_2035_c,baseline1990_2035_c_percentage,baseline2005_2030_uc,baseline2005_2030_uc_percentage,baseline2005_2035_uc,baseline2005_2035_uc_percentage,baseline2005_2035_c,baseline2005_2035_c_percentage,baseline2018_2030_uc,baseline2018_2030_uc_percentage,baseline2018_2035_uc,baseline2018_2035_uc_percentage,baseline2018_2035_c,baseline2018_2035_c_percentage,absolute_emissions_comparison_c,absolute_emissions_comparison_uc
    AFG,9.238795,16.75753,33.25262,44.9026090409889,45.784521230399,44.9026090409889,45.784521230399,-35.6638140409889,3.8602235509056,-35.6638140409889,3.8602235509056,-36.545726230399,3.95568104178077,-28.1450790409889,1.67954818168244,-28.1450790409889,1.67954818168244,-29.026991230399,1.732175996725,-11.6499890409889,0.350348003886278,-11.6499890409889,0.350348003886278,-12.531901230399,0.376869588934617,28,13
    AGO,70.19451,122.4017,125.9159,116.569569049311,116.569569049311,116.569569049311,116.569569049311,-46.3750590493106,0.660665044165286,-46.3750590493106,0.660665044165286,-46.3750590493106,0.660665044165286,5.83213095068942,-0.047647466911729,5.83213095068942,-0.047647466911729,5.83213095068942,-0.047647466911729,9.34633095068941,-0.074226773192976,9.34633095068941,-0.074226773192976,9.34633095068941,-0.074226773192976,-6,-9
    ALB,11.3716,7.894226,9.426838,11.982068,11.982068,11.982068,,-0.610467999999999,,-0.610467999999999,0.053683562559358,-0.610467999999999,0.053683562559358,-4.087842,0.517826826847876,-4.087842,0.517826826847876,-4.087842,0.517826826847876,-2.55523,0.271059076224711,-2.55523,0.271059076224711,-2.55523,0.271059076224711,4,3
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

  it 'Creates new INDC timeline records' do
    expect { subject }.to change { Indc::Timeline.count }.by(2)
  end

  it 'Creates new INDC global emissions records' do
    subject
    result = Indc::GlobalEmission.order(:year)
    expect(result.count).to eq(2)
    expect(result[0].year).to eq(2030)
    expect(result[0].historical_emission).to eq(100)
    expect(result[0].current_policies_scenario).to eq(56)
    expect(result[0].ndcs_conditional_2020).to eq(1)
    expect(result[0].ndcs_unconditional_2020).to eq(48)
    expect(result[0].ndcs_conditional_2025).to eq(3)
    expect(result[0].ndcs_unconditional_2025).to eq(4)
    expect(result[0].target_2c).to eq(32)
    expect(result[0].target_1_5c).to eq(24)

    expect(result[1].year).to eq(2031)
    expect(result[1].historical_emission).to eq(200)
    expect(result[1].current_policies_scenario).to eq(56)
    expect(result[1].ndcs_conditional_2020).to eq(1)
    expect(result[1].ndcs_unconditional_2020).to eq(2)
    expect(result[1].ndcs_conditional_2025).to eq(45)
    expect(result[1].ndcs_unconditional_2025).to eq(47)
    expect(result[1].target_2c).to eq(28)
    expect(result[1].target_1_5c).to eq(17)
  end

  it 'Creates new INDC country emissions records' do
    subject
    result = Indc::CountryEmission.order(:id)
    expect(result.count).to eq(3)

    expect(result[0].location.iso_code3).to eq('AFG')
    expect(result[0].historical_cw1990).to eq(9.238795)
    expect(result[0].historical_cw2005).to eq(16.75753)
    expect(result[0].historical_cw2018).to eq(33.25262)
    expect(result[0].targets_nfgs_uc2030).to eq(44.9026090409889)
    expect(result[0].targets_nfgs_c2030).to eq(45.784521230399)
    expect(result[0].targets_nfgs_uc2035).to eq(44.9026090409889)
    expect(result[0].targets_nfgs_c2035).to eq(45.784521230399)
    expect(result[0].baseline1990_2030_uc).to eq(-35.6638140409889)
    expect(result[0].baseline1990_2030_uc_percentage).to eq(3.8602235509056)
    expect(result[0].baseline1990_2035_uc).to eq(-35.6638140409889)
    expect(result[0].baseline1990_2035_uc_percentage).to eq(3.8602235509056)
    expect(result[0].baseline1990_2035_c).to eq(-36.545726230399)
    expect(result[0].baseline1990_2035_c_percentage).to eq(3.95568104178077)
    expect(result[0].baseline2005_2030_uc).to eq(-28.1450790409889)
    expect(result[0].baseline2005_2030_uc_percentage).to eq(1.67954818168244)
    expect(result[0].baseline2005_2035_uc).to eq(-28.1450790409889)
    expect(result[0].baseline2005_2035_uc_percentage).to eq(1.67954818168244)
    expect(result[0].baseline2005_2035_c).to eq(-29.026991230399)
    expect(result[0].baseline2005_2035_c_percentage).to eq(1.732175996725)
    expect(result[0].baseline2018_2030_uc).to eq(-11.6499890409889)
    expect(result[0].baseline2018_2030_uc_percentage).to eq(0.350348003886278)
    expect(result[0].baseline2018_2035_uc).to eq(-11.6499890409889)
    expect(result[0].baseline2018_2035_uc_percentage).to eq(0.350348003886278)
    expect(result[0].baseline2018_2035_c).to eq(-12.531901230399)
    expect(result[0].baseline2018_2035_c_percentage).to eq(0.376869588934617)
    expect(result[0].absolute_emissions_comparison_c).to eq(28)
    expect(result[0].absolute_emissions_comparison_uc).to eq(13)

    expect(result[1].location.iso_code3).to eq('AGO')
    expect(result[1].historical_cw1990).to eq(70.19451)
    expect(result[1].historical_cw2005).to eq(122.4017)
    expect(result[1].historical_cw2018).to eq(125.9159)
    expect(result[1].targets_nfgs_uc2030).to eq(116.569569049311)
    expect(result[1].targets_nfgs_c2030).to eq(116.569569049311)
    expect(result[1].targets_nfgs_uc2035).to eq(116.569569049311)
    expect(result[1].targets_nfgs_c2035).to eq(116.569569049311)
    expect(result[1].baseline1990_2030_uc).to eq(-46.3750590493106)
    expect(result[1].baseline1990_2030_uc_percentage).to eq(0.660665044165286)
    expect(result[1].baseline1990_2035_uc).to eq(-46.3750590493106)
    expect(result[1].baseline1990_2035_uc_percentage).to eq(0.660665044165286)
    expect(result[1].baseline1990_2035_c).to eq(-46.3750590493106)
    expect(result[1].baseline1990_2035_c_percentage).to eq(0.660665044165286)
    expect(result[1].baseline2005_2030_uc).to eq(5.83213095068942)
    expect(result[1].baseline2005_2030_uc_percentage).to eq(-0.047647466911729)
    expect(result[1].baseline2005_2035_uc).to eq(5.83213095068942)
    expect(result[1].baseline2005_2035_uc_percentage).to eq(-0.047647466911729)
    expect(result[1].baseline2005_2035_c).to eq(5.83213095068942)
    expect(result[1].baseline2005_2035_c_percentage).to eq(-0.047647466911729)
    expect(result[1].baseline2018_2030_uc).to eq(9.34633095068941)
    expect(result[1].baseline2018_2030_uc_percentage).to eq(-0.074226773192976)
    expect(result[1].baseline2018_2035_uc).to eq(9.34633095068941)
    expect(result[1].baseline2018_2035_uc_percentage).to eq(-0.074226773192976)
    expect(result[1].baseline2018_2035_c).to eq(9.34633095068941)
    expect(result[1].baseline2018_2035_c_percentage).to eq(-0.074226773192976)
    expect(result[1].absolute_emissions_comparison_c).to eq(-6)
    expect(result[1].absolute_emissions_comparison_uc).to eq(-9)

    expect(result[2].location.iso_code3).to eq('ALB')
    expect(result[2].historical_cw1990).to eq(11.3716)
    expect(result[2].historical_cw2005).to eq(7.894226)
    expect(result[2].historical_cw2018).to eq(9.426838)
    expect(result[2].targets_nfgs_uc2030).to eq(11.982068)
    expect(result[2].targets_nfgs_c2030).to eq(11.982068)
    expect(result[2].targets_nfgs_uc2035).to eq(11.982068)
    expect(result[2].targets_nfgs_c2035).to be_nil
    expect(result[2].baseline1990_2030_uc).to eq(-0.610467999999999)
    expect(result[2].baseline1990_2030_uc_percentage).to be_nil
    expect(result[2].baseline1990_2035_uc).to eq(-0.610467999999999)
    expect(result[2].baseline1990_2035_uc_percentage).to eq(0.053683562559358)
    expect(result[2].baseline1990_2035_c).to eq(-0.610467999999999)
    expect(result[2].baseline1990_2035_c_percentage).to eq(0.053683562559358)
    expect(result[2].baseline2005_2030_uc).to eq(-4.087842)
    expect(result[2].baseline2005_2030_uc_percentage).to eq(0.517826826847876)
    expect(result[2].baseline2005_2035_uc).to eq(-4.087842)
    expect(result[2].baseline2005_2035_uc_percentage).to eq(0.517826826847876)
    expect(result[2].baseline2005_2035_c).to eq(-4.087842)
    expect(result[2].baseline2005_2035_c_percentage).to eq(0.517826826847876)
    expect(result[2].baseline2018_2030_uc).to eq(-2.55523)
    expect(result[2].baseline2018_2030_uc_percentage).to eq(0.271059076224711)
    expect(result[2].baseline2018_2035_uc).to eq(-2.55523)
    expect(result[2].baseline2018_2035_uc_percentage).to eq(0.271059076224711)
    expect(result[2].baseline2018_2035_c).to eq(-2.55523)
    expect(result[2].baseline2018_2035_c_percentage).to eq(0.271059076224711)
    expect(result[2].absolute_emissions_comparison_c).to eq(4)
    expect(result[2].absolute_emissions_comparison_uc).to eq(3)
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
