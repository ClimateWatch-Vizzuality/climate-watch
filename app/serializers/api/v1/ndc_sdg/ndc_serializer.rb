module Api
  module V1
    module NdcSdg
      class NdcSerializer < ActiveModel::Serializer
        include Rails.application.routes.url_helpers

        attributes :iso_code3, :links, :sectors, :sdgs

        def iso_code3
          object.location.try(:iso_code3)
        end

        def links
          {self: sdgs_api_v1_ndc_path(code: iso_code3)}
        end

        def sectors
          NdcSdg::Sector.order(:name).pluck(:id, :name)
        end

        def sdgs
          object.ndc_targets
        end
      end
    end
  end
end
