module Api
  module V1
    module Data
      module HistoricalEmissions
        class RecordSerializer < ActiveModel::Serializer
          attribute :region { object['region'] }
          attribute :iso_code3 { object['iso_code3'] }
          attribute :gas { object['gas'] }
          attribute :data_source { object['data_source'] }
          attribute :sector { object['sector'] }
          attribute :gwp { object['gwp'] }
          attribute :unit { 'C02e' }
          attribute :emissions do
            start_year = @instance_options[:params]['start_year']&.to_i
            end_year = @instance_options[:params]['end_year']&.to_i

            ::HistoricalEmissions::EmissionsTransformation.new(object.emissions).
              filter(start_year, end_year).
              transformed_emissions
          end
        end
      end
    end
  end
end

