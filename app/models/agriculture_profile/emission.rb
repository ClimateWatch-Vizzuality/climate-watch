module AgricultureProfile
  class Emission < ApplicationRecord
    belongs_to :emission_subcategory, class_name: 'AgricultureProfile::EmissionSubcategory'
    belongs_to :location

    validates_presence_of :values
    validates_uniqueness_of :emission_subcategory_id, scope: :location_id

    scope :by_location, ->(location_id) { where(location_id: location_id) }
    scope :by_location_iso, ->(iso_code3) { joins(:location).where(locations: { iso_code3: iso_code3}) }

    def self.filter(params)
      emissions = Emission.all.includes(:location, { emission_subcategory: :emission_category} )
      emissions = emissions.by_location(params[:location_id]) if params[:location_id]
      emissions = emissions.by_location_iso(params[:iso_code3]) if params[:iso_code3]
      emissions
    end

    def self.all_locations_iso_codes
      all.joins(:location).distinct.pluck('locations.iso_code3')
    end
  end
end
