/* eslint-disable max-len */
export const SEO_PAGES = {
  home: 'home',
  ndc2020: 'ndc2020',
  ndcContent: 'ndcContent',
  ndcEnhancements: 'ndcEnhancements',
  ndcSearch: 'ndcSearch',
  ndcOverview: 'ndcOverview',
  ndcCompareAll: 'ndcCompareAll',
  ndcCustomCompare: 'ndcCompareAll',
  ndcsExplore: 'ndcsExplore',
  ltsExplore: 'ltsExplore',
  netZero: 'netZero',
  country: 'country',
  ndcCountry: 'ndcCountry',
  ltsCountry: 'ltsCountry',
  ndcSdg: 'ndcSdg',
  ghg: 'ghg',
  pathways: 'pathways',
  about: 'about',
  aboutPartners: 'aboutPartners',
  aboutPermissions: 'aboutPermissions',
  aboutContact: 'aboutContact',
  aboutFAQ: 'aboutFAQ',
  myCW: 'myCW',
  dataExplorer: 'dataExplorer'
};

export const STATIC_TITLE_PARTS = {
  [SEO_PAGES.home]:
    'Climate Watch - Climate Data for Action - GHG, NDCs, LTS, Net-Zero Data',
  [SEO_PAGES.country]: 'Climate Change Country Profile',
  [SEO_PAGES.sector]: 'Climate Change Profile',
  [SEO_PAGES.ndcOverview]: 'NDCs, LTS, Net-Zero Overview',
  [SEO_PAGES.ndcsExplore]:
    'Explore Nationally Determined Contributions (NDCs) Data',
  [SEO_PAGES.ndcCountry]: 'Nationally Determined Contribution (NDC) Data',
  [SEO_PAGES.ndcFull]: 'Nationally Determined Contribution (NDC) Text',
  [SEO_PAGES.ltsCountry]: 'Long-Term Strategy (LTS) Data',
  [SEO_PAGES.ltsExplore]: 'Explore Long-Term Strategies (LTS) Data',
  [SEO_PAGES.netZero]: 'Explore Net-Zero Targets',
  [SEO_PAGES.ndc2020]: '2020 NDC Enhancements',
  [SEO_PAGES.ndcSdg]: 'Explore SDG-NDC Linkages',
  [SEO_PAGES.ndcSearch]: 'Nationally Determined Contribution (NDC) Search',
  [SEO_PAGES.ndcCompareAll]: 'Compare climate targets',
  [SEO_PAGES.ndcCustomCompare]: 'Compare climate targets',
  [SEO_PAGES.ghg]: 'Greenhouse Gas (GHG) Emissions',
  [SEO_PAGES.pathways]: 'Emissions Scenario Pathways',
  [SEO_PAGES.about]: 'About',
  [SEO_PAGES.aboutPartners]: 'Climate Watch Partners',
  [SEO_PAGES.aboutContact]: 'Sign Up for Updates',
  [SEO_PAGES.aboutPermissions]: 'Permissions & Licensing',
  [SEO_PAGES.aboutFAQ]: 'Frequently Asked Questions',
  [SEO_PAGES.myCW]: 'My Climate Watch',
  [SEO_PAGES.dataExplorer]: 'Data Explorer'
};

export const getDescription = ({ page, countryName = '' }) => {
  const DESCRIPTIONS = {
    [SEO_PAGES.home]:
      'Climate Watch is an open online platform designed to empower users with the climate data, visualizations and resources they need to gather insights on national and global progress on climate change, sustainable development, and help advance the goals of the Paris Agreement.',
    [SEO_PAGES.ndc2020]:
      'Climate Watch is an open online platform designed to empower users with the climate data, visualizations and resources they need to gather insights on national and global progress on climate change, sustainable development, and help advance the goals of the Paris Agreement.',
    [SEO_PAGES.sector]:
      'Explore sectoral profiles, global and by country, for historical and projected emissions, overview of sectoral measures included in Nationally Determined Contributions (NDC), and more',
    [SEO_PAGES.country]:
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
      'Explore which countries have submitted long-term strategies (LTS) and click on a country to see more in-depth analysis of each long-term strategy.',
    [SEO_PAGES.netZero]:
      'Explore which countries have submitted Net-zero document and click on a country to see more in-depth analysis of each Net Zero document.',
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
      'Climate Watch is an open online platform designed to empower users with the climate data, visualizations and resources they need to gather insights on national and global progress on climate change, sustainable development, and help advance the goals of the Paris Agreement.'
  };
  return DESCRIPTIONS[page] || DESCRIPTIONS[SEO_PAGES.home];
};
