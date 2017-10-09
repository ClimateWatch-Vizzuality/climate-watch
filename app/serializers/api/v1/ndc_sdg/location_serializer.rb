module Api
  module V1
    module NdcSdg
      class LocationSerializer < ActiveModel::Serializer
        include Rails.application.routes.url_helpers

        attributes :iso_code3, :links, :sectors, :sdgs

        def links
          {self: sdgs_api_v1_ndc_path(code: object.iso_code3)}
        end

        def sectors
          ary = ::NdcSdg::Sector.order(:name).select(:id, :name)
          Hash[ary.map { |s| [s.id, {name: s.name}] }]
        end

        def sdgs
          result = {}
          ndc_targets = object.ndc_targets.includes(:ndc_target_sectors)
          ::NdcSdg::Goal.eager_load(:targets).
            order('ndc_sdg_goals.number::INT, ndc_sdg_targets.number').
            each do |goal|
            result[goal.number] = goal_properties(goal, ndc_targets)
          end
          result
        end

        def goal_properties(goal, ndc_targets)
          goal_properties = {
            title: goal.cw_title,
            colour: goal.colour,
            targets: {}
          }
          goal.targets.each do |target|
            goal_properties[:targets][target.number] = target_properties(
              target, ndc_targets
            )
          end
          goal_properties
        end

        def target_properties(target, ndc_targets)
          target_properties = {
            title: target.title
          }
          ndc_target = ndc_targets.select { |o| o.target_id == target.id }.
            first
          if ndc_target
            sector_ids = ndc_target.ndc_target_sectors.map(&:sector_id)
            target_properties[:sectors] = sector_ids
          end
          target_properties
        end
      end
    end
  end
end
