module CSVImporterUtils
  def reset_id_seq(resource_klass, new_id = 1)
    table_name = resource_klass.table_name
    seq_name = "#{table_name}_id_seq"
    ActiveRecord::Base.connection.execute("ALTER SEQUENCE #{seq_name} RESTART WITH #{new_id};")
  end
end
