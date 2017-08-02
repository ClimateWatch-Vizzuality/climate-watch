import React from 'react'

import styles from './header-styles.scss'
import countryExplorerTheme from 'styles/themes/country-explorer.scss'
import uiStyles from 'styles/ui'
import CountryExplorer from 'components/country-explorer'
import COUNTRIES from 'data/countries'

export default ({ toggleCountryExplorer }) => (
  <div className={styles.header}>
    <CountryExplorer
      className={uiStyles.button}
      countries={COUNTRIES}
      theme={countryExplorerTheme}
    />
  </div>
)
