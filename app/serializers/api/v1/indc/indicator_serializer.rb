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
            object.labels,
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
                  next unless target['sources'].map{|p| p['id']}.include?(law_id.to_i)
                  value  << target[LSE_INDICATORS_MAP[object.normalized_slug.to_sym]]
                end
                indexed_data[iso_code] << {
                  value: value.join('<br>'),
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
