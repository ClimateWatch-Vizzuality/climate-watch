const activeId = 'sectors';
export default [
  {
    path: '/sectors/agriculture',
    label: 'Agriculture',
    activeId
  },
  {
    path: '/ndcs-explore?category=industry_tracker',
    label: 'Industry'
  },
  {
    link: 'https://resourcewatch.org/dashboards/energy?tab=country',
    label: 'Power',
    target: '_blank',
    external: true
  },
  {
    path: '/sectors/coming-soon',
    label: 'Other Sectors Coming Soon',
    activeId
  }
];
