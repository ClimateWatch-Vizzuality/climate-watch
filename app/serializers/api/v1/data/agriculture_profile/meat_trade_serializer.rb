module Api
  module V1
    module Data
      module AgricultureProfile
        class MeatTradeSerializer < ActiveModel::Serializer
          attributes :location_id, :year,
                     :trade_import_1,
                     :trade_import_2,
                     :trade_import_3,
                     :trade_import_4,
                     :trade_import_5,
                     :trade_import_6,
                     :trade_import_7,
                     :trade_import_8,
                     :trade_export_1,
                     :trade_export_2,
                     :trade_export_3,
                     :trade_export_4,
                     :trade_export_5,
                     :trade_export_6,
                     :trade_export_7,
                     :trade_export_8
        end
      end
    end
  end
end
