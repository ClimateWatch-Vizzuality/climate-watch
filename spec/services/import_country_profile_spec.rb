require 'rails_helper'

RSpec.describe ImportCountryProfile do
  subject { ImportCountryProfile.new.call }

  let(:object_contents) do
    {
      "#{CW_FILES_PREFIX}country_profile/country_key.csv" => <<~END,
        "file","metadata_info_button","column_name","short_name","long_name","time_series"
        "country_context.csv","historical_emissions_CAIT","emissions_total",,"Total Emissions (MtCO2e)","FALSE"
        "country_context.csv","historical_emissions_CAIT","emissions_capita",,"Emissions per Capita (tCO2e/person)","FALSE"
        "country_adaptation.csv","Vulnerability ","vulnerability","Vulnerability","ND-GAIN vulnerability score","FALSE"
        "subnational_city.csv","GCOM","city_badge_type",,"Population and badges by commited cities","TRUE"
        "subnational_company.csv","SBT","company_target_qualification",,"Targets set by company","TRUE"
        "subnational_count.csv","GCOM","city_commited",,"Cities Commited","FALSE"
        country_driver_electricity.csv,IRENA,electricity_consumption,,Electricity Net Consumption (billion kWh),TRUE
        re_cost.csv,IRENA,cost_by_technology,,Levelised Cost of Electricity (2020 USD/kWh),TRUE
        re_employment.csv,IRENA,employment_by_technology,,Employment by technology,TRUE
      END
      "#{CW_FILES_PREFIX}country_profile/country_adaptation.csv" => <<~END,
        country,vulnerability
        AUT,0.293
        BRA,0.402
      END
      "#{CW_FILES_PREFIX}country_profile/country_context.csv" => <<~END,
        Country,ISO,emissions_total,emissions_capita
        Austria,AUT,67.85,149.1
        Brazil,BRA,1420.58,753.43
      END
      "#{CW_FILES_PREFIX}country_profile/subnational_city.csv" => <<~END,
        "Country","ISO","city_badge_type",2011,2012,2013,2014,2015,2016
        "Austria","AUT","Plan",1895345,1895345,1895345,1910927,1910927,1910927
        "Austria","AUT","Target",30593,42856,52056,52056,57168,57168
        "Brazil","BRA","Inventory",0,0,0,7051706,8388793,8388793
        "Brazil","BRA","Plan",0,0,0,14935310,14935310,14935310
      END
      "#{CW_FILES_PREFIX}country_profile/subnational_company.csv" => <<~END,
        "Country","ISO","company_target_qualification",2015,2016,2017,2018,2019,2020,2021
        "Austria","AUT","1.5°C",0,1,1,1,2,3,5
        "Austria","AUT","2°C",0,0,1,2,3,3,3
        "Austria","AUT","Committed",0,0,0,1,1,1,11
        "Austria","AUT","Well-below 2°C",0,0,0,1,2,2,4
      END
      "#{CW_FILES_PREFIX}country_profile/subnational_count.csv" => <<~END,
        ﻿Country,ISO,city_commited
        Austria,AUT,29
        Brazil,BRA,111
      END
      "#{CW_FILES_PREFIX}country_profile/country_driver.csv" => <<~END,
      END
      "#{CW_FILES_PREFIX}country_profile/country_driver_electricity.csv" => <<~END,
      END
      "#{CW_FILES_PREFIX}country_profile/re_employment.csv" => <<~END,
      END
      "#{CW_FILES_PREFIX}country_profile/re_cost.csv" => <<~END,
      END
    }
  end

  before :all do
    Aws.config[:s3] = {
      stub_responses: {
        get_object: lambda { |context|
          {body: object_contents[context.params[:key]]}
        }
      }
    }
  end

  let_it_be(:aut) { create(:location, iso_code3: 'AUT', wri_standard_name: 'Austria') }
  let_it_be(:bra) { create(:location, iso_code3: 'BRA', wri_standard_name: 'Brazil') }

  after :all do
    Aws.config[:s3] = {
      stub_responses: nil
    }
  end

  it 'Creates new country profile values' do
    expect { subject }.
      to change { CountryProfile::Indicator.count }.by(9).
      and change { CountryProfile::Value.count }.by(2 + 4 + 6 * 4 + 7 * 4 + 2)

    indicator = CountryProfile::Indicator.find_by(slug: 'emissions_capita')
    expect(indicator.name).to eq('Emissions per Capita (tCO2e/person)')
    expect(indicator.file).to eq('country_context.csv')
    expect(indicator.metadata_source).to eq('historical_emissions_CAIT')

    indicator = CountryProfile::Indicator.find_by(slug: 'company_target_qualification')
    expect(indicator.values.find_by(location: aut, category: '1.5°C', year: 2020).value).to eq('3.0')
  end
end
