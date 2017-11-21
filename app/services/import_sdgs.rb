class ImportSdgs
  SDGS_FILEPATH = "#{CW_FILES_PREFIX}sdgs/sdgs.csv"
  SDG_TARGETS_FILEPATH = "#{CW_FILES_PREFIX}sdgs/sdg_targets.csv"

  def call
    import_sdgs(S3CSVReader.read(SDGS_FILEPATH))
    import_sdg_targets(S3CSVReader.read(SDG_TARGETS_FILEPATH))
  end

  private

  def import_sdgs(content)
    content.each.with_index(2) do |row|
      attributes = {
        number: number(row),
        title: row[:title],
        cw_title: row[:cw_title],
        colour: row[:colour]
      }
      create_or_update_sdg(attributes)
    end
  end

  def import_sdg_targets(content)
   content.each.with_index(2) do |row|
      attributes = {
        number: number(row),
        goal: goal(row),
        title: row[:title]
      }
      create_or_update_sdg_target(attributes)
    end
  end

  def number(row)
    row[:number] && row[:number].downcase
  end

  def goal(row)
    goal_number = row[:goal_number] && row[:goal_number].downcase
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
