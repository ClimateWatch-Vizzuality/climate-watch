module Api
  module V1
    module Data
      module NdcSdg
        class TargetSerializer < ActiveModel::Serializer
          attribute :id
          attribute :goal_id
          attribute :number
          attribute :title
          attribute :slug

          has_many :sectors

          def slug
            object.title.parameterize
          end
        end
      end
    end
  end
end
