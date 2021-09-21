module Api
  module V1
    class ZipFileSerializer < ActiveModel::Serializer
      include ActionView::Helpers::NumberHelper

      attribute :dropdown_title
      attribute :url
      attribute :size

      def size
        number_to_human_size(object.byte_size, precision: 2)
      end
    end
  end
end
