module MaterializedView
  def self.refresh(*views)
    views.each do |view|
      ActiveRecord::Base.connection.execute(
        "REFRESH MATERIALIZED VIEW #{view}"
      )
    end
  end
end
