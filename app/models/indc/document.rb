class Indc::Document < ApplicationRecord
  has_many :values, class_name: 'Indc::Value'
end
