class ImportAgricultureMetadata
  include ClimateWatchEngine::CSVImporter

  LEGEND_FILEPATH = "#{CW_FILES_PREFIX}agriculture_metadata/Legend File 823.csv".freeze

  def call
    ActiveRecord::Base.transaction do
      cleanup
      Rails.logger.info "Importing LEGEND"
      import_metadata(S3CSVReader.read(LEGEND_FILEPATH), LEGEND_FILEPATH)
    end
  end

  private

  def cleanup
    AgricultureProfile::Metadatum.delete_all
  end

  def metadatum_attributes(row)
    {
      short_name: row[:short_names],
      indicator: row[:indicator_name],
      category: row[:category],
      subcategory: row[:sub_category],
      unit: row[:unit]
    }
  end

  def import_metadata(content, filepath)
    import_each_with_logging(content, filepath) do |row|
      AgricultureProfile::Metadatum.create!(metadatum_attributes(row))
    end
  end
end
