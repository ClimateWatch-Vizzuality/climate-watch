module SeoHelper
  # This file is complementary to seo-tags-component.js and seo.js
  # that will update the seo on page change and other interactions
  TITLE = 'Climate Watch'.freeze
  SEO_PAGES = {
    home: 'home',
    ndc2020: 'ndc2020',
    ndcContent: 'ndcContent',
    sector: 'sector',
    ndcSearch: 'ndcSearch',
    ndcOverview: 'ndcOverview',
    ndcCompareAll: 'ndcCompareAll',
    ndcCustomCompare: 'ndcCustomCompare',
    ndcsExplore: 'ndcsExplore',
    ndcFull: 'ndcFull',
    ltsExplore: 'ltsExplore',
    netZero: 'netZero',
    country: 'country',
    compare: 'compare',
    ndcCountry: 'ndcCountry',
    ltsCountry: 'ltsCountry',
    ndcSdg: 'ndcSdg',
    ghg: 'ghg',
    pathways: 'pathways',
    about: 'about',
    aboutPartners: 'aboutPartners',
    aboutPermissions: 'aboutPermissions',
    aboutTrainings: 'aboutTrainings',
    aboutContact: 'aboutContact',
    aboutFAQ: 'aboutFAQ',
    myCW: 'myCW',
    dataExplorer: 'dataExplorer',
    keyVisualizations: 'keyVisualizations'
  }.freeze

  STATIC_TITLE_PARTS = {
    SEO_PAGES[:home] => 'Climate Data for Action | Climate Watch | Emissions and Policies',
    SEO_PAGES[:sector] => 'Climate Change Data',
    SEO_PAGES[:ndcOverview] =>
      'Commitments Overview | NDC | LTS | Net-Zero | Climate Policy',
    SEO_PAGES[:ndcsExplore] =>
      '| Explore Nationally Determined Contributions (NDCs)',
    SEO_PAGES[:ndcSearch] => '| Nationally Determined Contribution (NDC)',
    SEO_PAGES[:ltsExplore] => 'Explore Long-Term Strategies (LTS)',
    SEO_PAGES[:ndc2020] => '2020 NDC Enhancements',
    SEO_PAGES[:netZero] => '| Net-Zero Targets',
    SEO_PAGES[:ndcSdg] => 'Explore NDC-SDG Linkages',
    SEO_PAGES[:compare] => 'Compare climate targets',
    SEO_PAGES[:ndcCompareAll] => 'Compare climate targets',
    SEO_PAGES[:ndcCustomCompare] => '| Compare climate targets',
    SEO_PAGES[:ghg] => '| Greenhouse Gas (GHG) Emissions',
    SEO_PAGES[:pathways] => 'Emissions Scenario Pathways',
    SEO_PAGES[:about] => 'About',
    SEO_PAGES[:aboutPartners] => 'Climate Watch Partners',
    SEO_PAGES[:aboutContact] => 'Sign Up for Updates',
    SEO_PAGES[:aboutTrainings] => 'Trainings',
    SEO_PAGES[:aboutPermissions] => 'Permissions & Licensing',
    SEO_PAGES[:aboutFAQ] => 'Frequently Asked Questions',
    SEO_PAGES[:myCW] => 'My Climate Watch',
    SEO_PAGES[:dataExplorer] => 'Data Explorer',
    SEO_PAGES[:keyVisualizations] => 'Key Visualizations'
  }.freeze

  DYNAMIC_TITLES = {
    SEO_PAGES[:country] => ' Climate Change Data | Emissions and Policies',
    SEO_PAGES[:ltsCountry] => '| Long-Term Strategy (LTS) ',
    SEO_PAGES[:ndcCountry] => '| Nationally Determined Contribution (NDC)',
    SEO_PAGES[:ndcFull] => '| Nationally Determined Contribution (NDC)',
  }.freeze

  STRINGS_BEFORE_ISO = {
    SEO_PAGES[:country] => 'countries/',
    SEO_PAGES[:ndcFull] => 'countries/',
    SEO_PAGES[:ltsCountry] => 'country/',
    SEO_PAGES[:ndcCountry] => 'country/'
  }.freeze

  DESCRIPTIONS = {
    SEO_PAGES[:home] =>
      'Climate Watch is an open online platform designed to empower users with the climate data, visualizations and resources they need to gather insights on national and global progress on climate change, sustainable development, and help advance the goals of the Paris Agreement.',
    SEO_PAGES[:ndc2020] =>
      'Climate Watch is an open online platform designed to empower users with the climate data, visualizations and resources they need to gather insights on national and global progress on climate change, sustainable development, and help advance the goals of the Paris Agreement.',
    SEO_PAGES[:sector] =>
      'Explore sectoral profiles, global and by country, for historical and projected emissions, overview of sectoral measures included in Nationally Determined Contributions (NDC), and more',
    SEO_PAGES[:country] =>
      "Snapshots of countries' climate progress, including historical and projected emissions, their Nationally Determined Contribution (NDC), risks and vulnerability to climate change, and linkages between NDCs and the Sustainable Development Goals (SDGs).",
    SEO_PAGES[:compare] =>
      "Snapshots of countries' climate progress, including historical and projected emissions, their Nationally Determined Contribution (NDC), risks and vulnerability to climate change, and linkages between NDCs and the Sustainable Development Goals (SDGs).",
    SEO_PAGES[:ndcContent] =>
      'Analyze and compare every national climate pledge (Nationally Determined Contribution – or NDC) under the Paris Agreement, with the ability to search key words and see summaries by topic across all.',
    SEO_PAGES[:ndcOverview] =>
      'Analyze and compare Nationally Determined Contribution (NDC) and Long-Term Strategies (LTS) submitted by country under the Paris Agreement.',
    SEO_PAGES[:ndcCompareAll] =>
      'Compare current and past submissions, by country, of climate commitments (Nationally Determined Contribution – or NDC) under the Paris Agreement. Analyze target alignments between NDCs, LTSs, and national laws and policies.',
    SEO_PAGES[:ndcsExplore] =>
      'Explore the data to track which countries have signaled they will update or enhance their national climate commitments (NDCs) by 2020.',
    SEO_PAGES[:ltsExplore] =>
      'Explore which countries have submitted long-term strategies (LTS) and click on a country to see more in-depth analysis of each long-term strategy.',
    SEO_PAGES[:netZero] =>
      'Explore which countries have submitted Net-zero document and click on a country to see more in-depth analysis of each Net Zero document.',
    SEO_PAGES[:ndcSearch] =>
      'Search keywords across all national climate commitments, Nationally Determined Contribution (NDC), under the Paris Agreement.',
    SEO_PAGES[:ndcSdg] =>
      'Mapping of linkages between Nationally Determined Contributions (NDCs) and the Sustainable Development Goals (SDGs) and associated targets of the 2030 Agenda for Sustainable Development.',
    SEO_PAGES[:ghg] =>
      'Analyze and visualize latest available international greenhouse gas emissions data. Climate Watch lets you explore global emissions by sector, gases, countries, or regions.',
    SEO_PAGES[:pathways] =>
      'Data and visuals of emission scenario pathways for major emitting countries and sectors, derived from a growing library of models.',
    SEO_PAGES[:about] =>
      'Climate Watch is an open online platform designed to empower users with the climate data, visualizations and resources they need to gather insights on national and global progress on climate change, sustainable development, and help advance the goals of the Paris Agreement.',
    SEO_PAGES[:keyVisualizations] => ''
  }.freeze

  DYNAMIC_DESCRIPTIONS = {
    SEO_PAGES[:ndcCountry] => 'Explore the Commitments (NDCs) made by countryName to act on climate change, as part of the Paris Agreement',
    SEO_PAGES[:ltsCountry] => 'Explore the Long-term strategies (LTSs) made by countryName to act on climate change',
  }.freeze

  SEO = {
    '/countries': SEO_PAGES[:country],
    '/countries/compare': SEO_PAGES[:compare],
    '/sectors': SEO_PAGES[:sector],
    '/ndc-overview': SEO_PAGES[:ndcOverview],
    '/ndc-explore': SEO_PAGES[:ndcsExplore],
    '/lts-explore': SEO_PAGES[:ltsExplore],
    '/2020-ndc-tracker': SEO_PAGES[:ndc2020],
    '/compare-all-targets': SEO_PAGES[:ndcCompareAll],
    '/ndc-content': SEO_PAGES[:ndcContent],
    '/ndcs/country': SEO_PAGES[:ndcCountry],
    '/lts/country': SEO_PAGES[:ltsCountry],
    '/custom-compare': SEO_PAGES[:ndcCustomCompare],
    '/ndc-search': SEO_PAGES[:ndcSearch],
    '/net-zero-tracker': SEO_PAGES[:netZero],
    '/ndcs-sdg': SEO_PAGES[:ndcSdg],
    '/ghg-emissions': SEO_PAGES[:ghg],
    '/pathways': SEO_PAGES[:pathways],
    '/about': SEO_PAGES[:about],
    '/about/partners': SEO_PAGES[:aboutPartners],
    '/about/permissions': SEO_PAGES[:aboutPermissions],
    '/about/contact': SEO_PAGES[:aboutContact],
    '/about/faq': SEO_PAGES[:aboutFAQ],
    '/my-climate-watch': SEO_PAGES[:myCW],
    '/data-explorer': SEO_PAGES[:dataExplorer],
    '/key-visualizations': SEO_PAGES[:keyVisualizations],
  }.freeze

  IMAGES_PATHS = {
    '/' => '/images/social-home.png',
    '/ndcs' => '/images/social-NDCs.png',
    '/ndcs-sdg' => '/images/social-NDCs-SDGs.png',
    '/pathways' => '/images/social-emission-pathways.png',
    '/pathways/models' => '/images/social-emission-pathways.png',
    '/countries' => '/images/social-country.png',
    '/ghg-emissions' => '/images/social-historical-emissions.png'
  }.freeze

  def split_iso(path, page)
    path.split(STRINGS_BEFORE_ISO[page])[1][0, 3]
  end

  def image_src(path)
    if IMAGES_PATHS[path]
      asset_url(IMAGES_PATHS[path])
    else
      asset_url('/images/social-home.png')
    end
  end

  def description(path)
    return DESCRIPTIONS[SEO_PAGES[:home]] if path == '/'

    description = ''
    SEO.keys.each do |p_path|
      page_path = p_path.to_s
      next unless path.start_with?(page_path)

      page = SEO[p_path]
      unless DYNAMIC_DESCRIPTIONS[page]
        description = DESCRIPTIONS[page]
        break
      end

      @country_iso = split_iso(path, page)
      location = Location.find_by_iso_code3(@country_iso)
      description = DYNAMIC_DESCRIPTIONS[page].gsub 'countryName', location.wri_standard_name
      break
    end
    description
  end

  def title(path)
    title = ''
    SEO.keys.each do |p_path|
      page_path = p_path.to_s
      next unless path.start_with?(page_path)

      page = SEO[p_path]

      unless DYNAMIC_TITLES[page]
        title = "#{STATIC_TITLE_PARTS[page]} #{path == '/' ? '' : ' | Climate Watch'}"
        break
      end

      @country_iso = split_iso(path, page)
      location = Location.find_by_iso_code3(@country_iso).wri_standard_name
      title = "#{location} #{DYNAMIC_TITLES[page]}"
      break
    end
    title
  end
end
