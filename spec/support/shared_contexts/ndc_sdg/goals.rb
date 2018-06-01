RSpec.shared_context 'NDC SDG goals' do
  let!(:goal_1) {
    FactoryBot.create(
      :ndc_sdg_goal,
      number: 1,
      title: 'End poverty in all its forms everywhere'
    )
  }

  let!(:goal_2) {
    FactoryBot.create(
      :ndc_sdg_goal,
      number: 2,
      # rubocop:disable Metrics/LineLength
      title: 'End hunger, achieve food security and improved nutrition and promote sustainable agriculture'
      # rubocop:enable Metrics/LineLength
    )
  }
end
