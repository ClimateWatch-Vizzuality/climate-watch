module GlobalIndc
  class Category < ApplicationRecord
    has_and_belongs_to_many :indicators,
                            join_table: :global_indc_indicators_categories
    belongs_to :parent,
               class_name: 'GlobalIndc::Category',
               foreign_key: 'parent_id',
               required: false
    has_many :children,
             class_name: 'GlobalIndc::Category',
             foreign_key: 'parent_id'

    validates :name, presence: true
    validates :slug, presence: true
  end
end
