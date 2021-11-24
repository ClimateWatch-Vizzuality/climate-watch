module CountryProfile
  class Indicator < ApplicationRecord
    has_many :values, class_name: 'CountryProfile::Value'

    validates :slug, presence: true, uniqueness: true

    def self.sync_indc_indicators
      CountryProfile::Indicator.where(file: 'ndc_data.csv').each do |i|
        i.values.delete_all
        indc_indicator = Indc::Indicator.find_by(slug: i.slug)
        if indc_indicator.nil?
          Rails.logger.info "Cannot find INDC indicator #{i.slug} to perform sync"
          next
        end

        values = indc_indicator.values.joins(:document).where(indc_documents: {slug: 'first_ndc'}).map do |v|
          CountryProfile::Value.new(
            indicator: i,
            location: v.location,
            value: v.value
          )
        end

        CountryProfile::Value.import! values
      end
    end
  end
end
