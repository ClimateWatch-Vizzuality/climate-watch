import React from 'react'
// import { NavLink } from 'react-router-dom'

import styles from './header-styles.scss'
// import routes from 'app/routes'
import CountryExplorer from 'components/country-explorer'
import COUNTRIES from 'data/countries'

export default ({ toggleCountryExplorer }) => (
  <div className={styles.header}>
    <h2 onClick={() => toggleCountryExplorer()}>Countries</h2>
    <CountryExplorer countries={COUNTRIES} />
  </div>
)
