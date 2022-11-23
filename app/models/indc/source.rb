# == Schema Information
#
# Table name: indc_sources
#
#  id         :bigint           not null, primary key
#  name       :text             not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
module Indc
  class Source < ApplicationRecord
    VALID_SOURCES = [
      'Climate Watch',
      'CAIT',
      'LSE',
      'LTS',
      'NDC Explorer',
      'Net_Zero',
      'Pledges',
      'UNICEF',
      'WB'
    ].freeze

    validates :name, presence: true, uniqueness: true, inclusion: {
      in: VALID_SOURCES,
      message: "%{value} is not supported. Supported values for source: #{VALID_SOURCES.join(', ')}",
      allow_blank: true # to have only presence error if nil
    }

    scope :lts, -> { where("name ilike 'LTS'") }
    scope :net_zero, -> { where("name ilike 'Net_Zero'") }
    scope :ndc, -> { where.not(id: lts).where.not(id: net_zero) }
  end
end
