module MyCw
  class User < ApplicationRecord
    validates_presence_of :ct_id
    validates_uniqueness_of :ct_id
  end
end