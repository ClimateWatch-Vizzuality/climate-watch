class ImportAdaptation
  DATA_FILEPATH =
    "#{CW_FILES_PREFIX}adaptation/adaptation.csv".freeze
  METADATA_FILEPATH =
    "#{CW_FILES_PREFIX}adaptation/adaptation_metadata.csv".freeze

  def call
    cleanup

    load_csvs

    import_metadata
    import_data

    update_ranks
  end

  private

  def cleanup
    Adaptation::Value.delete_all
    Adaptation::Variable.delete_all
  end

  def load_csvs
    @metadata = S3CSVReader.read(METADATA_FILEPATH)
    @data = S3CSVReader.read(DATA_FILEPATH)
  end

  def import_metadata
    @metadata.each do |m|
      Adaptation::Variable.create!(variable_attributes(m))
    end

    @metakeys = Adaptation::Variable.all.map do |m|
      m.slug.to_sym
    end
  end

  def import_data
    @data.each do |d|
      l = Location.find_by(iso_code3: d[:country])
      if l
        @metakeys.each do |k|
          r = d[:"#{k}_rank"]
          v = value_attributes(k, d, l, r)
          Adaptation::Value.create!(v) if v
        end
      else
        Rails.logger.error "Location #{d[:country]} not found"
      end
    end
  end

  def variable_attributes(m)
    {
      slug: m[:column_name],
      name: m[:long_name]
    }
  end

  def value_attributes(k, d, l, r)
    s = {
      location: l,
      variable: Adaptation::Variable.find_by(slug: k),
      absolute_rank: r
    }

    return nil if d[k].nil?
    return s.merge(boolean_value: d[k] == 'YES') if %w(YES NO).include?(d[k])
    return s.merge(number_value: d[k]) if d[k].numeric?
    return s.merge(string_value: d[k]) if d[k] != '#N/A'
  end

  def update_ranks
    sql = <<~END
      WITH ranks AS (
        SELECT var.id AS variable_id, val.id AS value_id,
          val.absolute_rank AS rank
        FROM adaptation_variables AS var
          INNER JOIN adaptation_values AS val ON var.id = val.variable_id
        WHERE val.absolute_rank IS NOT NULL
      ), ranges AS (
        SELECT var.id AS variable_id, MAX(val.absolute_rank) AS max_rank
        FROM adaptation_variables AS var
          INNER JOIN adaptation_values AS val ON var.id = val.variable_id
        GROUP BY var.id
      )
      UPDATE adaptation_values val
        SET relative_rank =
          ROUND(ranks.rank::NUMERIC / ranges.max_rank::NUMERIC, 2)
      FROM ranges
        INNER JOIN ranks ON ranges.variable_id = ranks.variable_id
      WHERE val.id = ranks.value_id;
    END

    ActiveRecord::Base.connection.execute(sql)
  end
end
