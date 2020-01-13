class ImportTimeline
  include ClimateWatchEngine::CSVImporter

  def call
    ActiveRecord::Base.transaction do
      cleanup

      find_csvs
      load_csvs

      import_all
    end
  end

  def cleanup
    Timeline::Note.delete_all
    Timeline::Document.delete_all
    Timeline::Source.delete_all
  end

  def find_csvs
    bucket_name = Rails.application.secrets.s3_bucket_name
    s3 = Aws::S3::Client.new
    s3.list_objects(
      bucket: bucket_name,
      prefix: "#{CW_FILES_PREFIX}timeline/"
    ).each do |response|
      @csv_keys = response.contents.select do |c|
        c.key =~ /.csv/
      end

      @csv_keys = @csv_keys.map(&:key)

      @csv_keys = @csv_keys.reject do |c|
        c =~ /_metadata.csv/
      end
    end
  end

  def load_csvs
    @csvs = @csv_keys.each_with_object({}) do |c, memo|
      name = c[/\/(.*).csv/, 1]
      memo[name] = S3CSVReader.read(c).map(&:to_h)
    end
  end

  def import_all
    @csvs.each do |key, csv|
      import_source(key, csv)
    end
  end

  def import_source(name, csv)
    source = Timeline::Source.create!(
      name: name
    )

    import_each_with_logging(csv, "#{CW_FILES_PREFIX}timeline/#{name}.csv") do |line|
      import_document(source, line)
    end
  end

  def import_document(source, line)
    location = Location.find_by(
      iso_code3: line[:iso_code3]
    )

    unless location
      Rails.logger.error "Can't find location #{line[:iso_code3]}"
      return
    end

    document = Timeline::Document.create!(
      source: source,
      location: location,
      link: prefixed('link', line),
      text: prefixed('text', line),
      date: date(line),
      language: prefixed('language', line)
    )

    import_notes(document, line)
  end

  def prefixed(prefix, line)
    key = line.keys.find do |k|
      k =~ /#{prefix}$/
    end
    line[key]&.strip
  end

  def date(line)
    year = line[:yyyy].to_i
    month = line[:mm] ? line[:mm].to_i : 1
    day = line[:dd] ? line[:dd].to_i : 1

    Date.new(year, month, day)
  end

  def import_notes(document, line)
    note_keys = line.keys.select do |key|
      key =~ /note\d*$/
    end

    notes = note_keys.map do |note_key|
      line[note_key]&.strip
    end

    notes.each do |note|
      next if note.nil? || note.empty?
      Timeline::Note.create!(
        document: document,
        note: note
      )
    end
  end
end
