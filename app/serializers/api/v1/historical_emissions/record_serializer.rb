module Api
  module V1
    module HistoricalEmissions
      class RecordSerializer < ActiveModel::Serializer
        belongs_to :location
        belongs_to :gas
        belongs_to :data_source, key: :source
        belongs_to :sector
        attribute :iso_code3
        attribute :emissions
        attribute :gwp

        def location
          object.location.wri_standard_name
        end

        def iso_code3
          object.location.iso_code3
        end

        def gas
          object.gas.name
        end

        def data_source
          object.data_source.name
        end

        def sector
          object.sector.name
        end

        def gwp
          object.gwp&.name
        end

        def emissions
          date_before = @instance_options[:params]['date_before']&.to_i
          date_after = @instance_options[:params]['date_after']&.to_i

          object.emissions.select do |em|
            (date_before ? em['year'] <= date_before : true) &&
              (date_after ? em['year'] >= date_after : true)
          end
        end
      end
    end
  end
end
