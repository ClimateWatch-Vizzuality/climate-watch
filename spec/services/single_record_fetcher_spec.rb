require 'rails_helper'
require 'vcr'

describe SingleRecordFetcher do
  context do
    let(:iso) { 'ARG' }
    describe 'SHOW action' do
      it 'calls api' do
        VCR.use_cassette('laws_and_policies') do
          response = Net::HTTP.get_response(
            URI("http://www.lse.ac.uk/GranthamInstitute/wp-json/wri/v1/targets/#{iso}")
          )
          expect(response.message).to eq('OK')
        end
      end
    end
  end
end
