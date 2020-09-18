module Api
  module V1
    module Indc
      class CountriesDocumentsSerializer < ActiveModel::Serializer
        attributes :documents, :framework, :sectoral, :data

        def data
          location_codes = object.locations.map(&:iso_code3)

          location_with_intent_to_submit = query_location_with_intent_to_submit(location_codes)
          documents_by_location = query_documents_by_location(location_codes)

          object.locations.map do |location|
            docs = documents_by_location[location.iso_code3] || []

            ordering = docs.empty? ? 0 : docs.last['ordering']

            # if country hasn't submitted a second_ndc, but they have expressed
            # the intention of doing so, by responding 'enhance_2020', or 'intend_2020'
            # on indicator with slug: ndce_status_2020 / ndce_status_2020_label
            if docs.select{|t| t['slug'] == 'second_ndc'}.empty? &&
                location_with_intent_to_submit.include?(location.iso_code3)
              docs += ::Indc::Document.select('indc_documents.*, NULL AS submission_date').
                where(slug: 'second_ndc')
            end

            if object.laws_info[location.iso_code3]
              docs += object.laws_info[location.iso_code3].map do |key, val|
                next unless val
                ordering += 1
                title = key == 'in_framework' ? 'Climate Framework Laws or Policies' : 'Sectoral Laws or Policies'
                {
                  id: nil,
                  ordering: ordering,
                  slug: key.gsub('in_', ''),
                  long_name: title,
                  description: title,
                  is_ndc: false,
                  submission_date: nil
                }
              end.compact
            end

            [location.iso_code3, docs]
          end.to_h
        end

        def documents
          ::Indc::Document.order(:ordering).map do |d|
            total_countries = Location.where(id: ::Indc::Submission.select(:location_id).where(document_id: d.id).
                                             distinct.pluck(:location_id)).count
            {
              id: d.id,
              ordering: d.ordering,
              slug: d.slug,
              long_name: d.long_name,
              description: d.description,
              is_ndc: d.is_ndc,
              total_countries: total_countries
            }
          end
        end

        def framework
          return [] unless object.laws_and_policies && object.laws_and_policies['targets']

          object.laws_and_policies['targets'].map do |target|
            next if target['sources'].empty? || !target['sources'].first['framework']
            source = target['sources'].first

            {
              id: source['id'],
              slug: "framework_#{source['id']}",
              long_name: source['title'],
              url: source['link'],
              iso: target['iso_code3']
            }
          end.compact.uniq
        end

        def sectoral
          return [] unless object.laws_and_policies && object.laws_and_policies['targets']

          object.laws_and_policies['targets'].map do |target|
            next if target['sources'].empty? || !target['sources'].first['sectoral']

            source = target['sources'].first

            {
              id: source['id'],
              slug: "sectoral_#{source['id']}",
              long_name: source['title'],
              url: source['link'],
              iso: target['iso_code3']
            }
          end.compact.uniq
        end

        private

        def query_location_with_intent_to_submit(location_codes)
          ::Indc::Label.
            joins(:indicator, indc_values: :location).
            where(locations: {iso_code3: location_codes}).
            where(slug: ['enhance_2020', 'intend_2020']).
            where(indc_indicators: {slug: 'ndce_status_2020'}).
            select('DISTINCT iso_code3').
            pluck(:iso_code3)
        end

        def query_documents_by_location(location_codes)
          ::Indc::Document.joins(values: :location).
            joins('JOIN indc_submissions ON indc_submissions.document_id = indc_documents.id AND indc_submissions.location_id = locations.id').
            select('indc_documents.*, locations.iso_code3, indc_submissions.submission_date').
            where(locations: {iso_code3: location_codes, show_in_cw: true}).
            order(:ordering).
            distinct.
            group_by(&:iso_code3)
        end
      end
    end
  end
end
