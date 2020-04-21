class Indc::Document < ApplicationRecord
  has_many :values, class_name: 'Indc::Value'

  def as_json(_={})
    super(except: [:created_at, :updated_at])
  end
end
