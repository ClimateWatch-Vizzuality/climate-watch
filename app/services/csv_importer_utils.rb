module CSVImporterUtils
  def reset_id_seq(resource_klass)
    table_name = resource_klass.table_name
    seq_name = "#{table_name}_id_seq"
    ActiveRecord::Base.connection.
      execute("select setval('#{seq_name}', max(id)) from #{table_name};")
  end
end
