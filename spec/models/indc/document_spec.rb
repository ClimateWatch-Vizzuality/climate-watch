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
require 'rails_helper'

RSpec.describe Indc::Document, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
