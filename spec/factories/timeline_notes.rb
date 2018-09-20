FactoryBot.define do
  factory :timeline_note, class: 'Timeline::Note' do
    note { 'MyText' }
  end
end
