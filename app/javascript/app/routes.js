import Home from 'components/home';
import NDC from 'pages/ndc';
import NDCCountry from 'components/ndc-country';
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
    component: NDC,
    exact: true
  },
  {
    path: '/ndcs/:iso',
    component: NDCCountry
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
