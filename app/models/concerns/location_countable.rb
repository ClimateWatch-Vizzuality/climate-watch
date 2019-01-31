module LocationCountable
  extend ActiveSupport::Concern

  included do
    scope :count_locations, ->(year) { select(build_count_query).group(:year).where(year: year) }
  end

  class_methods do
    def build_count_query
      sql_array = []
      (self.column_names - %w[id year location_id]).each { |c| sql_array << "count(#{c}) as #{c}"}
      sql_array.join(', ')
    end
  end
end
