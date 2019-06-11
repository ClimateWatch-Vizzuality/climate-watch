class ImportAgricultureEmissions
  include ClimateWatchEngine::CSVImporter

  # rubocop:disable LineLength
  EMISSIONS_FILEPATH = "#{CW_FILES_PREFIX}agriculture_emissions/Agr FAOSTAT Emissions Sample Data 823.csv".freeze
  LEGEND_FILEPATH = "#{CW_FILES_PREFIX}agriculture_metadata/Legend File 823.csv".freeze

  # rubocop:enable LineLength

  def call
    unless AgricultureProfile::Metadatum.any?
      msg = <<-EOS
        Please make sure you import Agriculture
        profile metadata before running this importer
      EOS
      add_error(:failed_dependency, msg: msg)
      return
    end
    ActiveRecord::Base.transaction do
      cleanup
      Rails.logger.info "Importing EMISSIONS Categories"
      import_emission_categories(S3CSVReader.read(LEGEND_FILEPATH), LEGEND_FILEPATH)
      Rails.logger.info "Importing EMISSIONS"
      import_emissions(S3CSVReader.read(EMISSIONS_FILEPATH), EMISSIONS_FILEPATH)
    end
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

  def emission_attributes(values, location_id, subcategory_id)
    {
      emission_subcategory_id: subcategory_id,
      location_id: location_id,
      values: values
    }
  end

  def import_emission_categories(content, filepath)
    import_each_with_logging(content, filepath) do |row|
      category_id =
        AgricultureProfile::EmissionCategory.find_or_create_by!(
          name: row[:category], unit: row[:unit]).id rescue nil
      AgricultureProfile::EmissionSubcategory.create!(
        emission_subcategory_attributes(row, category_id))
    end
  end

  def import_emissions(content, filepath)
    import_each_with_logging(content, filepath) do |row|
      location_id = Location.find_by(iso_code3: row[:area]).id
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
end
