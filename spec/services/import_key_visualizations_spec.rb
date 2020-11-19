require 'rails_helper'

object_contents = {
  "#{CW_FILES_PREFIX}key_visualizations/key_visualizations.csv" => <<~END,
    "Title","Description","Tags","Topic","Geography","Embed Code","Preview Image URL","Image download URL","Data download URL","Blog link","Created","Last Updated"
    "World Greenhouse Gas Emissions","This chart offers...","GHG emissions, Climate Change, Energy","Sectoral emissions","Global, UK","embed code","image.png","image download url","data download url","blog link","10/22/2020","10/22/2020"
    "Top 10 U.S. State Emitters: 2014","Description","GHG emissions","Greenhouse gases","United States","embed code","https://example.com/image.png","image download url","data download url","blog link","8/11/2020","10/15/2020"
  END
}

RSpec.describe ImportKeyVisualizations do
  subject { ImportKeyVisualizations.new.call }

  before :all do
    Aws.config[:s3] = {
      stub_responses: {
        list_objects: {
          contents: [
            {key: "#{CW_FILES_PREFIX}key_visualizations/key_visualizations.csv"}
          ]
        },
        get_object: lambda { |context|
          {body: object_contents[context.params[:key]]}
        }
      }
    }
  end

  after :all do
    Aws.config[:s3] = {
      stub_responses: nil
    }
  end

  it 'Creates new key visualizations records' do
    expect { subject }.to change { KeyVisualization.count }.by(2)

    v = KeyVisualization.find_by(order: 1)

    expect(v.title).to eq('World Greenhouse Gas Emissions')
    expect(v.description).to eq('This chart offers...')
    expect(v.topic).to eq('Sectoral emissions')
    expect(v.geographies).to contain_exactly('Global', 'UK')
    expect(v.tags).to contain_exactly('GHG emissions', 'Climate Change', 'Energy')
    expect(v.embed_code).to eq('embed code')
    expect(v.preview_image_url).to eq(
      "#{S3_BUCKET_URL}/#{CW_FILES_PREFIX}key_visualizations/images/image.png"
    )
    expect(v.image_download_url).to eq('image download url')
    expect(v.data_download_url).to eq('data download url')
    expect(v.blog_link).to eq('blog link')
    expect(v.created_date).to eq(Date.new(2020, 10, 22))
    expect(v.last_updated_date).to eq(Date.new(2020, 10, 22))

    v2 = KeyVisualization.find_by(order: 2)

    expect(v2.preview_image_url).to eq('https://example.com/image.png')
  end
end
