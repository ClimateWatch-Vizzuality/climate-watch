module Api
  module V1
    module WbExtra
      class IndexSerializer < ActiveModel::Serializer
        def attributes(*args)
          IndexedSerializer.serialize_collection(
            object,
            serializer: Api::V1::WbExtra::CountryDataSerializer
          ) do |c|
            c.location.iso_code3
          end
        end
      end
    end
  end
end

