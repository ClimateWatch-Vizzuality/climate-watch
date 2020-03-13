require 'rails_helper'

describe Api::V1::LseLawsAndPoliciesController, type: :controller do
  context do
    let(:url) { 'https://climate-laws.org/cclow/api/targets' }
    let(:iso) { 'ARG' }

    describe 'SHOW actions' do
      it 'calls SingleRecordFetcher service' do
        fake_single_fetcher_record = double('fake_single_fetcher_record')
        expect(SingleRecordFetcher).
          to receive(:new).with(url, iso).and_return(fake_single_fetcher_record)
        expect(fake_single_fetcher_record).to receive(:call)
        get(:show, params: {id: iso})
      end
    end
  end
end
