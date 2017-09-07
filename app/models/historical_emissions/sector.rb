module HistoricalEmissions
  class Sector < ApplicationRecord
    belongs_to :data_source, class_name: 'HistoricalEmissions::DataSource'
    belongs_to :parent, class_name: 'HistoricalEmissions::Sector',
                        foreign_key: 'parent_id',
                        required: false
    has_many :records, class_name: 'HistoricalEmissions::Record'
    validates :name, presence: true
  end
end
