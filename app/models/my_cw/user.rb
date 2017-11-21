module MyCw
  class User < ApplicationRecord
    validates_presence_of :ct_id
  end
end