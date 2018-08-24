module Api
  module V1
    module Data
      module NdcSdg
        class NdcSdgSerializer < ActiveModel::Serializer
          attribute :id
          attribute(:iso_code3) { object['iso_code3'] }
          attribute(:country) { object['country'] }
          attribute(:sdg) { object['sdg'] }
          attribute(:sdg_target) { object['sdg_target'] }
          attribute(:indc_text) { object['indc_text'] }
          attribute(:status) { object['status'] }
          attribute(:sector) { object['sector'] }
          attribute(:climate_response) { object['climate_response'] }
          attribute(:type_of_information) { object['type_of_information'] }
        end
      end
    end
  end
end
