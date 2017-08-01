import React from 'react'
import { NavLink } from 'react-router-dom'

import styles from './header-styles.scss'
import routes from 'app/routes'

export default () => (
  <div className={styles.header}>
    {routes
      .filter(r => r.nav)
      .map(({ path, exact, label }) =>
        <NavLink
          key={path}
          to={path}
          exact
          className={styles.link}
          activeClassName={styles.linkActive}
        >
          {label}
        </NavLink>
    )}
  </div>
)
