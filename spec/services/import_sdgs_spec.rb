require 'rails_helper'

object_contents = {
  'data/sdgs.csv' => <<~END,
    number,title,cw_title,colour
    1,End poverty in all its forms everywhere,No poverty,#F33D4D
  END
  'data/sdg_targets.csv' => <<~END,
    goal_number,number,title
    1,1.1,"By 2030, eradicate extreme poverty for all people everywhere, currently measured as people living on less than $1.25 a day"
  END
}

RSpec.describe ImportSdgs do
  subject { ImportSdgs.new.call }

  before :all do
    Aws.config[:s3] = {
      stub_responses: {
        get_object: lambda { |context|
          {body: object_contents[context.params[:key]]}
        }
      }
    }
  end

  it 'Creates a new sdg' do
    expect { subject }.to change { NdcSdg::Goal.count }.by(1)
  end
end
