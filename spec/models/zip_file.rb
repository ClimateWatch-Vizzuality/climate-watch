require 'rails_helper'

RSpec.describe ZipFile, type: :model do
  subject { FactoryBot.build(:zip_file) }

  it { is_expected.to be_valid }
end
