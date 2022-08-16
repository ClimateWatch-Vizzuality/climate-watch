class ImportWriMetadata
  WRI_ACRONYMS_FILEPATH = "#{CW_FILES_PREFIX}wri_metadata/Acronyms.csv".freeze
  WRI_METADATA_FILEPATH =
    "#{CW_FILES_PREFIX}wri_metadata/metadata_sources.csv".freeze
  WRI_DESCRIPTIONS_FILEPATH =
    "#{CW_FILES_PREFIX}wri_metadata/metadata_sources_descriptions.csv".freeze

  def call
    cleanup

    load_csvs

    import_acronyms
    import_sources
    import_properties
    import_values
  end

  private

  def cleanup
    WriMetadata::Acronym.delete_all
    WriMetadata::Value.delete_all
    WriMetadata::Source.delete_all
    WriMetadata::Property.delete_all
  end

  def load_csvs
    @acronyms = S3CSVReader.read(WRI_ACRONYMS_FILEPATH)
    @metadata = S3CSVReader.read(WRI_METADATA_FILEPATH)
    @descriptions_index = S3CSVReader.read(WRI_DESCRIPTIONS_FILEPATH).
      each_with_object({}) do |current, memo|
        memo[current[:id].to_sym] = current[:description]
      end
    @sources_index = {}
    @properties_index = {}
  end

  def import_acronyms
    @acronyms.each do |r|
      WriMetadata::Acronym.create(
        acronym: r[:acronym],
        definition: r[:definition]
      )
    end
  end

  def import_sources
    sources = @metadata.map { |r| r[:dataset] }.uniq
    sources.each do |s|
      @sources_index[s] = WriMetadata::Source.create!(
        name: s.downcase
      )
    end
  end

  def import_properties
    properties = @metadata.first.to_h.except(:dataset).keys.compact
    properties.each do |a|
      @properties_index[a] = WriMetadata::Property.create!(
        slug: a,
        name: @descriptions_index[a]
      )
    end
  end

  def import_values
    @metadata.each do |row|
      source = @sources_index[row[:dataset]]
      row.to_h.except(:dataset).compact.each do |property, value|
        WriMetadata::Value.create!(
          source: source,
          property: @properties_index[property],
          value: value
        )
      end
    end
  end
end
