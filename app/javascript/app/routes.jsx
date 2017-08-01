
import Home from 'components/home'
import Other from 'components/other'

export default [
  { path: '/',
    component: Home,
    exact: true
  },
  { path: '/other',
    component: Other
  }
]
