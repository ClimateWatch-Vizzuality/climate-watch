class ImportKeyVisualizations
  include ClimateWatchEngine::CSVImporter
  include CSVImporterUtils

  FILEPATH = "#{CW_FILES_PREFIX}key_visualizations/key_visualizations.csv".freeze

  def call
    ActiveRecord::Base.transaction do
      cleanup

      reset_id_seq(KeyVisualization)

      import(S3CSVReader.read(FILEPATH), FILEPATH)
    end
  end

  private

  def import(content, filepath)
    index = 1
    import_each_with_logging(content, filepath) do |row|
      KeyVisualization.create!(
        attributes(row).merge(order: index)
      )
      index += 1
    end
  end

  def attributes(row)
    {
      title: row[:title],
      description: row[:description],
      topic: row[:topic],
      embed_code: parse_text(row[:embed_code]),
      image_download_url: parse_text(row[:image_download_url]),
      data_download_url: parse_text(row[:data_download_url]),
      blog_link: parse_text(row[:blog_link]),
      tags: parse_string_list(row[:tags]),
      geographies: parse_string_list(row[:geography]),
      created_date: parse_date(row[:created]),
      last_updated_date: parse_date(row[:last_updated])
    }
  end

  def parse_text(value)
    return if value&.downcase&.strip == 'n/a'

    value
  end

  def parse_string_list(value)
    value.split(',').map(&:strip)
  end

  def parse_date(val)
    Date.strptime(val, '%m/%d/%Y')
  end

  def cleanup
    KeyVisualization.delete_all
  end
end
