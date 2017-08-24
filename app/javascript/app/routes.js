import Home from 'pages/home';
import NDC from 'pages/ndc';
import NDCCountry from 'pages/ndc-country';
import Country from 'pages/country';
import error from 'pages/error';

export default [
  {
    path: '/',
    component: Home,
    exact: true
  },
  {
    path: '/ndcs/country/:iso',
    component: NDCCountry,
    exact: true
  },
  {
    path: '/ndcs',
    component: NDC
  },
  {
    path: '/countries/:iso',
    component: Country
  },
  {
    path: '/error-page',
    component: error
  }
];
