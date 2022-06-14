module Api
  module V1
    module Indc
      class IndicatorSerializer < ActiveModel::Serializer
        attribute :id
        attribute :source
        attribute :name
        attribute :slug
        attribute :grouping_indicator
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

        def grouping_indicator
          (instance_options[:group_indicator_slugs] || []).include?(object.slug)
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
                   elsif map_request? &&
                       %w(submission submission_date ndce_ghg lts_ghg lts_document lts_target lts_submission lts_date).exclude?(object.slug)
                     object.
                       values.
                       joins(:label, :location).
                       joins('LEFT JOIN indc_documents ON indc_documents.id = indc_values.document_id').
                       select('locations.iso_code3 AS iso_code3, indc_labels.slug AS label_slug, indc_values.label_id,
                              indc_values.sector_id, indc_documents.slug AS document_slug, indc_values.value AS value, indc_values.group_index')
                   else
                     object.
                       values.
                       joins(:location).
                       joins('LEFT JOIN indc_documents ON indc_documents.id = indc_values.document_id').
                       joins('LEFT JOIN indc_labels ON indc_labels.id = indc_values.label_id').
                       select('locations.iso_code3 AS iso_code3, indc_labels.slug AS label_slug, indc_values.label_id,
                              indc_values.sector_id, indc_documents.slug AS document_slug, indc_values.value AS value, indc_values.group_index')
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
              law_id = param_slug.split('_').last.to_i

              instance_options[:lse_data].group_by { |lse| lse['iso_code3'] }.each do |iso_code, targets|
                next unless iso == iso_code

                indexed_data[iso_code] ||= []
                value = []

                targets.each do |target|
                  target_laws_ids = target['sources'].map { |p| p['id'] }

                  next if target_laws_ids.exclude?(law_id)

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

          # sorting by document ordering to have latest document values first
          if instance_options[:document_order]
            indexed_data.transform_values do |va|
              res = va.sort_by { |v| instance_options[:document_order].index(v[:document_slug]) || 999_999 }
              res = res.take(1) if map_request? # only take the latest if map request
              res
            end
          else
            indexed_data
          end
        end

        def map_request?
          instance_options[:filter] == 'map'
        end
      end
    end
  end
end
