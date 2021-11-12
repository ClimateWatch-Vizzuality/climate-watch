import { EXTERNAL_COUNTRY_LINKS } from 'data/constants';

export const siteMapData = [
  {
    title: 'Tools',
    links: [
      { title: 'Country Profiles', href: '/countries' },
      { title: 'Agriculture Sector', href: '/sectors/agriculture' },
      { title: 'Explore NDCs', href: '/ndcs-explore' },
      { title: 'Explore LTS', href: '/lts-explore' },
      { title: 'NDC Enhancement Tracker', href: '/2020-ndc-tracker' },
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
      { title: 'India', href: EXTERNAL_COUNTRY_LINKS.india },
      { title: 'Indonesia', href: EXTERNAL_COUNTRY_LINKS.indonesia }
    ]
  },
  {
    title: 'About',
    links: [
      { title: 'About Climate Watch', href: '/about' },
      { title: 'Climate Watch Partners', href: '/about/partners' },
      { title: 'Key Visualizations', href: '/key-visualizations' },
      { title: 'Sign up for updates', href: '/about/contact' },
      { title: 'Permissions & Licensing', href: '/about/permissions' },
      { title: 'FAQ', href: '/about/faq/general_questions' }
    ]
  }
];
