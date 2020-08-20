const FEATURE_NDC_EXPLORE = process.env.FEATURE_NDC_EXPLORE === 'true';
const exploreTools = FEATURE_NDC_EXPLORE
  ? [
    { title: 'Explore NDCs', href: '/ndcs-explore' },
    { title: 'Explore LTS', href: '/lts-explore' }
  ]
  : [{ title: 'Explore LTS', href: '/lts-explore' }];
export const siteMapData = [
  {
    title: 'Tools',
    links: [
      { title: 'Country Profiles', href: '/countries' },
      { title: 'Agriculture Sector', href: '/sectors/agriculture' },
      ...exploreTools,
      { title: '2020 NDC Tracker', href: '/2020-ndc-tracker' },
      { title: 'NDC-SDG Linkages', href: '/ndcs-sdg' },
      { title: 'Historical GHG Emissions', href: '/ghg-emissions' },
      { title: 'Pathways', href: '/pathways' }
    ]
  },
  {
    title: 'Data',
    links: [
      { title: 'Data Explorer', href: '/data-explorer' },
      { title: 'My Climate Watch', href: '/my-climate-watch' }
    ]
  },
  {
    title: 'Country Platforms',
    links: [
      { title: 'India', href: 'https://indiaclimateexplorer.org/' },
      { title: 'Indonesia', href: 'https://indonesia.climatewatchdata.org' },
      { title: 'South Africa', href: 'http://southafricaclimateexplorer.org/' }
    ]
  },
  {
    title: 'About',
    links: [
      { title: 'About Climate Watch', href: '/about' },
      { title: 'Climate Watch Partners', href: '/about/partners' },
      { title: 'Sign up for updates', href: '/about/contact' },
      { title: 'Permissions & Licensing', href: '/about/permissions' },
      { title: 'FAQ', href: '/about/faq/general_questions' }
    ]
  }
];
