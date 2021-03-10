# == Schema Information
#
# Table name: ndcs
#
#  id            :bigint           not null, primary key
#  location_id   :bigint
#  full_text     :text
#  full_text_tsv :tsvector
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  document_type :text             default("ndc")
#  language      :text
#  translated    :boolean          default(FALSE)
#
require 'rails_helper'

RSpec.describe Ndc, type: :model do
  it 'should be invalid when location not present' do
    expect(
      FactoryBot.build(:ndc, location: nil)
    ).to have(1).errors_on(:location)
  end

  describe ':linkages_for' do
    let(:document_type) { 'indc' }
    let(:language) { 'ES' }
    let(:iso_code3) { 'ESP' }
    let(:location) {
      FactoryBot.create(:location, iso_code3: iso_code3)
    }
    let(:other_ndc) {
      FactoryBot.create(:ndc, location: location)
    }
    let(:document_ndc) {
      FactoryBot.create(:ndc, location: location, document_type: document_type, language: language)
    }

    it 'filters by document' do
      expect(Ndc.linkages_for(iso_code3, document_type, language)).to include(document_ndc)
    end
  end
end
