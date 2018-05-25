import MyVisualisations from 'components/my-climate-watch/my-visualisations';
import MyAccount from 'components/my-climate-watch/my-account';

export default [
  {
    label: 'Visualisations',
    path: '/my-climate-watch',
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
