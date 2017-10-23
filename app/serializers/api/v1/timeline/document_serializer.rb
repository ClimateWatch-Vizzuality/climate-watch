module Api
  module V1
    module Timeline
      class DocumentSerializer < ActiveModel::Serializer
        attribute :source
        attribute :location, if: -> { instance_options[:show_location] }
        attribute :link
        attribute :text
        attribute :date
        attribute :language
        attribute :notes, if: -> { object.notes.length.positive? }

        def source
          object.source.name
        end

        def location
          object.location.iso_code3
        end

        def notes
          object.notes.map(&:note)
        end
      end
    end
  end
end

