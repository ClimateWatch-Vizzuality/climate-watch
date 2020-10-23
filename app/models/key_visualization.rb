class KeyVisualization < ApplicationRecord
  validates_presence_of :title, :description, :topic, :created_date, :last_updated_date
end
