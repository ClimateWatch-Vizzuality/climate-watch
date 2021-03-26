# == Schema Information
#
# Table name: agriculture_profile_metadata
#
#  id          :bigint           not null, primary key
#  short_name  :string           not null
#  indicator   :string           not null
#  category    :string
#  subcategory :string
#  unit        :string
#
module AgricultureProfile
  class Metadatum < ApplicationRecord

    validates_presence_of :short_name, :indicator

    scope :areas, ->() { where("short_name like 'share%'") }
    scope :meat_productions, ->() { where("short_name like 'production%'") }
    scope :meat_trades, ->() { where("short_name like 'trade%'") }
    scope :meat_consumptions, ->() { where("short_name like 'meat%'") }
    scope :country_contexts, ->() {
      where("short_name similar to '(employment|total_p|total_f|water|value)%'") }
  end
end
