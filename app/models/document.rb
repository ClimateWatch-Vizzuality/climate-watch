class Document < ApplicationRecord
  has_many_attached :uploads

  scope :global_country_platform, -> { where(platform_name: 'global_country_platform') }
  scope :indonesia_country_platform, -> { where(platform_name: 'indonesia_country_platform' ) }
  scope :india_country_platform, -> { where(platform_name: 'india_country_platform' ) }
end
