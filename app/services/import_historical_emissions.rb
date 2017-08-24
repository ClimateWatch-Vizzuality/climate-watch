require 'csv'

META_SECTORS_FILEPATH = 'he/CW_HistoricalEmisisons_metadata_sectors.csv'.freeze
DATA_CAIT_FILEPATH = 'he/CW_HistoricalEmisisons_sampledata_CAIT.csv'.freeze
DATA_PIK_FILEPATH = 'he/CW_HistoricalEmisisons_sampledata_PIK.csv'.freeze

class ImportHistoricalEmissions
  def call
    cleanup
    import_sectors(read_from_s3(META_SECTORS_FILEPATH))
    import_records(read_from_s3(DATA_CAIT_FILEPATH))
    import_records(read_from_s3(DATA_PIK_FILEPATH))
  end

  private

  def read_from_s3(file_name)
    bucket_name = Rails.application.secrets.s3_bucket_name
    s3 = Aws::S3::Client.new
    begin
      file = s3.get_object(bucket: bucket_name, key: file_name)
    rescue Aws::S3::Errors::NoSuchKey
      Rails.logger.error "File #{file_name} not found in #{bucket_name}"
      return
    end
    file.body.read
  end

  def cleanup
    DataSource.delete_all
    Sector.delete_all
    Gas.delete_all
    HistoricalEmission.delete_all
  end

  def create_sector_hash(row)
    sector = {}
    sector[:name] = row[:sector]
    sector[:data_source] = DataSource.find_or_create_by(name: row[:source])
    sector[:parent] = row[:subsectorof] &&
      Sector.find_or_create_by(name: row[:subsectorof])

    sector
  end

  def import_sectors(content)
    CSV.parse(content, headers: true, header_converters: :symbol).each do |row|
      next if Sector.find_by(name: row[:sector])
      sector = create_sector_hash(row)
      Sector.create!(sector)
    end
  end

  def create_he_hash(row)
    he = {}
    he[:location] = Location.find_by(iso_code3: row[:country])
    he[:data_source] = DataSource.find_by(name: row[:source])
    he[:sector] = Sector.find_by(name: row[:sector])
    he[:gas] = Gas.find_or_create_by(name: row[:gas])
    he[:gwp] = row[:gwp]
    he[:emissions] = row.headers.grep(/\d{4}/).map do |year|
      {year: year.to_i, value: row[year] && row[year].to_f}
    end

    he
  end

  def import_records(content)
    CSV.parse(content, headers: true, header_converters: :symbol).each do |row|
      he = create_he_hash(row)
      begin
        HistoricalEmission.create!(he)
      rescue ActiveRecord::RecordInvalid => invalid
        STDERR.puts "Error importing #{row.to_s.chomp}: #{invalid}"
      end
    end
  end
end
