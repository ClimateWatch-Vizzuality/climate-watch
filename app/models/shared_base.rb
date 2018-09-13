class SharedBase < ActiveRecord::Base
  establish_connection DB_SHARED
  self.abstract_class = true
end
