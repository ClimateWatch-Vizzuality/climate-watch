class ImportAgricultureProfile
  include ClimateWatchEngine::CSVImporter

  # rubocop:disable LineLength
  FAO_FILEPATH = "#{CW_FILES_PREFIX}agriculture_profile/Agr OECD_FAO Sample Data 823.csv".freeze
  LAND_USE_FILEPATH = "#{CW_FILES_PREFIX}agriculture_profile/Agr FAOSTAT Land Use Sample Data 823.csv".freeze
  PRODUCTION_FILEPATH = "#{CW_FILES_PREFIX}agriculture_profile/Agr FAOSTAT Production and Trade Sample Data 823.csv".freeze
  # rubocop:enable LineLength

  def call
    ActiveRecord::Base.transaction do
      cleanup
      Rails.logger.info "Importing LAND_USE_FILEPATH"
      import_areas(S3CSVReader.read(LAND_USE_FILEPATH), LAND_USE_FILEPATH)
      Rails.logger.info "Importing FAO_FILEPATH"
      import_meat_consumptions(S3CSVReader.read(FAO_FILEPATH), FAO_FILEPATH)
      Rails.logger.info "Importing PRODUCTION_FILEPATH"
      import_meat_trades(S3CSVReader.read(PRODUCTION_FILEPATH), PRODUCTION_FILEPATH)
    end
  end

  private

  def cleanup
    AgricultureProfile::Area.delete_all
    AgricultureProfile::MeatConsumption.delete_all
    AgricultureProfile::MeatProduction.delete_all
    AgricultureProfile::MeatTrade.delete_all
  end

  def import_areas(content, filepath)
    areas = []
    locations = {}
    import_each_with_logging(content, filepath) do |row|
      location_id = if !locations[row[:area]]
                      location_id = Location.find_by(iso_code3: row[:area]).id
                      locations[row[:area]] = location_id
                      location_id
                    else
                      locations[row[:area]]
                    end
      indicator = row[:short_names]
      values = row.to_h.except(:area, :short_names)
      values.each do |value|
        next if value.second.blank?
        year = value.first.to_s.to_i
        area = areas.select{|m| m.location_id == location_id && m.year == year }.first ||
          AgricultureProfile::Area.find_or_initialize_by(location_id: location_id, year: year)
        area.send(:"#{indicator.downcase}=", value.second)
        areas << area
      end
      puts "#{areas.size} areas to add!"
      AgricultureProfile::Area.import!(areas,
                                       on_duplicate_key_update: { conflict_target: [:id],
                                                                  columns: [:share_in_land_area_1,
                                                                            :share_in_land_area_2,
                                                                            :share_in_land_area_3,
                                                                            :share_in_land_area_4,
                                                                            :share_in_agricultural_area_1,
                                                                            :share_in_agricultural_area_2,
                                                                            :share_in_agricultural_area_3]
      })
      areas = []
    end
  end

  def import_meat_consumptions(content, filepath)
    meats = []
    locations = {}
    import_each_with_logging(content, filepath) do |row|
      location_id = if !locations[row[:country]]
                      location_id = Location.find_by(iso_code3: row[:country]).id
                      locations[row[:country]] = location_id
                      location_id
                    else
                      locations[row[:country]]
                    end
      indicator = row[:short_names]
      values = row.to_h.except(:country, :short_names)
      values.each do |value|
        next if value.second.blank?
        year = value.first.to_s.to_i
        meat = meats.select{|m| m.location_id == location_id && m.year == year }.first ||
          AgricultureProfile::MeatConsumption.find_or_initialize_by(location_id: location_id,
            year: year)
        meat.send(:"#{indicator.downcase}=", value.second)
        meats << meat
      end
      puts "#{meats.size} records to add of meat consumption"
      AgricultureProfile::MeatConsumption.import!(meats,
                                       on_duplicate_key_update: { conflict_target: [:id],
                                                                  columns: [:meat_consumption_1,
                                                                            :meat_consumption_2,
                                                                            :meat_consumption_3,
                                                                            :meat_consumption_4,
                                                                            :meat_consumption_per_capita_1,
                                                                            :meat_consumption_per_capita_2,
                                                                            :meat_consumption_per_capita_3,
                                                                            :meat_consumption_per_capita_4]
      })
      meats = []
    end
  end

  def import_meat_trades(content, filepath)
    meat_trades = []
    meat_productions = []
    locations = {}
    import_each_with_logging(content, filepath) do |row|
      location_id = if !locations[row[:area]]
                      location_id = Location.find_by(iso_code3: row[:area]).id
                      locations[row[:area]] = location_id
                      location_id
                    else
                      locations[row[:area]]
                    end
      indicator = row[:short_names]
      values = row.to_h.except(:area, :short_names)
      values.each do |value|
        next if value.second.blank?
        year = value.first.to_s.to_i
        if indicator.starts_with?('production')
          meat_production = meat_productions.select do |mp|
            mp.location_id == location_id && mp.year == year
          end.first ||
            AgricultureProfile::MeatProduction.find_or_initialize_by(location_id: location_id,
                                                   year: year)
          meat_production.send(:"#{indicator.downcase}=", value.second)
          meat_productions << meat_production
        else
          meat_trade = meat_trades.select do |mt|
            mt.location_id == location_id && mt.year == year
          end.first ||
          AgricultureProfile::MeatTrade.find_or_initialize_by(location_id: location_id,
                                            year: year)
          meat_trade.send(:"#{indicator.downcase}=", value.second)
          meat_trades << meat_trade
        end
      end
      puts "#{meat_productions.size} meat productions to add"
      puts "#{meat_trades.size} meat trades to add"
      AgricultureProfile::MeatProduction.import!(meat_productions,
                                       on_duplicate_key_update: { conflict_target: [:id],
                                                                  columns: [:production_agr_1,
                                                                            :production_agr_2,
                                                                            :production_agr_3,
                                                                            :production_agr_4,
                                                                            :production_agr_5,
                                                                            :production_agr_6,
                                                                            :production_agr_7,
                                                                            :production_agr_8,
                                                                            :production_agr_9,
                                                                            :production_agr_10]
      })
      AgricultureProfile::MeatTrade.import!(meat_trades,
                                       on_duplicate_key_update: { conflict_target: [:id],
                                                                  columns: [:trade_import_1,
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
                                                                            :trade_export_8]
      })
      meat_productions = []
      meat_trades = []
    end
  end
end
