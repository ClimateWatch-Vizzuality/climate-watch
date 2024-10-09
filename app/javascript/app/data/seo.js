/* eslint-disable max-len */

// This file is complementary to seo-helper.rb
// that will start the seo on the first page load

export const SEO_PAGES = {
  home: 'home',
  ndc2020: 'ndc2020',
  ndc2025: 'ndc2025',
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
  aboutTrainings: 'aboutTrainings',
  aboutPermissions: 'aboutPermissions',
  aboutContact: 'aboutContact',
  aboutFAQ: 'aboutFAQ',
  myCW: 'myCW',
  dataExplorer: 'dataExplorer',
  keyVisualizations: 'keyVisualizations'
};

const CANONICAL_URLS = {
  home: '',
  country: '/countries',
  compare: '/countries/compare',
  sector: '/sectors',
  ndcOverview: '/ndc-overview',
  ndcsExplore: '/ndc-explore',
  ltsExplore: '/lts-explore',
  ndc2020: '/2020-ndc-tracker',
  ndcCompareAll: '/compare-all-targets',
  ndcContent: '/ndc-content',
  ndcCountry: '/ndcs/country',
  ltsCountry: '/lts/country',
  ndcCustomCompare: '/custom-compare',
  ndcSearch: '/ndc-search',
  netZero: '/net-zero-tracker',
  ndcSdg: '/ndcs-sdg',
  ghg: '/ghg-emissions',
  pathways: '/pathways',
  about: '/about',
  aboutPartners: '/about/partners',
  aboutPermissions: '/about/permissions',
  aboutTrainings: '/about/trainings',
  aboutContact: '/about/contact',
  aboutFAQ: '/about/faq',
  myCW: '/my-climate-watch',
  dataExplorer: '/data-explorer',
  keyVisualizations: '/key-visualizations'
};

export const getCanonicalUrl = (page, countryIso) => {
  if (page === SEO_PAGES.ndcFull) {
    return `/ndcs/country/${countryIso}/full`;
  }
  return CANONICAL_URLS[page];
};

export const STATIC_TITLE_PARTS = {
  [SEO_PAGES.home]:
    'Climate Data for Action | Climate Watch | Emissions and Policies',
  [SEO_PAGES.country]: 'Climate Change Data | Emissions and Policies',
  [SEO_PAGES.sector]: 'Climate Change Data',
  [SEO_PAGES.ndcOverview]:
    'Commitments Overview | NDC | LTS | Net-Zero | Climate Policy',
  [SEO_PAGES.ndcsExplore]:
    '| Explore Nationally Determined Contributions (NDCs)',
  [SEO_PAGES.ndcCountry]: '| Nationally Determined Contribution (NDC)',
  [SEO_PAGES.ndcFull]: '| Nationally Determined Contribution (NDC)',
  [SEO_PAGES.ndcSearch]: '| Nationally Determined Contribution (NDC)',
  [SEO_PAGES.ltsExplore]: 'Explore Long-Term Strategies (LTS)',
  [SEO_PAGES.ltsCountry]: '| Long-Term Strategy (LTS) ',
  [SEO_PAGES.ndc2020]: '2020 NDC Enhancements',
  [SEO_PAGES.ndc2025]:
    'Nationally Determined Contributions (NDC) Tracker | 2025 NDCs | NDCs 3.0',
  [SEO_PAGES.netZero]: '| Net-Zero Targets',
  [SEO_PAGES.ndcSdg]: 'Explore NDC-SDG Linkages',
  [SEO_PAGES.compare]: 'Compare climate targets',
  [SEO_PAGES.ndcCompareAll]: 'Compare climate targets',
  [SEO_PAGES.ndcCustomCompare]: '| Compare climate targets',
  [SEO_PAGES.ghg]: '| Greenhouse Gas (GHG) Emissions',
  [SEO_PAGES.pathways]: 'Emissions Scenario Pathways',
  [SEO_PAGES.about]: 'About',
  [SEO_PAGES.aboutPartners]: 'Climate Watch Partners',
  [SEO_PAGES.aboutContact]: 'Sign Up for Updates',
  [SEO_PAGES.aboutPermissions]: 'Permissions & Licensing',
  [SEO_PAGES.aboutTrainings]: 'Trainings',
  [SEO_PAGES.aboutFAQ]: 'Frequently Asked Questions',
  [SEO_PAGES.myCW]: 'My Climate Watch',
  [SEO_PAGES.dataExplorer]: 'Data Explorer',
  [SEO_PAGES.keyVisualizations]: 'Key Visualizations'
};

export const getDescription = ({ page, countryName = '' }) => {
  const DESCRIPTIONS = {
    [SEO_PAGES.home]:
      'Climate Watch is an open online platform designed to empower users with the climate data, visualizations and resources they need to gather insights on national and global progress on climate change, sustainable development, and help advance the goals of the Paris Agreement.',
    [SEO_PAGES.ndc2020]:
      'Climate Watch is an open online platform designed to empower users with the climate data, visualizations and resources they need to gather insights on national and global progress on climate change, sustainable development, and help advance the goals of the Paris Agreement.',
    [SEO_PAGES.ndc2025]:
      'Climate Watch is an open online platform designed to empower users with the climate data, visualizations and resources they need to gather insights on national and global progress on climate change, sustainable development, and help advance the goals of the Paris Agreement.',
    [SEO_PAGES.sector]:
      'Explore sectoral profiles, global and by country, for historical and projected emissions, overview of sectoral measures included in Nationally Determined Contributions (NDC), and more',
    [SEO_PAGES.country]:
      "Snapshots of countries' climate progress, including historical and projected emissions, their Nationally Determined Contribution (NDC), risks and vulnerability to climate change, and linkages between NDCs and the Sustainable Development Goals (SDGs).",
    [SEO_PAGES.compare]:
      "Snapshots of countries' climate progress, including historical and projected emissions, their Nationally Determined Contribution (NDC), risks and vulnerability to climate change, and linkages between NDCs and the Sustainable Development Goals (SDGs).",
    [SEO_PAGES.ndcContent]:
      'Analyze and compare every national climate pledge (Nationally Determined Contribution – or NDC) under the Paris Agreement, with the ability to search key words and see summaries by topic across all.',
    [SEO_PAGES.ndcOverview]:
      'Analyze and compare Nationally Determined Contribution (NDC) and Long-Term Strategies (LTS) submitted by country under the Paris Agreement.',
    [SEO_PAGES.ndcCompareAll]:
      'Compare current and past submissions, by country, of climate commitments (Nationally Determined Contribution – or NDC) under the Paris Agreement. Analyze target alignments between NDCs, LTSs, and national laws and policies.',
    [SEO_PAGES.ndcsExplore]:
      'Explore the data to track which countries have signaled they will update or enhance their national climate commitments (NDCs) by 2020.',
    [SEO_PAGES.ltsExplore]:
      'Explore which countries have submitted long-term strategies (LTS) and click on a country to see more in-depth analysis of each long-term strategy.',
    [SEO_PAGES.netZero]:
      'Explore which countries have submitted Net-zero document and click on a country to see more in-depth analysis of each Net Zero document.',
    [SEO_PAGES.ndcCountry]: `Explore the Commitments (NDCs) made by ${countryName} to act on climate change, as part of the Paris Agreement`,
    [SEO_PAGES.ndcSearch]:
      'Search keywords across all national climate commitments, Nationally Determined Contribution (NDC), under the Paris Agreement.',
    [SEO_PAGES.ltsCountry]: `Explore the Long-term strategies (LTSs) made by ${countryName} to act on climate change`,
    [SEO_PAGES.ndcSdg]:
      'Mapping of linkages between Nationally Determined Contributions (NDCs) and the Sustainable Development Goals (SDGs) and associated targets of the 2030 Agenda for Sustainable Development.',
    [SEO_PAGES.ghg]:
      'Analyze and visualize latest available international greenhouse gas emissions data. Climate Watch lets you explore global emissions by sector, gases, countries, or regions.',
    [SEO_PAGES.pathways]:
      'Data and visuals of emission scenario pathways for major emitting countries and sectors, derived from a growing library of models.',
    [SEO_PAGES.about]:
      'Climate Watch is an open online platform designed to empower users with the climate data, visualizations and resources they need to gather insights on national and global progress on climate change, sustainable development, and help advance the goals of the Paris Agreement.',
    [SEO_PAGES.keyVisualizations]: ''
  };
  return DESCRIPTIONS[page] || DESCRIPTIONS[SEO_PAGES.home];
};
