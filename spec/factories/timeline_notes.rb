# == Schema Information
#
# Table name: timeline_notes
#
#  id          :bigint           not null, primary key
#  document_id :bigint
#  note        :text
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
FactoryBot.define do
  factory :timeline_note, class: 'Timeline::Note' do
    note { 'MyText' }
  end
end
