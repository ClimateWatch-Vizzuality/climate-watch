class ImportAgricultureProfile
  include ClimateWatchEngine::CSVImporter

  # rubocop:disable LineLength
  FAO_FILEPATH = "#{CW_FILES_PREFIX}agriculture/Agr OECD_FAO Sample Data 823.csv".freeze
  LAND_USE_FILEPATH = "#{CW_FILES_PREFIX}agriculture/Agr FAOSTAT Land Use Sample Data 823.csv".freeze
  PRODUCTION_FILEPATH = "#{CW_FILES_PREFIX}agriculture/Agr FAOSTAT Production and Trade Sample Data 823.csv".freeze
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
    import_each_with_logging(content, filepath) do |row|
      location_id = Location.find_by(iso_code3: row[:area]).id
      indicator = row[:short_names]
      values = row.to_h.except(:area, :short_names)
      values.each do |value|
        next if value.second.blank?
        area =
          AgricultureProfile::Area.find_or_initialize_by(
            location_id: location_id,
            year: value.first.to_s.to_i)
        area.send(:"#{indicator.downcase}=", value.second)
        area.save!
      end
    end
  end

  def import_meat_consumptions(content, filepath)
    import_each_with_logging(content, filepath) do |row|
      location_id = Location.find_by(iso_code3: row[:country]).id
      indicator = row[:short_names]
      values = row.to_h.except(:area, :short_names)
      values.each do |value|
        next if value.second.blank?
        meat =
          AgricultureProfile::MeatConsumption.find_or_initialize_by(
            location_id: location_id,
            year: value.first.to_s.to_i)
        meat.send(:"#{indicator.downcase}=", value.second)
        meat.save!
      end
    end
  end

  def import_meat_trades(content, filepath)
    import_each_with_logging(content, filepath) do |row|
      location_id = Location.find_by(iso_code3: row[:area]).id
      indicator = row[:short_names]
      values = row.to_h.except(:area, :short_names)
      values.each do |value|
        next if value.second.blank?
        meat = if indicator.starts_with?('production')
                 AgricultureProfile::MeatProduction.find_or_initialize_by(
                   location_id: location_id,
                   year: value.first.to_s.to_i)
               else
                 AgricultureProfile::MeatTrade.find_or_initialize_by(
                   location_id: location_id,
                   year: value.first.to_s.to_i)
               end

        meat.send(:"#{indicator.downcase}=", value.second)
        meat.save!
      end
    end
  end
end
