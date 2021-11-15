module Api
  module V1
    module CountryProfile
      class ValuesController < ApiController
        def index
          values = ::CountryProfile::Value.
            all.
            includes(:location, :indicator).
            order(:location_id, :indicator_id)

          render json: values,
                 adapter: :json,
                 each_serializer: Api::V1::CountryProfile::ValueSerializer,
                 root: :data
        end
      end
    end
  end
end
