module Api
  module V1
    module HistoricalEmissions
      class RecordSerializer < ActiveModel::Serializer
        belongs_to :location
        belongs_to :gas
        belongs_to :data_source, key: :source
        belongs_to :sector
        attribute :emissions

        def location
          should_show_other? ? 'OTHER' : object.location.iso_code3
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

        def emissions
          serializing_emissions = filter_by_year(object.emissions)
          should_show_other? ?
            subtract_specific_from_global(serializing_emissions) :
            serializing_emissions
        ensd

        private

        def should_show_other?
          object.location.iso_code3 == 'WORLD' &&
            @instance_options[:params][:location].length > 0 &&
            !@instance_options[:params][:location].include?('WORLD')
        end

        def filter_by_year(records)
          date_before = @instance_options[:params]['date_before']&.to_i
          date_after = @instance_options[:params]['date_after']&.to_i

          records.select do |em|
            (date_before ? em['year'] <= date_before : true) &&
              (date_after ? em['year'] >= date_after : true)
          end
        end

        def subtract_specific_from_global(serializing_emissions)
          @instance_options[:records_specific].select do |record|
            record.gas.id == object.gas.id &&
              record.data_source.id == object.data_source.id &&
                record.sector.id == object.sector.id
          end.
          map do |match|
            filter_by_year(match.emissions)
          end.
          inject({}) do |memo, specific_emissions|
            specific_emissions.each do |emission|
              memo[emission['year']] = (memo[emission['year']] || 0) +
                emission['value']
            end
          end.
          zip(serializing_emissions).map do |specific, global|
            if global[:year] != specific[:year]
              raise 'lolwat'
            end

            {
              year: global['year'],
              value: global['value'] - specific['value']
            }
          end
        end
      end
    end
  end
end
