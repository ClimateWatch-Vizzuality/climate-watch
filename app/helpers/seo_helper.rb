module SeoHelper

  @@TITLE = "Climate Watch"
  @@HOME_PAGE = "Climate Watch is an open online platform designed to empower users with the climate data, visualizations and resources they need to gather insights on national and global progress on climate change, sustainable development, and help advance the goals of the Paris Agreement."
  @@COUNTRY_PROFILES = "Snapshots of countries climate progress, including historical and projected emissions, their Nationally Determined Contribution (NDC), risks and vulnerability to climate change, and linkages between NDCs and the Sustainable Development Goals (SDGs)."
  @@NDC_CONTENT = "Analyze and compare every national climate pledge (Nationally Determined Contribution – or NDC) under the Paris Agreement, with the ability to search key words and see summaries by topic across all."
  @@NDC_SDG_LINKAGES = "Comprehensive mapping of linkages between Nationally Determined Contributions (NDCs) and the Sustainable Development Goals (SDGs) and associated targets of the 2030 Agenda for Sustainable Development."
  @@HISTORICAL_GHG_EMISIONS = "Analyze and visualize latest available international greenhouse gas emissions data. Climate Watch lets you explore global emissions by sector, gases, countries, or regions."
  @@EMISSION_PATHWAYS = "Data and visuals of emission scenario pathways for major emitting countries and sectors, derived from a growing library of models."
  @@ABOUT = "Climate Watch is an open online platform designed to empower users with the climate data, visualizations and resources they need to gather insights on national and global progress on climate change, sustainable development, and help advance the goals of the Paris Agreement."

  @@subtitles = {
    "/" => "Data for climate action",
    "/ndcs" => 'NDCs',
    "/ndcs-sdg" => 'NDCs-SDG linkages',
    "/emission-pathways/models" => 'Emission pathways',
    "/countries" => "Country profiles",
    "/ghg-emissions" => "Historical GHG emissions"
  }

  @@images_urls = {
    "/ndcs" => "http://0.0.0.0:8080/packs/ndc-explore-screenshot.jpg",
    "/ndcs-sdg" => "http://0.0.0.0:8080/packs/ndc-sdg-screenshot.jpg",
    "/emission-pathways/models" => "http://0.0.0.0:8080/packs/sectors-screenshot.jpg",
    "/countries" => "http://0.0.0.0:8080/packs/country-screenshot.jpg",
    "/ghg-emissions" => "http://0.0.0.0:8080/packs/sectors-screenshot.jpg"
  }

  def split_country_name(path)
    path[14, 3]
  end

  def ndc_country(path)
    @country_name = split_country_name(path)
    "Explore the Commitments (NDCs) made by #{@country_name} to act on climate change, as part of the Paris Agreement"
  end

  def image_src(path)
    if @@images_urls[path]
      asset_path(@@images_urls[path])
    else
      asset_path("http://0.0.0.0:8080/packs/country-screenshot.jpg")
    end
  end

  def title_content(path)
    @subtitle = @@subtitles[path]
    @subtitle ? "#{@@TITLE} - #{@subtitle}" : @@TITLE
  end

  def description_content(path)
    if path === '/'
      @@HOME_PAGE
    elsif path === '/ndcs'
      @@NDC_CONTENT
    elsif path === '/ndcs-sdg'
      @@NDC_SDG_LINKAGES
    elsif path.include? '/ndcs/country'
      ndc_country(path)
    elsif path.include? '/countries'
      @@COUNTRY_PROFILES
    elsif path === '/ghg-emissions'
      @@HISTORICAL_GHG_EMISIONS
    elsif path.include? '/emission-pathways'
      @@EMISSION_PATHWAYS
    elsif path.include? '/about'
      @@ABOUT
    end
  end
end
