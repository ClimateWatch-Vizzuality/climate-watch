import React from 'react'
import { NavLink } from 'react-router-dom'

import CountryExplorer from 'components/country-explorer'
import styles from './header-styles.scss'
import countryExplorerTheme from 'styles/themes/country-explorer.scss'
import uiStyles from 'styles/ui.scss'
import COUNTRIES from 'data/countries'

export default ({ toggleCountryExplorer }) => (
  <div className={styles.header}>
    <ul className={styles.nav}>
      <li className={styles.navItem}>
        <NavLink to="/">Home</NavLink>
      </li>
      <li className={styles.navItem}>
        <CountryExplorer
          className={uiStyles.button}
          countries={COUNTRIES}
          theme={countryExplorerTheme}
        />
      </li>
      <li className={styles.navItem}>
        <NavLink to="/other">Other...</NavLink>
      </li>
    </ul>
  </div>
)
