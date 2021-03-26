# == Schema Information
#
# Table name: indc_category_types
#
#  id         :bigint           not null, primary key
#  name       :text             not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
module Indc
  class CategoryType < ApplicationRecord
    GLOBAL = 'global'.freeze
    OVERVIEW = 'overview'.freeze
    MAP = 'map'.freeze

    has_many :categories, class_name: 'Indc::Category'

    validates :name, uniqueness: true
    validates :name, presence: true
  end
end
