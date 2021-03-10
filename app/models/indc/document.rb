# == Schema Information
#
# Table name: indc_documents
#
#  id          :bigint           not null, primary key
#  ordering    :integer
#  slug        :string
#  long_name   :string
#  description :text
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  is_ndc      :boolean
#
class Indc::Document < ApplicationRecord
  has_many :values, class_name: 'Indc::Value'
  has_many :submissions, class_name: 'Indc::Submission'
  has_many :locations, through: :values

  def as_json(_={})
    super(except: [:created_at, :updated_at, :iso_code3])
  end
end
