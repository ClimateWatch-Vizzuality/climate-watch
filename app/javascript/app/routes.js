
import Home from 'components/home'
import Other from 'components/other'
import Country from 'components/country'

export default [
  { path: '/',
    component: Home,
    label: 'Home',
    exact: true,
    nav: true
  },
  { path: '/other',
    component: Other,
    label: 'Other',
    nav: true
  },
  { path: '/country/:iso',
    component: Country,
    label: 'Other',
    nav: true
  }
]
