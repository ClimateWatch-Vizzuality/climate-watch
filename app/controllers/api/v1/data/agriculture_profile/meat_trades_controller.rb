module Api
  module V1
    module Data
      module AgricultureProfile
        class MeatTradesController < Api::V1::Data::ApiController
          include CountableMetadata
          def index
            meat = ::AgricultureProfile::MeatTrade.filter(params)

            render json: meat,
                   adapter: :json,
                   each_serializer: Api::V1::Data::AgricultureProfile::MeatTradeSerializer,
                   root: :data,
                   meta: meta(::AgricultureProfile::MeatTrade,
                              ::AgricultureProfile::Metadatum.meat_trades)
          end
        end
      end
    end
  end
end