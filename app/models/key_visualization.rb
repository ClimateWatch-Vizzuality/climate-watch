# == Schema Information
#
# Table name: key_visualizations
#
#  id                 :bigint           not null, primary key
#  title              :string           not null
#  description        :text             not null
#  topic              :string           not null
#  embed_code         :text
#  image_download_url :text
#  data_download_url  :text
#  blog_link          :text
#  order              :integer          not null
#  geographies        :string           default([]), is an Array
#  tags               :string           default([]), is an Array
#  created_date       :date             not null
#  last_updated_date  :date             not null
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  preview_image_url  :text
#  data_sources       :string           default([]), is an Array
#
class KeyVisualization < ApplicationRecord
  validates_presence_of :title, :description, :topic, :created_date, :last_updated_date
end
