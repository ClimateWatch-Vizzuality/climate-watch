require 'rails_helper'
require 'vcr'

describe SingleRecordFetcher do
  context do
    let(:iso) { 'ARG' }

    before(:each) do
      Rails.cache.clear
    end

    describe 'SHOW action' do
      it 'calls api' do
        VCR.use_cassette('laws_and_policies') do
          response = SingleRecordFetcher.
            new('https://climate-laws.org/cclow/api/targets', iso, iso).call
          expect(response).not_to be_empty
          expect(response.keys).to contain_exactly('targets', 'sectors', 'country_meta')
        end
      end
    end
  end
end
