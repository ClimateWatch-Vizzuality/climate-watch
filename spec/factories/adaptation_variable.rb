FactoryGirl.define do
  factory :adaptation_variable, class: 'Adaptation::Variable' do
    name 'MyText'
    slug { (0...5).map { (65 + rand(26)).chr }.join }
  end
end
