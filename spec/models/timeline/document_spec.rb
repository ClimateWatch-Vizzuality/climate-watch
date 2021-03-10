# == Schema Information
#
# Table name: timeline_documents
#
#  id          :bigint           not null, primary key
#  source_id   :bigint
#  location_id :bigint
#  link        :text
#  text        :text
#  date        :date
#  language    :text
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
require 'rails_helper'

RSpec.describe Timeline::Document, type: :model do
  it 'should be invalid when source not present' do
    expect(
      FactoryBot.build(:timeline_document, source: nil)
    ).to have(1).errors_on(:source)
  end

  it 'should be invalid when location not present' do
    expect(
      FactoryBot.build(:timeline_document, location: nil)
    ).to have(1).errors_on(:location)
  end
end
