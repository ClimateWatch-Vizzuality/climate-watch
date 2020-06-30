class Indc::Document < ApplicationRecord
  has_many :values, class_name: 'Indc::Value'
  has_many :submissions, class_name: 'Indc::Submission'
  has_many :locations, through: :values

  def as_json(_={})
    super(except: [:created_at, :updated_at])
  end
end
