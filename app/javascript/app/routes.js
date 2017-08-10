import Home from 'components/home';
import Other from 'components/other';
import Country from 'components/country';
import errorPage from 'components/error-page';

export default [
  {
    path: '/',
    component: Home,
    exact: true
  },
  {
    path: '/ndcs',
    component: Other
  },
  {
    path: '/country/:iso',
    component: Country
  },
  {
    path: '/error-page',
    component: errorPage
  }
];
