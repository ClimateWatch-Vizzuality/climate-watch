module Api
  module V1
    module Indc
      class LtsOverviewSerializer < ActiveModel::Serializer
        has_many :values,
                 serializer: Api::V1::Indc::ValueOverviewSerializer
      end
    end
  end
end
