module Api
  module V1
    module NdcSdg
      class MetaSerializer < ActiveModel::Serializer
        has_many :sectors,
                 serializer: Api::V1::NdcSdg::SectorSerializer
        has_many :targets,
                 serializer: Api::V1::NdcSdg::TargetSerializer
        has_many :goals,
                 serializer: Api::V1::NdcSdg::GoalSerializer
      end
    end
  end
end
