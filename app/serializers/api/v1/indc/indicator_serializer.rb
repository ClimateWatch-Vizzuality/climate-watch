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
                   else
                     object.values
                   end
          indexed_data = IndexedSerializer.serialize_collection(
            values,
            serializer: ValueSerializer
          ) do |v|
            v.location.iso_code3
          end

          # inject laws data
          if instance_options[:lse_data] && LSE_INDICATORS_MAP.keys.include?(object.normalized_slug&.to_sym)
            instance_options[:locations_documents].select{|ld| ['framework', 'sectoral'].include?(ld[1].split('_').first)}.each do |iso, param_slug|
              law_id = param_slug.split('_').last
              instance_options[:lse_data].group_by{|lse| lse['iso_code3']}.each do |iso_code, data|
                next unless iso == iso_code
                indexed_data[iso_code] ||= []
                value = []
                data.each do |target|
                  next unless target['sources'].map{|p| p['id']}.include?(law_id.to_i) && target['sector'] != 'economy-wide'

                  value << if object.normalized_slug == 'nrm_link'
                             target['sources'].select{|t| t['id'] == law_id.to_i}.map{|t| t['link']}.join(',')
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
                  link = data.first && data.first['sources']&.select{|t| t['id'] == law_id.to_i}&.map{|t| t['link']}&.first
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
