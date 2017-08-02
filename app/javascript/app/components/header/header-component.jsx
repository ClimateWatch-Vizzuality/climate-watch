import React from 'react'
// import { NavLink } from 'react-router-dom'

import styles from './header-styles.scss'
import countryExplorerTheme from 'styles/themes/country-explorer.scss'
import uiStyles from 'styles/ui'
// import routes from 'app/routes'
import CountryExplorer from 'components/country-explorer'
import COUNTRIES from 'data/countries'

export default ({ toggleCountryExplorer }) => (
  <div className={styles.header}>
    <div className={uiStyles.button}>
      <span onClick={() => toggleCountryExplorer()}>Countries</span>
      <CountryExplorer className={styles.countryExplorer} countries={COUNTRIES} theme={countryExplorerTheme} />
    </div>
  </div>
)
