require 'rails_helper'

describe Api::V1::NdcAdaptationActionsController, type: :controller do
  let(:parsed_response) {
    JSON.parse(response.body)
  }

  before_all do
    document1 = FactoryBot.create(:indc_document, is_ndc: true)
    document2 = FactoryBot.create(:indc_document, is_ndc: true)
    FactoryBot.create(:indc_document) # not returned, not ndc document
    @location = FactoryBot.create(:location, iso_code3: 'POL')
    sector_parent = FactoryBot.create(:indc_sector, :wb)
    sector = FactoryBot.create(:indc_sector, :wb, parent: sector_parent)
    sector_parent2 = FactoryBot.create(:indc_sector, :adapt_now)
    sector2 = FactoryBot.create(:indc_sector, :adapt_now, parent: sector_parent2)
    FactoryBot.create_list(
      :indc_adaptation_action, 2, sectors: [sector, sector2], location: @location, document: document1
    )
    FactoryBot.create_list(
      :indc_adaptation_action, 4, sectors: [sector], location: @location, document: document2
    )
    FactoryBot.create_list(:indc_adaptation_action, 2)
  end

  describe 'GET show' do
    it 'returns a successful 200 response' do
      get :show, params: {code: @location.iso_code3}
      expect(response).to be_successful
    end

    context 'when location does not exist' do
      before { get :show, params: {code: 'AAAA'} }

      it 'returns a 404 not found' do
        expect(response).to be_not_found
      end
    end

    context 'when location exists' do
      before { get :show, params: {code: @location.iso_code3} }

      it 'returns list of sectors' do
        expect(parsed_response['sectors'].length).to eq(2)
      end

      it 'returns list of documents' do
        expect(parsed_response['documents'].length).to eq(2)
      end

      it 'returns a list of actions' do
        expect(parsed_response['actions'].length).to eq(6)
      end
    end
  end
end
