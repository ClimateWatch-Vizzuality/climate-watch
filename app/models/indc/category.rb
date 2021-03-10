# == Schema Information
#
# Table name: indc_categories
#
#  id               :bigint           not null, primary key
#  category_type_id :bigint           not null
#  parent_id        :bigint
#  slug             :text             not null
#  name             :text             not null
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  order            :integer
#
module Indc
  class Category < ApplicationRecord
    belongs_to :category_type, class_name: 'Indc::CategoryType'
    belongs_to :parent,
               class_name: 'Indc::Category',
               foreign_key: :parent_id,
               required: false
    has_many :children,
             class_name: 'Indc::Category',
             foreign_key: :parent_id
    has_and_belongs_to_many :indicators,
                            join_table: :indc_indicators_categories
    has_many :sources, through: :indicators

    validates :slug, presence: true
    validates :name, presence: true
    validates :slug, uniqueness: {scope: [:category_type, :parent_id]}
  end
end
