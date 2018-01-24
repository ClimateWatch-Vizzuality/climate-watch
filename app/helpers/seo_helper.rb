module SeoHelper
  TITLE = 'Climate Watch'.freeze

  SEO = [
    {path: '/',
     subtitle: 'Data for Climate Action',
     description: 'Climate Watch is an open online platform designed to empower'\
          ' users with the climate data, visualizations and resources they need'\
          ' to gather insights on national and global progress on climate change,'\
          ' sustainable development, and help advance the goals of the Paris Agreement.'},
    {path: '/countries',
     subtitle: 'Country profiles',
     description: 'Snapshots of countries climate progress, including'\
          ' historical and projected emissions, their Nationally Determined Contribution'\
          ' (NDC), risks and vulnerability to climate change, and linkages between NDCs'\
          ' and the Sustainable Development Goals (SDGs).'},
    {path: '/ndcs',
     subtitle: 'NDCs',
     description: 'Analyze and compare every national climate pledge '\
          '(Nationally Determined Contribution – or NDC) under the Paris Agreement, '\
          'with the ability to search key words and see summaries by topic across all.'},
    {path: '/ndcs-sdg',
     subtitle: 'NDCs-SDG linkages',
     description: 'Comprehensive mapping of linkages between Nationally '\
          'Determined Contributions (NDCs) and the Sustainable Development Goals (SDGs)'\
          ' and associated targets of the 2030 Agenda for Sustainable Development.'},
    {path: '/emission-pathways',
     subtitle: 'Emission pathways',
     description: 'Data and visuals of emission scenario pathways for major'\
          ' emitting countries and sectors, derived from a growing library of models.'},
    {path: '/emission-pathways/models',
     subtitle: 'Emission pathways',
     description: 'Data and visuals of emission scenario pathways for major'\
          ' emitting countries and sectors, derived from a growing library of models.'},
    {path: '/ghg-emissions',
     subtitle: 'Historical GHG emissions',
     description: 'Analyze and visualize latest available international'\
          ' greenhouse gas emissions data. Climate Watch lets you explore global emissions'\
          ' by sector, gases, countries, or regions.'},
    {path: '/about',
     subtitle: 'About',
     description: 'Climate Watch is an open online platform designed to empower users '\
          'with the climate data, visualizations and resources they need to gather insights'\
          ' on national and global progress on climate change, sustainable development, '\
          'and help advance the goals of the Paris Agreement.'}
  ].freeze

  IMAGES_PATHS = {
    '/' => '/images/social-home.png',
    '/ndcs' => '/images/social-NDCs.png',
    '/ndcs-sdg' => '/images/social-NDCs-SDGs.png',
    '/emission-pathways' => '/images/social-emission-pathways.png',
    '/emission-pathways/models' => '/images/social-emission-pathways.png',
    '/countries' => '/images/social-country.png',
    '/ghg-emissions' => '/images/social-historical-emissions.png'
  }.freeze

  def split_country_name(path)
    path[14, 3]
  end

  def ndc_country_description(path)
    @country_name = split_country_name(path)
    "Explore the Commitments (NDCs) made by #{@country_name} to act on climate"\
    ' change, as part of the Paris Agreement'
  end

  def ndc_country_title(path)
    @country_name = split_country_name(path)
    "#{TITLE} - #{@country_name} Nationally Determined Contribution"
  end

  def image_src(path)
    if IMAGES_PATHS[path]
      asset_url(IMAGES_PATHS[path])
    else
      asset_url('/images/social-home.png')
    end
  end

  def title_content(subtitle)
    subtitle ? "#{TITLE} - #{subtitle}" : TITLE
  end

  def description(path)
    SEO.each do |page|
      return page[:description] if page[:path] == path
      return ndc_country_description(path) if path.include? '/ndcs/country'
      return SEO[0][:description]
    end
  end

  def title(path)
    SEO.each do |page|
      return title_content(page[:subtitle]) if page[:path] == path
      return ndc_country_title(path) if path.include? '/ndcs/country'
      return title_content(nil)
    end
  end
end
