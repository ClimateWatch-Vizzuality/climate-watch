# == Schema Information
#
# Table name: country_profile_values
#
#  id           :bigint           not null, primary key
#  location_id  :bigint           not null
#  indicator_id :bigint
#  category     :string
#  value        :string           not null
#  year         :integer
#
module CountryProfile
  class Value < ApplicationRecord
    belongs_to :location
    belongs_to :indicator, class_name: 'CountryProfile::Indicator'

    validates :value, presence: true
  end
end
