module SeoHelper
  @@title = 'Climate Watch'




  @@historical_ghg_emissions = 'Analyze and visualize latest available international'\
  ' greenhouse gas emissions data. Climate Watch lets you explore global emissions'\
  ' by sector, gases, countries, or regions.'
  @@emission_pathways = 'Data and visuals of emission scenario pathways for major'\
  ' emitting countries and sectors, derived from a growing library of models.'
  @@about = 'Climate Watch is an open online platform designed to empower users '\
  'with the climate data, visualizations and resources they need to gather insights'\
  ' on national and global progress on climate change, sustainable development, '\
  'and help advance the goals of the Paris Agreement.'

  @@subtitles = {
    '/' => 'Data for climate action',
    '/ndcs' => '',
    '/ndcs-sdg' => '',
    '/emission-pathways/models' => 'Emission pathways',
    '/countries' => 'Country profiles',
    '/ghg-emissions' => 'Historical GHG emissions'
  }

  @@images_urls = {
    '/ndcs' => '/images/ndc-explore-screenshot.jpg',
    '/ndcs-sdg' => '/images/ndc-sdg-screenshot.jpg',
    '/emission-pathways' => '/images/emission-pathways-screenshot.jpg',
    '/emission-pathways/models' => '/images/emission-pathways-screenshot.jpg',
    '/countries' => '/images/country-screenshot.jpg',
    '/ghg-emissions' => '/images/sectors-screenshot.jpg'
  }

  def split_country_name(path)
    path[14, 3]
  end

  def ndc_country(path)
    @country_name = split_country_name(path)
    "Explore the Commitments (NDCs) made by #{@country_name} to act on climate'\
    ' change, as part of the Paris Agreement"
  end

  def image_src(path)
    if @@images_urls[path]
      @@images_urls[path]
    else
      asset_path('/images/country-screenshot.jpg')
    end
  end

  def title_content(path)
    @subtitle = @@subtitles[path]
    @subtitle ? "#{@@title} - #{@subtitle}" : @@title
  end


  class HomeSeo
    def initialize
      @path = '/'
      @subtitle = 'Data for Climate Action'
      @description = 'Climate Watch is an open online platform designed to empower'\
      ' users with the climate data, visualizations and resources they need'\
      ' to gather insights on national and global progress on climate change,'\
      ' sustainable development, and help advance the goals of the Paris Agreement.'
    end

    def path_match?(actual_path)
      @path == actual_path
    end

    def description
      @description
    end
  end

  class CountryProfilesSeo
    def initialize
      @path = '/countries'
      @subtitle = 'Country profiles'
      @description = 'Snapshots of countries climate progress, including'\
      ' historical and projected emissions, their Nationally Determined Contribution'\
      ' (NDC), risks and vulnerability to climate change, and linkages between NDCs'\
      ' and the Sustainable Development Goals (SDGs).'
    end

    def path_include?(actual_path)
      actual_path.include? @path
    end

    def description
      @description
    end
  end

  class NdcContentSeo
    def initialize(
      @path = '/ndcs'
      @subtitle = 'NDCs'
      @description = 'Analyze and compare every national climate pledge '\
      '(Nationally Determined Contribution – or NDC) under the Paris Agreement, '\
      'with the ability to search key words and see summaries by topic across all.'
    end

    def path_match?(actual_path)
      @path == actual_path
    end

    def description
      @description
    end
  end

  class NdcSdgLinkages
    def initialize
      @path = '/ndcs-sdg'
      @subtitle = 'NDCs-SDG linkages'
      @description = 'Comprehensive mapping of linkages between Nationally '\
      'Determined Contributions (NDCs) and the Sustainable Development Goals (SDGs)'\
      ' and associated targets of the 2030 Agenda for Sustainable Development.'
    end

    def path_match?(actual_path)
      @path == actual_path
    end

    def description
      @description
    end
  end

  def description_content(path)
    home = HomeSeo.new
    countries_profiles = CountryProfilesSeo.new
    if home.path_match?(path)
       home.description
    elsif countries_profiles.path_include?(path)
       countries_profiles.description
    end
  end

  # def description_content(path)
  #   if path === '/'
  #     @@home_page
  #   elsif path === '/ndcs'
  #     @@ndc_content
  #   elsif path === ''
  #     @@ndc_sdg_linkages
  #   elsif path.include? '/ndcs/country'
  #     ndc_country(path)
  #   elsif path.include? '/countries'
  #     @@country_profiles
  #   elsif path === '/ghg-emissions'
  #     @@historical_ghg_emissions
  #   elsif path.include? '/emission-pathways'
  #     @@emission_pathways
  #   elsif path.include? '/about'
  #     @@about
  #   end
  #
end
