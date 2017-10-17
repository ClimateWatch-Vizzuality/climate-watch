module Api
  module V1
    module WriMetadata
      class AcronymSerializer < ActiveModel::Serializer
        attribute :acronym
        attribute :definition
      end
    end
  end
end

