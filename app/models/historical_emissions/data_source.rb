# == Schema Information
#
# Table name: historical_emissions_data_sources
#
#  id               :bigint           not null, primary key
#  name             :text
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  display_name     :text             not null
#  metadata_dataset :text             not null
#
require_dependency 'historical_emissions'

module HistoricalEmissions
  class DataSource < ApplicationRecord
    has_many :sectors, class_name: 'HistoricalEmissions::Sector'
    has_many :records, class_name: 'HistoricalEmissions::Record'
    validates :name, presence: true
  end
end
