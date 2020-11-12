/* eslint-disable max-len */
export const SEO_PAGES = {
  home: 'home',
  ndc2020: 'ndc2020',
  countries: 'countries',
  ndcContent: 'ndcContent',
  ndcEnhancements: 'ndcEnhancements',
  ndcOverview: 'ndcOverview',
  ndcCompareAll: 'ndcCompareAll',
  ndcsExplore: 'ndcsExplore',
  ltsExplore: 'ltsExplore',
  netZero: 'netZero',
  ndcLts: 'ndcLts',
  country: 'country',
  ndcCountry: 'ndcCountry',
  ltsCountry: 'ltsCountry',
  ndcSdg: 'ndcSdg',
  ghg: 'ghg',
  pathways: 'pathways',
  about: 'about'
};

export const STATIC_TITLE_PARTS = {
  [SEO_PAGES.home]:
    'Climate Watch - Climate Data for Action - GHG, NDCs, LTS, Net-Zero Data'
};

export const getDescription = ({ page, countryName = '' }) => {
  const DESCRIPTIONS = {
    [SEO_PAGES.home]:
      'Climate Watch is an open online platform designed to empower users with the climate data, visualizations and resources they need to gather insights on national and global progress on climate change, sustainable development, and help advance the goals of the Paris Agreement.',
    [SEO_PAGES.ndc2020]:
      'Climate Watch is an open online platform designed to empower users with the climate data, visualizations and resources they need to gather insights on national and global progress on climate change, sustainable development, and help advance the goals of the Paris Agreement.',
    [SEO_PAGES.countries]:
      "Snapshots of countries' climate progress, including historical and projected emissions, their Nationally Determined Contribution (NDC), risks and vulnerability to climate change, and linkages between NDCs and the Sustainable Development Goals (SDGs).",
    [SEO_PAGES.ndcContent]:
      'Analyze and compare every national climate pledge (Nationally Determined Contribution – or NDC) under the Paris Agreement, with the ability to search key words and see summaries by topic across all.',
    [SEO_PAGES.ndcEnhancements]:
      'Analyze and compare every national climate pledge (Nationally Determined Contribution – or NDC) under the Paris Agreement, with the ability to search key words and see summaries by topic across all.',
    [SEO_PAGES.ndcOverview]:
      'Analyze and compare every national climate pledge (Nationally Determined Contribution – or NDC) under the Paris Agreement, with the ability to search key words and see summaries by topic across all.',
    [SEO_PAGES.ndcCompareAll]:
      'Analyze and compare every national climate pledge (Nationally Determined Contribution – or NDC) under the Paris Agreement, with the ability to search key words and see summaries by topic across all.',
    [SEO_PAGES.ndcsExplore]:
      'Analyze and compare every national climate pledge (Nationally Determined Contribution – or NDC) under the Paris Agreement, with the ability to search key words and see summaries by topic across all.',
    [SEO_PAGES.ltsExplore]:
      'Analyze and compare every national climate pledge (Nationally Determined Contribution – or NDC) under the Paris Agreement, with the ability to search key words and see summaries by topic across all.',
    [SEO_PAGES.netZero]:
      'Analyze and compare every national climate pledge (Nationally Determined Contribution – or NDC) under the Paris Agreement, with the ability to search key words and see summaries by topic across all.',
    [SEO_PAGES.ndcLts]:
      'Analyze and compare every national climate pledge (Nationally Determined Contribution – or NDC) under the Paris Agreement, with the ability to search key words and see summaries by topic across all.',
    [SEO_PAGES.country]:
      'Analyze and compare every national climate pledge (Nationally Determined Contribution – or NDC) under the Paris Agreement, with the ability to search key words and see summaries by topic across all.',
    [SEO_PAGES.ndcCountry]: `Explore the Commitments (NDCs) made by ${countryName} to act on climate change, as part of the Paris Agreement`,
    [SEO_PAGES.ltsCountry]: `Explore the Long-term strategies (LTSs) made by ${countryName} to act on climate change`,
    [SEO_PAGES.ndcSdg]:
      'Comprehensive mapping of linkages between Nationally Determined Contributions (NDCs) and the Sustainable Development Goals (SDGs) and associated targets of the 2030 Agenda for Sustainable Development.',
    [SEO_PAGES.ghg]:
      'Analyze and visualize latest available international greenhouse gas emissions data. Climate Watch lets you explore global emissions by sector, gases, countries, or regions.',
    [SEO_PAGES.pathways]:
      'Data and visuals of emission scenario pathways for major emitting countries and sectors, derived from a growing library of models.',
    [SEO_PAGES.about]:
      'Climate Watch is an open online platform designed to empower users with the climate data, visualizations and resources they need to gather insights on national and global progress on climate change, sustainable development, and help advance the goals of the Paris Agreement.'
  };
  return DESCRIPTIONS[page] || DESCRIPTIONS[SEO_PAGES.home];
};
