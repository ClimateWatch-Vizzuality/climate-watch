require 'rails_helper'

RSpec.describe ImportLocations do
  subject { ImportLocations.new.call }

  it 'Creates a new location' do
    expect { subject }.to change { Location.count }.by(1)
  end
end
