require 'rails_helper'

RSpec.describe ImportSdgs do
  subject { ImportSdgs.new.call }

  pending 'Creates a new sdg' do
    expect { subject }.to change { Sdg.count }.by(1)
  end
end
