require 'csv'

class ImportNdcSdgTargets
  def call
    cleanup
    import_ndc_sdg_targets(
      read_from_s3("#{CW_FILES_PREFIX}sdgs/ndc_sdg_targets.csv")
    )
  end

  private

  def cleanup
    NdcSdg::NdcTargetSector.delete_all
    NdcSdg::NdcTarget.delete_all
    NdcSdg::Sector.delete_all
  end

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

  def import_ndc_sdg_targets(content)
    CSV.parse(content, headers: true).each.with_index(2) do |row|
      ndc = ndc(row)
      target = target(row)
      next unless ndc && target
      ndc_target = NdcSdg::NdcTarget.find_or_create_by(
        ndc: ndc,
        target: target,
        indc_text: row['INDC_text'].strip,
        status: row['Status'],
        climate_response: row['Climate_response'],
        type_of_information: row['Type_of_information']
      )
      import_ndc_target_sectors(row, ndc_target)
    end
  end

  def import_ndc_target_sectors(row, ndc_target)
    sectors = row['Sector'] && row['Sector'].split(',').map(&:strip).uniq ||
      []
    sectors.each do |sector|
      sector = NdcSdg::Sector.find_or_create_by(name: sector)
      NdcSdg::NdcTargetSector.create(
        ndc_target: ndc_target,
        sector: sector
      )
    end
  end

  def ndc(row)
    iso_code3 = row['iso_code3'] && row['iso_code3'].strip.upcase
    location = iso_code3 && Location.find_by_iso_code3(iso_code3)
    unless location
      Rails.logger.error "Location not found #{row}"
      return nil
    end
    ndc = location.ndcs.first
    Rails.logger.error "NDC not found #{row}" unless ndc
    ndc
  end

  def target(row)
    target_number = row['Target'] && row['Target'].strip.downcase
    target = NdcSdg::Target.find_by_number(target_number)
    Rails.logger.error "SDG target not found #{row}" unless target
    target
  end
end
