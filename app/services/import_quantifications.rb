class ImportQuantifications
  DATA_FILEPATH =
    "#{CW_FILES_PREFIX}quantifications/quantifications.csv".freeze

  def call
    cleanup

    load_csv

    import_data
  end

  private

  def cleanup
    Quantification::Value.delete_all
    Quantification::Label.delete_all
  end

  def load_csv
    @csv = S3CSVReader.read(DATA_FILEPATH)
  end

  def import_data
    @csv.each do |row|
      location = Location.find_by(iso_code3: row[:iso])
      if location
        Quantification::Value.create!(
          location: location,
          label: Quantification::Label.find_or_create_by!(name: row[:label]),
          year: row[:year],
          value: row[:value],
          range: row[:range] == 'Yes'
        )
      else
        Rails.logger.error "Location #{row[:iso]} not found"
      end
    end
  end
end
