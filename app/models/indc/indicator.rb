module Indc
  class Indicator < ApplicationRecord
    belongs_to :source, class_name: 'Indc::Source'
    has_many :values, class_name: 'Indc::Value'
    has_many :labels, class_name: 'Indc::Label'
    has_and_belongs_to_many :categories,
                            join_table: :indc_indicators_categories

    validates :slug, presence: true
    validates :name, presence: true
    validates :slug, uniqueness: true

    # format of the expected params is:
    # [[iso_code3, doc_slug], [iso_code3, doc_slug]]
    def values_for(locations_documents)
      result = values.includes(:document, :location).joins(:document, :location)
      where_clause = locations_documents.map do |loc, doc|
        "(locations.iso_code3 = '#{loc}' AND indc_documents.slug = '#{doc}')"
      end.join(' OR ')

      result.where(where_clause)
    end
  end
end
