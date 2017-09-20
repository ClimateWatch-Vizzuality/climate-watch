class ImportAdaptation
  DATA_FILEPATH = 'adaptation/adaptation.csv'.freeze
  METADATA_FILEPATH = 'adaptation/adaptation_metadata.csv'.freeze

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
          v = value_attributes(k, d, l)
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

  def value_attributes(k, d, l)
    s = {
      location: l,
      variable: Adaptation::Variable.find_by(slug: k)
    }

    return s.merge(boolean_value: d[k] == 'YES') if %w(YES NO).include?(d[k])
    return s.merge(number_value: d[k]) if d[k].numeric?
    return s.merge(string_value: d[k]) if d[k] != '#N/A'
  end

  # rubocop:disable MethodLength
  def update_ranks
    sql = <<~END
      WITH ranks AS (
        SELECT var.id AS variable_id, val.id AS value_id, val.number_value,
          RANK() OVER (
            PARTITION BY var.id
            ORDER BY number_value DESC
          ) AS rank_ex_aequo,
          RANK() OVER (
            PARTITION BY var.id
            ORDER BY number_value, val.location_id DESC
          ) AS rank_no_ties
        FROM adaptation_variables var
          INNER JOIN adaptation_values val ON var.id = val.variable_id
        WHERE val.number_value IS NOT NULL
        ORDER BY var.id, rank_no_ties asc
      ), totals AS (
        SELECT var.id AS variable_id, COUNT(1)::FLOAT as count
        FROM adaptation_variables var
          INNER JOIN adaptation_values val ON var.id = val.variable_id
        WHERE val.number_value IS NOT NULL
        GROUP BY var.id
      )
      UPDATE adaptation_values val
      SET absolute_rank = ranks.rank_ex_aequo,
          relative_rank =
            ROUND(CAST(ranks.rank_no_ties / totals.count AS NUMERIC), 2)
      FROM ranks
        INNER JOIN totals ON ranks.variable_id = totals.variable_id
      WHERE val.id = ranks.value_id;
    END

    ActiveRecord::Base.connection.execute(sql)
  end
end
