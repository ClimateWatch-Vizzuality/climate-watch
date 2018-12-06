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
    import_emission_categories(S3CSVReader.read(LEGEND_FILEPATH))
    import_emissions(S3CSVReader.read(EMISSIONS_FILEPATH))
  end

  private

  def cleanup
    AgricultureProfile::Emission.delete_all
    AgricultureProfile::EmissionSubcategory.delete_all
    AgricultureProfile::EmissionCategory.delete_all
  end

  def emission_subcategory_attributes(row, category_id)
    {
      name: row[:sub_category],
      emission_category_id: category_id,
      short_name: row[:short_names],
      indicator_name: row[:indicator_name]
    }
  end

  def emission_attributes(value, year, location_id, subcategory_id)
    {
        emission_subcategory_id: subcategory_id,
        location_id: location_id,
        year: year.to_s.to_i,
        value: value.gsub('.', '').to_i
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
      location_id = Location.find_by(iso_code3: row[:area]).id
      subcategory_id =
          AgricultureProfile::EmissionSubcategory.find_by(
              short_name: row[:short_names]).id
      row[2..row.length].each_with_index do |value, index|
        next unless value
        AgricultureProfile::Emission.create!(
            emission_attributes(
                value, row.headers[index + 2],
                location_id, subcategory_id))
      end
    end
  end
end
