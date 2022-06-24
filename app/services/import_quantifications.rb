class ImportQuantifications
  DATA_FILEPATH =
    "#{CW_FILES_PREFIX}quantifications/CW_NDC_quantification_commas.csv".freeze

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

  # rubocop:disable MethodLength, AbcSize
  def import_data
    @csv.each do |row|
      location = Location.find_by(iso_code3: row[:iso])
      label = Quantification::Label.find_or_create_by!(name: row[:label])

      if location
        if row[:range] == 'Yes'
          value = Quantification::Value.find_or_initialize_by(
            document_slug: row[:document]&.parameterize&.gsub('-', '_'),
            location: location,
            label: label,
            year: row[:year],
            first_value: nil
          )

          range = [value.second_value, row[:value].to_f].compact.sort
          range.unshift(nil) if range.size == 1
          value.update!(first_value: range.first, second_value: range.second)
        else
          Quantification::Value.create!(
            document_slug: row[:document]&.parameterize&.gsub('-', '_'),
            location: location,
            label: label,
            year: row[:year],
            first_value: row[:value]
          )
        end
      else
        Rails.logger.error "Location #{row[:iso]} not found"
      end
    end
  end
  # rubocop:enable MethodLength, AbcSize
end
