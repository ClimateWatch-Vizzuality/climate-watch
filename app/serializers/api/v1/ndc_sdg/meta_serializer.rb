module Api
  module V1
    module NdcSdg
      class MetaSerializer < ActiveModel::Serializer
        has_many :sectors,
                 serializer: Api::V1::NdcSdg::SectorMetaSerializer
        has_many :targets,
                 serializer: Api::V1::NdcSdg::TargetMetaSerializer
        has_many :goals,
                 serializer: Api::V1::NdcSdg::GoalMetaSerializer
      end
    end
  end
end
