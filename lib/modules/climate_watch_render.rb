class ClimateWatchRender < Redcarpet::Render::HTML
  include ActionView::Helpers::AssetTagHelper

  def image(link, title, content)
    link = "#{S3_BUCKET_URL}/ndcs/#{link}"
    image_tag(link, title: title, alt: content)
  end
end
