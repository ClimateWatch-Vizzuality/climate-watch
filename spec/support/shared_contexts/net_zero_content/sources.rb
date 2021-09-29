RSpec.shared_context 'Net Zero sources' do
  let!(:net_zero) {
    FactoryBot.create(
      :indc_source,
      name: 'Net_Zero'
    )
  }
end
