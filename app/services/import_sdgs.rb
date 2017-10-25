require 'csv'

class ImportSdgs
  def call
    import_sdgs(read_from_s3("#{CW_FILES_PREFIX}sdgs/sdgs.csv"))
    import_sdg_targets(read_from_s3("#{CW_FILES_PREFIX}sdgs/sdg_targets.csv"))
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

  def import_sdgs(content)
    CSV.parse(content, headers: true).each.with_index(2) do |row|
      attributes = {
        number: number(row),
        title: row['title'],
        cw_title: row['cw_title'],
        colour: row['colour']
      }
      create_or_update_sdg(attributes)
    end
  end

  def import_sdg_targets(content)
    CSV.parse(content, headers: true).each.with_index(2) do |row|
      attributes = {
        number: number(row),
        goal: goal(row),
        title: row['title']
      }
      create_or_update_sdg_target(attributes)
    end
  end

  def number(row)
    row['number'] && row['number'].strip.downcase
  end

  def goal(row)
    goal_number = row['goal_number'] && row['goal_number'].strip.downcase
    NdcSdg::Goal.find_by_number(goal_number)
  end

  def create_or_update_sdg(attributes)
    number = attributes[:number]
    sdg = NdcSdg::Goal.find_by_number(number) ||
      NdcSdg::Goal.new(number: number)
    sdg.assign_attributes(attributes)

    op = sdg.new_record? ? 'CREATE' : 'UPDATE'

    if sdg.save
      Rails.logger.debug "#{op} OK #{number}"
    else
      Rails.logger.error "#{op} FAILED #{number}"
    end
  end

  def create_or_update_sdg_target(attributes)
    number = attributes[:number]
    sdg = NdcSdg::Target.find_by_number(number) ||
      NdcSdg::Target.new(number: number)
    sdg.assign_attributes(attributes)

    op = sdg.new_record? ? 'CREATE' : 'UPDATE'

    if sdg.save
      Rails.logger.debug "#{op} OK #{number}"
    else
      Rails.logger.error "#{op} FAILED #{number}"
    end
  end
end
