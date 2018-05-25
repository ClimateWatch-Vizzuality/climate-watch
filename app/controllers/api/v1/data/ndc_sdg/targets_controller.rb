module Api
  module V1
    module Data
      module NdcSdg
        class TargetsController < Api::V1::Data::ApiController
          def index
            set_links_header(
              [
                {
                  link: '/api/v1/data/ndc_sdgs/goals',
                  rel: 'meta goals'
                }
              ]
            )
            includes = []
            targets = ::NdcSdg::Target.all
            # rubocop:disable Style/IfUnlessModifier
            if params[:goal_id]
              targets = targets.where(goal_id: params[:goal_id])
            end
            # rubocop:enable Style/IfUnlessModifier
            if params[:include_sectors]
              includes << 'sectors'
              targets = targets.includes(:sectors)
            end
            render json: targets,
                   each_serializer: Api::V1::Data::NdcSdg::TargetSerializer,
                   include: includes
          end
        end
      end
    end
  end
end
