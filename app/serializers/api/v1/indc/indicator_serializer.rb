module Api
  module V1
    module Indc
      class IndicatorSerializer < ActiveModel::Serializer
        attribute :id
        attribute :source
        attribute :name
        attribute :slug
        attribute :description, if: -> { object.description }
        attribute :category_ids, if: -> { object.category_ids.length.positive? }
        attribute :labels
        attribute :locations

        def name
          (instance_options[:locations_documents] && object.normalized_label.presence) || object.name
        end

        def slug
          (instance_options[:locations_documents] && object.normalized_slug.presence) || object.slug
        end

        def source
          object.source.name
        end

        def labels
          labels = if instance_options[:locations_documents] && object.normalized_slug
                     ::Indc::Label.joins(:indicator).
                       where(indc_indicators: {normalized_slug: object.normalized_slug})
                   else
                     object.labels
                   end
          IndexedSerializer.serialize(
            labels,
            serializer: LabelSerializer,
            &:id
          )
        end

        def locations
          values = if instance_options[:locations_documents]
                     object.values_for instance_options[:locations_documents]
                   # if filtering for map return only those with label + custom ones
                   elsif instance_options[:filter] == 'map' &&
                       %w(submission submission_date ndce_ghg lts_ghg lts_document lts_target lts_submission lts_date).exclude?(object.slug)
                     object.
                       values.
                       joins(:label, :location).
                       joins('LEFT JOIN indc_documents ON indc_documents.id = indc_values.document_id').
                       select('locations.iso_code3 AS iso_code3, indc_labels.slug AS label_slug, indc_values.label_id,
                              indc_values.sector_id, indc_documents.slug AS document_slug, indc_values.value AS value')
                   else
                     object.
                       values.
                       joins(:location).
                       joins('LEFT JOIN indc_documents ON indc_documents.id = indc_values.document_id').
                       joins('LEFT JOIN indc_labels ON indc_labels.id = indc_values.label_id').
                       select('locations.iso_code3 AS iso_code3, indc_labels.slug AS label_slug, indc_values.label_id,
                              indc_values.sector_id, indc_documents.slug AS document_slug, indc_values.value AS value')
                   end

          # filter out values for filtered locations
          if !instance_options[:locations_documents]
            values = values.where(locations: {iso_code3: instance_options[:location_list]}) if instance_options[:location_list]
            values = values.where(indc_documents: {slug: [instance_options[:document], nil]}) if instance_options[:document]
          end

          indexed_data = IndexedSerializer.serialize_collection(
            values,
            serializer: ValueSerializer
          ) do |v|
            v.iso_code3
          end

          # inject laws data
          if instance_options[:lse_data] && LSE_INDICATORS_MAP.keys.include?(object.normalized_slug&.to_sym)
            lse_locations_documents = instance_options[:locations_documents].
                                        select{ |ld| %w(framework sectoral).include?(ld[1].split('_').first) }
            lse_locations_documents.each do |iso, param_slug|
              is_sectoral = param_slug.starts_with?('sectoral')
              law_id = param_slug.split('_').last.to_i

              instance_options[:lse_data].group_by { |lse| lse['iso_code3'] }.each do |iso_code, targets|
                next unless iso == iso_code

                indexed_data[iso_code] ||= []
                value = []

                targets.each do |target|
                  target_laws_ids = target['sources'].map { |p| p['id'] }

                  next if target_laws_ids.exclude?(law_id)
                  next if is_sectoral && target['sector'] == 'economy-wide'

                  value << if object.normalized_slug == 'nrm_link'
                             target['sources'].select{ |t| t['id'] == law_id}.map{|t| t['link'] }.join(',')
                           elsif object.normalized_slug == 'nrm_type_of_commitment'
                             target['ghg_target'] ? 'GHG target' : 'Non GHG target'
                           elsif object.normalized_slug == 'nrm_target_multiplicity'
                             target['single_year'] ? 'Single year' : 'Multiple years'
                           else
                             target[LSE_INDICATORS_MAP[object.normalized_slug.to_sym]]
                           end
                end
                value = value.compact.uniq.join('<br>')
                if object.normalized_slug == 'nrm_summary'
                  laws = targets.flat_map { |t| t['sources'] }
                  link = laws.find { |l| l['id'] == law_id }.try(:[], 'link')
                  value += "<br><br><a href='#{link}' target='_blank' rel='noopener noreferrer'>View on Climate Laws</a>" if link
                end
                indexed_data[iso_code] << {
                  value: value,
                  document_slug: param_slug
                }
              end
            end
          end
          indexed_data
        end
      end
    end
  end
end
