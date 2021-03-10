# == Schema Information
#
# Table name: timeline_notes
#
#  id          :bigint           not null, primary key
#  document_id :bigint
#  note        :text
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
require 'rails_helper'

RSpec.describe Timeline::Note, type: :model do
  it 'should be invalid when note not present' do
    expect(
      FactoryBot.build(:timeline_note, note: nil)
    ).to have(1).errors_on(:note)
  end

  it 'should be invalid when document not present' do
    expect(
      FactoryBot.build(:timeline_note, document: nil)
    ).to have(1).errors_on(:document)
  end
end
