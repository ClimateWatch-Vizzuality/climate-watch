require 'rails_helper'

object_contents = {
  'cait_indc_2/CW_NDC_CAIT_metadata.csv' => <<~END,
    category,column_name,long_name
    General,domestic_approval,Domestic Approval Processes Category
  END
  'cait_indc_2/CW_NDC_CAIT_legend.csv' => <<~END,
    indicator_name,legend_item,chart_title
    domestic_approval,Executive,Domestic Approval Process
    domestic_approval,Executive + notify legislature,Domestic Approval Process
    domestic_approval,Executive + majority of one legislative body,Domestic Approval Process
    domestic_approval,Executive + majority of two legislative bodies/super-majority of one legislative body,Domestic Approval Process
    domestic_approval,Multiple executive and legislative bodies,Domestic Approval Process
    domestic_approval,Not yet included in analysis,Domestic Approval Process
  END
  'cait_indc_2/CW_NDC_CAIT_data.csv' => <<~END,
    country,ISO,domestic_approval,domestic_approval_label
    Afghanistan,AFG,Executive + majority of two legislative bodies,Executive + majority of two legislative bodies/super-majority of one legislative body
    Algeria,DZA,Executive,Executive
    Andorra,AND,Not yet included in analysis
  END
  'cait_indc_2/CW_NDC_Submission_URL.csv' => <<~END
    ISO,Country,Type,Language,Date_of_Submission,URL
    AFG,Afghanistan,INDC,English,10/13/2015,http://www4.unfccc.int/Submissions/INDC/Published Documents/Afghanistan/1/INDC_AFG_Paper_En_20150927_.docx FINAL.pdf
  END
}

RSpec.describe ImportCaitIndc do
  subject { ImportCaitIndc.new.call }

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
      wri_standard_name: 'Afghanistan'
    }, {
      iso_code3: 'DZA',
      wri_standard_name: 'Algeria'
    }, {
      iso_code3: 'AND',
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

  it 'Creates new CAIT INDC records' do
    expect { subject }.to change { CaitIndc::Value.count }.by(3)
  end

  it 'Creates new INDC submission records' do
    expect { subject }.to change { CaitIndc::Submission.count }.by(1)
  end
end
