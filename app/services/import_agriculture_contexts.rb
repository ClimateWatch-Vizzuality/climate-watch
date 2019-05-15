class ImportAgricultureContexts
  include ClimateWatchEngine::CSVImporter

  # rubocop:disable LineLength
  INPUTS_FILEPATH = "#{CW_FILES_PREFIX}agriculture_contexts/Agr FAOSTAT Inputs Sample Data 823.csv".freeze
  WBD_FILEPATH = "#{CW_FILES_PREFIX}agriculture_contexts/Agr WBD Sample Data 823.csv".freeze
  MACRO_INDICATORS_FILEPATH = "#{CW_FILES_PREFIX}agriculture_contexts/Agr FAOSTAT Macro Indicators Sample Data 823.csv".freeze
  WATER_WITHDRAWAL_FILEPATH = "#{CW_FILES_PREFIX}agriculture_contexts/Agr FAOSTAT Water Withdrawal Database 823.csv".freeze
  # rubocop:enable LineLength

  def call
    ActiveRecord::Base.transaction do
      cleanup
      Rails.logger.info "Importing MACRO_INDICATORS"
      import_country_contexts(S3CSVReader.read(MACRO_INDICATORS_FILEPATH), MACRO_INDICATORS_FILEPATH)
      Rails.logger.info "Importing WBD"
      import_country_contexts(S3CSVReader.read(WBD_FILEPATH), WBD_FILEPATH)
      Rails.logger.info "Importing INPUTS"
      import_country_contexts(S3CSVReader.read(INPUTS_FILEPATH), INPUTS_FILEPATH)
      Rails.logger.info "Importing WATER_WITHDRAWAL"
      import_country_contexts(S3CSVReader.read(WATER_WITHDRAWAL_FILEPATH), WATER_WITHDRAWAL_FILEPATH)
      Rails.logger.info "Update water withdrawal rank"
      update_water_withdrawal_rank
    end
  end

  private

  def cleanup
    AgricultureProfile::CountryContext.delete_all
  end

  def import_country_contexts(content, filepath)
    import_each_with_logging(content, filepath) do |row|
      location_id = Location.find_by(iso_code3: row[:area]).id
      indicator = row[:short_names]
      values = row.to_h.except(:area, :short_names)
      values.each do |value|
        next if value.second.blank?
        context =
          AgricultureProfile::CountryContext.find_or_create_by(
            location_id: location_id,
            year: value.first.to_s.to_i)
        context.send(:"#{indicator.downcase}=", value.second)
        context.save!
      end
    end
  end

  def update_water_withdrawal_rank
    years = AgricultureProfile::CountryContext
              .select(:year).distinct.pluck(:year)

    years.each do |year|
      sql = "
       WITH cte as (
       SELECT id, water_withdrawal,
              RANK() OVER ( ORDER BY water_withdrawal ASC) AS rnk
       FROM agriculture_profile_country_contexts
       WHERE year = #{year}
       )
       UPDATE agriculture_profile_country_contexts
       SET water_withdrawal_rank = cte.rnk
       FROM cte
       WHERE agriculture_profile_country_contexts.id = cte.id
       AND agriculture_profile_country_contexts.water_withdrawal IS NOT NULL
      "

      ActiveRecord::Base.connection.execute(sql)
    end
  end
end
