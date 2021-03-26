# == Schema Information
#
# Table name: indc_indicators
#
#  id                :bigint           not null, primary key
#  source_id         :bigint           not null
#  slug              :text             not null
#  name              :text             not null
#  description       :text
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  order             :integer
#  multiple_versions :boolean
#  normalized_slug   :string
#  normalized_label  :string
#
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
      result = if normalized_slug
                 Indc::Value.joins(:indicator).
                   where(indc_indicators: {normalized_slug: normalized_slug})
               else
                 values
               end
      result = result.joins(:document, :location).
        select(
          'locations.iso_code3 AS iso_code3, NULL AS label_slug, indc_values.label_id,
          indc_values.sector_id, indc_documents.slug AS document_slug, indc_values.value AS value'
        )
      where_clause = locations_documents.map do |loc, doc|
        "(locations.iso_code3 = '#{loc}' AND indc_documents.slug = '#{doc}')"
      end.join(' OR ')

      result.where(where_clause)
    end
  end
end
