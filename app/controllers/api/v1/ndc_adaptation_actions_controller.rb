module Api
  module V1
    class NdcAdaptationActionsController < ApiController
      def index
        documents = ::Indc::Document.where(is_ndc: true).order(:ordering)
        sectors = group_sectors(::Indc::Sector.where(sector_type: %w[adapt_now wb]))
        actions = ::Indc::AdaptationAction.includes(:location, :sectors)
        actions = actions.where(locations: {iso_code3: location_list}) if location_list.present?

        render json: {
          documents: documents,
          sectors: sectors,
          actions: actions.map do |action|
            {
              title: action.title,
              location_id: action.location_id,
              location_iso: action.location.iso_code3,
              document_id: action.document_id,
              sector_ids: action.sector_ids
            }
          end
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
              sector_type: parent.sector_type,
              subsectors: subsectors.sort_by(&:name_general_first).map do |s|
                s.as_json(only: [:id, :name])
              end
            }
          end.compact
      end

      def location_list
        params[:location]&.split(',')
      end
    end
  end
end
