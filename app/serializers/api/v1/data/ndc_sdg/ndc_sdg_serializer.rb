module Api
  module V1
    module Data
      module NdcSdg
        class NdcSdgSerializer < ActiveModel::Serializer
          attribute :id
          attribute(:country) { object['country'] }
          attribute(:iso_code3) { object['iso_code3'] }
          attribute(:indc_text) { object['indc_text'] }
          attribute(:status) { object['status'] }
          attribute(:climate_response) { object['climate_response'] }
          attribute(:type_of_information) { object['type_of_information'] }
          attribute(:sector) { object['sector'] }
          attribute(:target_number) { object['target_number'] }
          attribute(:target) { object['target'] }
          attribute(:goal_number) { object['goal_number'] }
          attribute(:goal) { object['goal'] }
          attribute(:document_type) { object['document_type'] }
          attribute(:language) { object['document_language'] }
        end
      end
    end
  end
end
