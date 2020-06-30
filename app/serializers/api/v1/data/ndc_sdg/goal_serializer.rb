module Api
  module V1
    module Data
      module NdcSdg
        class GoalSerializer < ActiveModel::Serializer
          attribute :id
          attribute :number
          attribute :title
          attribute :cw_title
          attribute :slug

          has_many :targets

          def slug
            object.cw_title.parameterize
          end
        end
      end
    end
  end
end
