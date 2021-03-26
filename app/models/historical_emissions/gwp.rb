# == Schema Information
#
# Table name: historical_emissions_gwps
#
#  id         :bigint           not null, primary key
#  name       :text
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
module HistoricalEmissions
  class Gwp < ApplicationRecord
    has_many :records, class_name: 'HistoricalEmissions::Record'
    validates :name, presence: true
  end
end
