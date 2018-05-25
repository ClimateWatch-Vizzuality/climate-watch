module Api
  module V1
    module Data
      module NdcSdg
        class GoalsController < Api::V1::Data::ApiController
          def index
            set_links_header(
              [
                {
                  link: '/api/v1/data/ndc_sdgs/targets',
                  rel: 'meta targets'
                }
              ]
            )
            includes = []
            goals = ::NdcSdg::Goal.all
            if params[:include_sectors]
              includes += ['targets', 'targets.sectors']
              goals = goals.includes(targets: :sectors)
            elsif params[:include_targets]
              includes << 'targets'
              goals = goals.includes(:targets)
            end
            render json: goals,
                   each_serializer: Api::V1::Data::NdcSdg::GoalSerializer,
                   include: includes
          end
        end
      end
    end
  end
end
