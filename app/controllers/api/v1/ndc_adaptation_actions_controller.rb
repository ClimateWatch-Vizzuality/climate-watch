module Api
  module V1
    class NdcAdaptationActionsController < ApiController
      before_action :fetch_location

      def show
        documents = ::Indc::Document.where(is_ndc: true).order(:ordering)
        sectors = group_sectors(::Indc::Sector.where(sector_type: %w[adapt_now wb]))
        actions = ::Indc::AdaptationAction.where(location: @location)

        render json: {
          documents: documents,
          sectors: sectors,
          actions: actions
        }
      end

      private

      def group_sectors(sectors)
        sectors.
          includes(:parent).
          group_by(&:parent).
          map do |parent, subsectors|
            next unless parent.present?

            {
              id: parent.id,
              name: parent.name,
              subsectors: subsectors.sort_by(&:name_general_first).map do |s|
                s.as_json(only: [:id, :name])
              end
            }
          end.compact
      end

      def fetch_location
        @location = Location.find_by!(iso_code3: params[:code])
      end
    end
  end
end
