require 'rails_helper'

object_contents = {
  "#{CW_FILES_PREFIX}socioeconomics/indicators_gdp.csv" =>
  <<~END_OF_GDP_CSV,
    wri_standard_name,iso_code3,GDP_2011,GDP_2012,GDP_2013,GDP_2014,GDP_2015,GDP_2016,GDP_rank_2011,GDP_rank_2012,GDP_rank_2013,GDP_rank_2014,GDP_rank_2015,GDP_rank_2016
    Afghanistan,AFG,17930239400,20536542737,20046334304,20050189882,19702986341,19469022208,110,105,105,104,104,104
    Albania,ALB,12890867539,12319784787,12781029644,13219857459,11390365294,11926892453,121,124,124,124,125,118
  END_OF_GDP_CSV
  "#{CW_FILES_PREFIX}socioeconomics/indicators_gdp_per_capita.csv" =>
  <<~END_OF_GDP_PER_CAPITA_CSV,
    wri_standard_name,iso_code3,PC_GDP_2011,PC_GDP_2012,PC_GDP_2013,PC_GDP_2014,PC_GDP_2015,PC_GDP_2016,PC_rank_2011,PC_rank_2012,PC_rank_2013,PC_rank_2014,PC_rank_2015,PC_rank_2016
    Afghanistan,AFG,603.5370231,669.0090509,631.7449706,612.0696514,584.0259021,561.7787463,175,172,174,175,172,166
    Albania,ALB,4437.178068,4247.614308,4414.72314,4575.763787,3954.022783,4146.89625,103,105,104,102,105,95
  END_OF_GDP_PER_CAPITA_CSV
  "#{CW_FILES_PREFIX}socioeconomics/indicators_population.csv" =>
  <<~END_OF_POPULATION_CSV,
    wri_standard_name,iso_code3,pop_2016,pop_2011,rank_pop_2016,rank_pop_2011
    Afghanistan,AFG,34656032,29708599,40,41
    Albania,ALB,2876101,2905195,136,135
  END_OF_POPULATION_CSV
  "#{CW_FILES_PREFIX}socioeconomics/indicators_population_growth.csv" =>
  <<~END_OF_POPULATION_GROWTH_CSV,
    wri_standard_name,iso_code3,pop_growth_2016,pop_growth_2011,rank_popgr_2016,rank_popgr_2011
    Afghanistan,AFG,2.689163473,3.095118615,28,18
  END_OF_POPULATION_GROWTH_CSV
}

RSpec.describe ImportSocioeconomics do
  subject { ImportSocioeconomics.new.call }

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
    FactoryGirl.create(
      :location, iso_code3: 'AFG', wri_standard_name: 'Afghanistan'
    )
    FactoryGirl.create(
      :location, iso_code3: 'ALB', wri_standard_name: 'Albania'
    )
  end

  after :all do
    Aws.config[:s3] = {
      stub_responses: nil
    }
  end

  it 'Creates new socioeconomic indicator records' do
    expect { subject }.to change { Socioeconomic::Indicator.count }.by(12)
  end
end
