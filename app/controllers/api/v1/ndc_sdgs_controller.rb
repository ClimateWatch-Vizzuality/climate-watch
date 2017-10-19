module Api
  module V1
    NdcSdgsMetadata = Struct.new(:sectors, :targets, :goals) do
      alias_method :read_attribute_for_serialization, :send
    end

    class NdcSdgsController < ApiController
      def index
        goals = ::NdcSdg::Goal.all
        sectors = ::NdcSdg::Sector.all
        targets = ::NdcSdg::Target.
          includes(:sectors, :goal).
          references(:sectors, :goal)

        render json: NdcSdgsMetadata.new(sectors, targets, goals),
               serializer: Api::V1::NdcSdg::MetaSerializer
      end

      def show
        ndcs = Ndc.
          includes(
            :location,
            ndc_targets: [
              :sectors,
              target: :goal
            ]
          ).
          references(
            :locations,
            ndc_targets: [
              ndc_target_sectors: :sectors,
              targets: :goals,
            ]
          ).
          joins(:location).
          where(
            locations: {
              iso_code3: params[:code].upcase
            }
          )

        unless ndcs.length.positive?
          render json: {
            error: 'NDC not found',
            status: 404
          }, status: :not_found and return
        end

        render json: ndcs.to_a,
               serializer: Api::V1::NdcSdg::NdcSerializer
      end

      def sdgs_overview
        goals = ::NdcSdg::Goal.
          includes(targets: {ndc_targets: {ndc: :location}})

        render json: goals,
               each_serializer: Api::V1::NdcSdg::GoalOverviewSerializer
      end
    end
  end
end
