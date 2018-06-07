RSpec.shared_context 'NDC SDG targets' do
  include_context 'NDC SDG goals'

  let!(:target_1_1) {
    FactoryBot.create(
      :ndc_sdg_target,
      goal: goal_1,
      number: '1.1',
      # rubocop:disable Metrics/LineLength
      title: 'By 2030, eradicate extreme poverty for all people everywhere, currently measured as people living on less than $1.25 a day'
      # rubocop:enable Metrics/LineLength
    )
  }

  let!(:target_1_2) {
    FactoryBot.create(
      :ndc_sdg_target,
      goal: goal_1,
      number: '1.2',
      # rubocop:disable Metrics/LineLength
      title: 'By 2030, reduce at least by half the proportion of men, women and children of all ages living in poverty in all its dimensions according to national definitions'
      # rubocop:enable Metrics/LineLength
    )
  }

  let!(:target_2_1) {
    FactoryBot.create(
      :ndc_sdg_target,
      goal: goal_2,
      number: '2.1',
      # rubocop:disable Metrics/LineLength
      title: 'By 2030, end hunger and ensure access by all people, in particular the poor and people in vulnerable situations, including infants, to safe, nutritious and sufficient food all year round'
      # rubocop:enable Metrics/LineLength
    )
  }
end
