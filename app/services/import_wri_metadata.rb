class ImportWriMetadata
  WRI_ACRONYMS_FILEPATH = 'metadata/Acronyms.csv'.freeze
  WRI_METADATA_FILEPATH = 'metadata/metadata_sources.csv'.freeze

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
    @sources_index = {}
    @properties_index = {}
  end

  def import_acronyms
    @acronyms.each do |r|
      WriMetadata::Acronym.create(
        acronym: r[:acronym].strip,
        definition: r[:definition].strip
      )
    end
  end

  def import_sources
    sources = @metadata.map { |r| r[:dataset] }.uniq
    sources.each do |s|
      @sources_index[s] = WriMetadata::Source.create!(
        name: s
      )
    end
  end

  def import_properties
    properties = @metadata.first.to_h.except(:dataset).keys
    properties.each do |a|
      @properties_index[a] = WriMetadata::Property.create!(
        name: a
      )
    end
  end

  def import_values
    @metadata.each do |row|
      source = @sources_index[row[:dataset]]
      row.to_h.except(:dataset).each do |property, value|
        WriMetadata::Value.create!(
          source: source,
          property: @properties_index[property],
          value: value
        )
      end
    end
  end
end
