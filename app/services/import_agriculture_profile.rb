class ImportAgricultureProfile
  # rubocop:disable LineLength
  EMISSIONS_FILEPATH = "#{CW_FILES_PREFIX}agriculture/Agr FAOSTAT Emissions Sample Data 823.csv".freeze
  INPUTS_FILEPATH = "#{CW_FILES_PREFIX}agriculture/Agr FAOSTAT Inputs Sample Data 823.csv".freeze
  LAND_USE_FILEPATH = "#{CW_FILES_PREFIX}agriculture/Agr FAOSTAT Land Use Sample Data 823.csv".freeze
  MACRO_INDICATORS_FILEPATH = "#{CW_FILES_PREFIX}agriculture/Agr FAOSTAT Macro Indicators Sample Data 823.csv".freeze
  PRODUCTION_FILEPATH = "#{CW_FILES_PREFIX}agriculture/Agr FAOSTAT Production and Trade Sample Data 823.csv".freeze
  WATER_WITHDRAWAL_FILEPATH = "#{CW_FILES_PREFIX}agriculture/Agr FAOSTAT Water Withdrawal Database 823.csv".freeze
  FAO_FILEPATH = "#{CW_FILES_PREFIX}agriculture/Agr OECD_FAO Sample Data 823.csv".freeze
  WBD_FILEPATH = "#{CW_FILES_PREFIX}agriculture/Agr WBD Sample Data 823.csv".freeze
  LEGEND_FILEPATH = "#{CW_FILES_PREFIX}agriculture/Legend File 823.csv".freeze
  METADATA_FILEPATH = "#{CW_FILES_PREFIX}agriculture/metadata_sources_823.csv".freeze

  # rubocop:enable LineLength
  #
  def call
    cleanup
    Rails.logger.info "Importing LEGEND"
    import_emission_categories(S3CSVReader.read(LEGEND_FILEPATH))
    Rails.logger.info "Importing EMISSIONS"
    import_emissions(S3CSVReader.read(EMISSIONS_FILEPATH))
    Rails.logger.info "Importing MACRO_INDICATORS"
    import_country_contexts(S3CSVReader.read(MACRO_INDICATORS_FILEPATH))
    Rails.logger.info "Importing WBD"
    import_country_contexts(S3CSVReader.read(WBD_FILEPATH))
    Rails.logger.info "Importing INPUTS"
    import_country_contexts(S3CSVReader.read(INPUTS_FILEPATH))
    Rails.logger.info "Importing WATER_WITHDRAWAL"
    import_country_contexts(S3CSVReader.read(WATER_WITHDRAWAL_FILEPATH))
    Rails.logger.info "Update water withdrawal rank"
    update_water_withdrawal_rank
    Rails.logger.info "Importing LAND_USE_FILEPATH"
    import_areas(S3CSVReader.read(LAND_USE_FILEPATH))
    Rails.logger.info "Importing FAO_FILEPATH"
    import_meat_consumptions(S3CSVReader.read(FAO_FILEPATH))
    Rails.logger.info "Importing PRODUCTION_FILEPATH"
    import_meat_trades(S3CSVReader.read(PRODUCTION_FILEPATH))
  end

  private

  def cleanup
    AgricultureProfile::Emission.delete_all
    AgricultureProfile::EmissionSubcategory.delete_all
    AgricultureProfile::EmissionCategory.delete_all
    AgricultureProfile::CountryContext.delete_all
    AgricultureProfile::Area.delete_all
    AgricultureProfile::MeatConsumption.delete_all
    AgricultureProfile::MeatProduction.delete_all
    AgricultureProfile::MeatTrade.delete_all
  end


  def emission_subcategory_attributes(row, category_id)
    {
      name: row[:sub_category],
      emission_category_id: category_id,
      short_name: row[:short_names],
      indicator_name: row[:indicator_name]
    }
  end

  def emission_attributes(values, location_id, subcategory_id)
    {
        emission_subcategory_id: subcategory_id,
        location_id: location_id,
        values: values
    }
  end

  def import_emission_categories(content)
    content.each do |row|
      category_id = AgricultureProfile::EmissionCategory
                        .find_or_create_by!(name: row['Category']).id rescue nil
      AgricultureProfile::EmissionSubcategory
          .create!(emission_subcategory_attributes(row, category_id))
    end
  end

  def import_emissions(content)
    content.each do |row|
      begin
        location_id = Location.find_by(iso_code3: row[:area]).id
      rescue
        puts row
      end
      subcategory_id =
          AgricultureProfile::EmissionSubcategory.find_by(
              short_name: row[:short_names]).id
      values = row.to_h.except(:area, :short_names)
      next if values.blank?
      AgricultureProfile::Emission.create!(
          emission_attributes(values,
                              location_id, subcategory_id))
    end
  end

  def import_country_contexts(content)
    content.each do |row|
      location_id = Location.find_by(iso_code3: row[:area]).id
      indicator = row[:short_names]
      values = row.to_h.except(:area, :short_names)
      values.each do |value|
        next if value.second.blank?
        context =
            AgricultureProfile::CountryContext
                .find_or_create_by(location_id: location_id,
                                   year: value.first.to_s.to_i)
        eval("context.#{indicator.downcase} = value.second")
        context.save!
      end
    end
  end

  def import_areas(content)
    content.each do |row|
      location_id = Location.find_by(iso_code3: row[:area]).id
      indicator = row[:short_names]
      values = row.to_h.except(:area, :short_names)
      values.each do |value|
        next if value.second.blank?
        area =
            AgricultureProfile::Area
                .find_or_create_by(location_id: location_id,
                                   year: value.first.to_s.to_i)
        eval("area.#{indicator.downcase} = value.second")
        area.save!
      end
    end
  end

  def import_meat_consumptions(content)
    content.each do |row|
      location_id = Location.find_by(iso_code3: row[:country]).id
      indicator = row[:short_names]
      values = row.to_h.except(:area, :short_names)
      values.each do |value|
        next if value.second.blank?
        meat =
            AgricultureProfile::MeatConsumption
                .find_or_create_by(location_id: location_id,
                                   year: value.first.to_s.to_i)
        eval("meat.#{indicator.downcase} = value.second")
        meat.save!
      end
    end
  end

  def import_meat_trades(content)
    content.each do |row|
      location_id = Location.find_by(iso_code3: row[:area]).id
      indicator = row[:short_names]
      values = row.to_h.except(:area, :short_names)
      values.each do |value|
        next if value.second.blank?
        meat = if indicator.starts_with?('production')
                 AgricultureProfile::MeatProduction
                     .find_or_create_by(location_id: location_id,
                                        year: value.first.to_s.to_i)
               else
                 AgricultureProfile::MeatTrade
                     .find_or_create_by(location_id: location_id,
                                        year: value.first.to_s.to_i)
               end

        eval("meat.#{indicator.downcase} = value.second")
        meat.save!
      end
    end
  end

  def update_water_withdrawal_rank
    years = AgricultureProfile::CountryContext
                .select(:year).distinct.pluck(:year)

    years.each do |year|
      sql = "
       WITH cte as (
       SELECT id, water_withdrawal,
              RANK() OVER ( ORDER BY water_withdrawal ASC) AS rnk
       FROM agriculture_profile_country_contexts
       WHERE year = #{year}
       )
       UPDATE agriculture_profile_country_contexts 
       SET water_withdrawal_rank = cte.rnk
       FROM cte
       WHERE agriculture_profile_country_contexts.id = cte.id
       AND agriculture_profile_country_contexts.water_withdrawal IS NOT NULL
      "

      ActiveRecord::Base.connection.execute(sql)
    end
  end
end
