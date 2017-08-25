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

  def sector_attributes(row)
    {
      name: row[:sector],
      data_source: DataSource.find_or_create_by(name: row[:source]),
      parent: row[:subsectorof] &&
        Sector.find_or_create_by(name: row[:subsectorof])
    }
  end

  def import_sectors(content)
    CSV.parse(content, headers: true, header_converters: :symbol).each do |row|
      next if Sector.find_by(name: row[:sector])
      sector = sector_attributes(row)
      Sector.create!(sector)
    end
  end

  def emissions(row)
    row.headers.grep(/\d{4}/).map do |year|
      {year: year.to_s.to_i, value: row[year]&.to_f}
    end
  end

  def he_attributes(row)
    {
      location: Location.find_by(iso_code3: row[:country]),
      data_source: DataSource.find_by(name: row[:source]),
      sector: Sector.find_by(name: row[:sector]),
      gas: Gas.find_or_create_by(name: row[:gas]),
      gwp: row[:gwp],
      emissions: emissions(row)
    }
  end

  def import_records(content)
    CSV.parse(content, headers: true, header_converters: :symbol).each do |row|
      he = he_attributes(row)
      begin
        HistoricalEmission.create!(he)
      rescue ActiveRecord::RecordInvalid => invalid
        STDERR.puts "Error importing #{row.to_s.chomp}: #{invalid}"
      end
    end
  end
end
