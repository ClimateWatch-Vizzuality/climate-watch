RSpec.shared_context 'NDC SDG ndcs' do
  include_context 'locations'

  let!(:ndc_spain) {
    FactoryBot.create(
      :ndc,
      location: spain
    )
  }

  let!(:ndc_uk) {
    FactoryBot.create(
      :ndc,
      location: uk
    )
  }
end
