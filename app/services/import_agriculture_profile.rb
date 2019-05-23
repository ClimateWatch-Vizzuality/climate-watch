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
        area =
          AgricultureProfile::Area.find_or_initialize_by(
            location_id: location_id,
            year: value.first.to_s.to_i)
        area.send(:"#{indicator.downcase}=", value.second)
        areas << area
      end
    end
    AgricultureProfile::Area.import!(areas)
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
        meat =
          AgricultureProfile::MeatConsumption.find_or_initialize_by(
            location_id: location_id,
            year: value.first.to_s.to_i)
        meat.send(:"#{indicator.downcase}=", value.second)
        meats << meat
      end
    end
    AgricultureProfile::MeatConsumption.import!(meats)
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
        if indicator.starts_with?('production')
          meat_production = AgricultureProfile::MeatProduction.find_or_initialize_by(
            location_id: location_id,
            year: value.first.to_s.to_i)
          meat_production.send(:"#{indicator.downcase}=", value.second)
          meat_productions << meat_production
        else
          meat_trade = AgricultureProfile::MeatTrade.find_or_initialize_by(
            location_id: location_id,
            year: value.first.to_s.to_i)
          meat_trade.send(:"#{indicator.downcase}=", value.second)
          meat_trades << meat_trade
        end
      end
    end
    AgricultureProfile::MeatProduction.import!(meat_productions)
    AgricultureProfile::MeatTrade.import!(meat_trades)
  end
end
