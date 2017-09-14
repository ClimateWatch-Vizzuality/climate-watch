DATA_FILEPATH = 'adaptation/adaptation.csv'.freeze
METADATA_FILEPATH = 'adaptation/adaptation_metadata.csv'.freeze

class String
  def numeric?
    Float(self) != nil rescue false
  end
end

class ImportAdaptation
  def call
    cleanup

    load_csvs

    import_metadata
    import_data
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
  end

  def import_data
    @data.each do |d|
      l = Location.find_by(iso_code3: d[:country])
      if l
        d.to_h.keys.each do |k|
          v = value_attributes(k, d, l)
          Adaptation::Value.create!(v)
        end
      else
        STDERR.puts "Location #{d[:country]} not found"
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
      variable: Adaptation::Variable.find_by!(slug: k),
    }

    if ['YES', 'NO'].include?(d[k])
      return s.merge(boolean_value: d[k] == 'YES')
    elsif d[k].numeric?
      return s.merge(number_value: Float(d[k]))
    elsif d[k] != '#N/A'
      return s.merge(string_value: d[k])
    else
      return s
    end
  end
end
