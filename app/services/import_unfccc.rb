class ImportUnfccc
  FILEPATH='unfccc/'.freeze

  def call
    cleanup

    find_csvs
    load_csvs

    import_all
  end

  def cleanup
    Unfccc::Note.delete_all
    Unfccc::Record.delete_all
    Unfccc::Document.delete_all
  end

  def find_csvs
    bucket_name = Rails.application.secrets.s3_bucket_name
    s3 = Aws::S3::Client.new
    s3.list_objects(
      bucket: bucket_name,
      prefix: 'unfccc/'
    ).each do |response|
      @csv_keys = response.contents.select do |c|
        c.key =~ /.csv/
      end

      @csv_keys = @csv_keys.map do |c|
        c.key
      end

      @csv_keys = @csv_keys.reject do |c|
        c =~ /_metadata.csv/
      end
    end
  end

  def load_csvs
    @csvs = @csv_keys.reduce({}) do |memo, c|
      name = c[/\/(.*).csv/, 1]
      memo[name] = S3CSVReader.read(c).map(&:to_h)
      memo
    end
  end

  def import_all
    @csvs.each do |key, csv|
      import_document(key, csv)
    end
  end

  def import_document(name, csv)
    document = Unfccc::Document.create!(
      name: name
    )

    csv.each do |line|
      import_record(document, line)
    end
  end

  def import_record(document, line)
    location = Location.find_by(
      iso_code3: line[:iso_code3]
    )

    unless location
      Rails.logger.error "Can't find location #{line[:iso_code3]}"
      return
    end

    record = Unfccc::Record.create!(
      document: document,
      location: location,
      link: link(line),
      text: text(line),
      date: date(line)
    )

    import_notes(record, line)
  end

  def link(line)
    key = line.keys.find do |k|
      k =~ /link$/
    end
    line[key]&.strip
  end

  def text(line)
    key = line.keys.find do |k|
      k =~ /text$/
    end
    line[key]&.strip
  end

  def date(line)
    year = line[:yyyy].to_i
    month = line[:mm] ? line[:mm].to_i : 1
    day = line[:dd] ? line[:dd].to_i : 1

    Date.new(year, month, day)
  end

  def import_notes(record, line)
    note_keys = line.keys.select do |key|
      key =~ /note\d*$/
    end

    notes = note_keys.map do |note_key|
      line[note_key]&.strip
    end

    notes.each do |note|
      next if note.nil? || note.empty?
      Unfccc::Note.create!(
        record: record,
        note: note
      )
    end
  end
end
