
import Home from 'components/home';
import Other from 'components/other';
import Country from 'components/country';

export default [
  { path: '/',
    component: Home,
    exact: true
  },
  { path: '/other',
    component: Other
  },
  { path: '/country/:iso',
    component: Country
  }
];
