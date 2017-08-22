class HeSector < ApplicationRecord
  belongs_to :he_data_source
  belongs_to :he_sector, foreign_key: 'parent_id', required: false
  has_many :he_records
end
