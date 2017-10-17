module Api
  module V1
    module Indc
      class OverviewSerializer < ActiveModel::Serializer
        has_many :values,
                 serializer: Api::V1::Indc::ValueOverviewSerializer
        attribute :sectors
      end
    end
  end
end
