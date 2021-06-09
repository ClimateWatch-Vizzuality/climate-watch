const activeId = 'sectors';
export default [
  {
    path: '/sectors/agriculture',
    label: 'Agriculture',
    activeId
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
