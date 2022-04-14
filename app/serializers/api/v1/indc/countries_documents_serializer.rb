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
            if docs.select { |t| t['slug'] == 'second_ndc' }.empty? &&
                location_with_intent_to_submit.include?(location.iso_code3)
              docs += ::Indc::Document.select('indc_documents.*, NULL AS submission_date').
                where(slug: 'second_ndc')
            end

            # laws_info structure
            # [
            #   { 'USA': { in_framework: true, in_sectoral: false } },
            #   ...
            # ]
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
            total_countries = ::Indc::Submission.where(document_id: d.id).distinct.count(:location_id)

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
          laws_and_policies.select { |law| law[:slug].starts_with?('framework') }
        end

        def sectoral
          laws_and_policies.select { |law| law[:slug].starts_with?('sectoral') }
        end

        private

        def laws_and_policies
          return [] unless object.laws_and_policies && object.laws_and_policies['targets']

          law_targets = {}

          laws = object.laws_and_policies['targets'].flat_map do |target|
            target['sources'].map do |law|
              next unless law['sectoral'] || law['framework']

              law_targets[law['id']] ||= []
              law_targets[law['id']] << target['id']

              {
                id: law['id'],
                slug: "#{law['sectoral'] ? 'sectoral' : 'framework'}_#{law['id']}",
                long_name: law['title'],
                url: law['link'],
                iso: target['iso_code3']
              }
            end
          end.compact.uniq

          # update laws titles with target count
          laws.each do |law|
            target_count = law_targets[law[:id]].uniq.size

            next unless target_count.positive?

            law[:long_name] += " (#{target_count})"
          end

          laws
        end

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
          ::Indc::Document.
            joins(submissions: :location).
            select('indc_documents.*, locations.iso_code3, indc_submissions.submission_date, indc_submissions.url').
            where(locations: {iso_code3: location_codes, show_in_cw: true}).
            where(::Indc::Value.where('location_id = locations.id and document_id = indc_documents.id').exists).
            order(:ordering).
            distinct.
            group_by(&:iso_code3)
        end
      end
    end
  end
end
