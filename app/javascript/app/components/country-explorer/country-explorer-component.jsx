import React from 'react'
import _map from 'lodash/map'
import cx from 'classnames'

import styles from './country-explorer-styles.scss'

const CountryList = props => {
  const { countries, open } = props

  return (
    <ul className={cx(styles.list, { [styles.listClosed]: !open })}>
      {_map(countries, (country, iso) =>
        <li key={iso}>{country}</li>
      )}
    </ul>)
}

const CountryExplorer = props => {
  const { open, countries, selected } = props
  return (
    <div className={cx(styles.container)}>
      <CountryList open={open} countries={countries} selected={selected} />
    </div>)
}

export default CountryExplorer
