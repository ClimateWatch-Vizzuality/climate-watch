require 'csv'

class ImportNdcSdgTargets
  def call
    NdcSdgTargetSector.delete_all
    SdgSector.delete_all
    NdcSdgTarget.delete_all
    bucket_name = Rails.application.secrets.s3_bucket_name
    file_name = 'data/ndc_sdg_targets.csv'
    s3 = Aws::S3::Client.new
    begin
      file = s3.get_object(bucket: bucket_name, key: file_name)
    rescue Aws::S3::Errors::NoSuchKey
      Rails.logger.error "File #{file_name} not found in #{bucket_name}"
      return
    end
    content = file.body.read
    import_ndc_sdg_targets(content)
  end

  private

  def import_ndc_sdg_targets(content)
    CSV.parse(content, headers: true).each.with_index(2) do |row|
      ndc = ndc(row)
      sdg_target = sdg_target(row)
      next unless ndc && sdg_target
      ndc_sdg_target = NdcSdgTarget.find_or_create_by(
        ndc: ndc,
        sdg_target: sdg_target,
        indc_text: row['INDC_text'],
        status: row['Status'],
        climate_response: row['Climate_response'],
        type_of_information: row['Type_of_information']
      )
      import_ndc_sdg_target_sectors(row, ndc_sdg_target)
    end
  end

  def import_ndc_sdg_target_sectors(row, ndc_sdg_target)
    sectors = row['Sector'] && row['Sector'].split(',').map(&:strip).uniq ||
      []
    sectors.each do |sector|
      sector = SdgSector.find_or_create_by(name: sector)
      NdcSdgTargetSector.create(
        ndc_sdg_target: ndc_sdg_target,
        sdg_sector: sector
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

  def sdg_target(row)
    target_number = row['Target'] && row['Target'].strip.downcase
    sdg_target = SdgTarget.find_by_number(target_number)
    Rails.logger.error "SDG target not found #{row}" unless sdg_target
    sdg_target
  end
end
