import MyInsights from 'components/my-climate-watch/my-insights';
import MyVisualisations from 'components/my-climate-watch/my-visualisations';
import MyAccount from 'components/my-climate-watch/my-account';

export default [
  {
    label: 'My Insights',
    path: '/my-climate-watch',
    component: MyInsights,
    exact: true
  },
  {
    label: 'Visualisations',
    path: '/my-climate-watch/visualisations',
    component: MyVisualisations,
    exact: true
  },
  {
    label: 'Account Settings',
    path: '/my-climate-watch/account-settings',
    component: MyAccount,
    exact: true
  }
];
