module SeoHelper
  @@title = 'Climate Watch'

  @@seo = [
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
  ]

  @@images_urls = {
    '/' => '/images/social-home.png',
    '/ndcs' => '/images/social-NDCs.png',
    '/ndcs-sdg' => '/images/social-NDCs-SDGs.png',
    '/emission-pathways' => '/images/social-emission-pathways.png',
    '/emission-pathways/models' => '/images/social-emission-pathways.png',
    '/countries' => '/images/social-country.png',
    '/ghg-emissions' => '/images/social-historical-emissions.png'
  }

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
    "#{@@title} - #{@country_name} Nationally Determined Contribution"
  end

  def image_src(path)
    if @@images_urls[path]
      asset_url(@@images_urls[path])
    else
      asset_url('/images/social-NDCs.png')
    end
  end

  def title_content(subtitle)
    subtitle ? "#{@@title} - #{subtitle}" : @@title
  end

  def description(path)
    @@seo.each { |page|
      if page[:path] == path
        return page[:description]
      elsif path.include? '/ndcs/country'
        return ndc_country_description(path)
      end
    }
  end

  def title(path)
    @@seo.each { |page|
      if page[:path] == path
        return title_content(page[:subtitle])
      elsif path.include? '/ndcs/country'
        return ndc_country_title(path)
      end
    }
  end

end
