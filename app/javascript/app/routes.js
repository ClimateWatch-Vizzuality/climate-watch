import Home from 'components/home';
import NDC from 'components/ndc';
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
    component: NDC
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
