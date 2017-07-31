import React from 'react'
import { NavLink } from 'react-router-dom'
import cx from 'classnames'

import styles from './header-styles.scss'

export default () => (
  <div className={styles.header}>
    <NavLink
      to="/"
      exact
      className={styles.link}
      activeClassName={styles.linkActive}
    >
      Home
    </NavLink>

    <NavLink
      to="/other"
      className={styles.link}
      activeClassName={cx(styles.link, styles.linkActive)}
    >
      Other
    </NavLink>
  </div>
)
