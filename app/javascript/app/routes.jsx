
import Home from 'components/home'
import Other from 'components/other'

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
  }
]
