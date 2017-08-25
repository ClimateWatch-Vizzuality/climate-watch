class HistoricalEmission < ApplicationRecord
  belongs_to :location
  belongs_to :data_source
  belongs_to :sector
  belongs_to :gas
end
