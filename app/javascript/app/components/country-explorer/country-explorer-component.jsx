import React from 'react'
import _map from 'lodash/map'
import cx from 'classnames'
import { themr } from 'react-css-themr'

import styles from './country-explorer-styles.scss'

const CountryExplorer = props => {
  const {
    open,
    countries,
    label,
    selected,
    className,
    theme,
    onLabelClick
  } = props

  return (
    <div className={cx(className, theme.countryExplorerContainer)}>
      <span onClick={onLabelClick}>
        {label}
      </span>
      <ul
        className={cx(theme.countryExplorerList, {
          [theme.countryExplorerListClosed]: !open
        })}
      >
        {_map(countries, (country, iso) =>
          <li
            className={cx(theme.countryExplorerListItem, {
              [theme.countryExplorerListItemSelected]: selected === iso
            })}
            key={iso}
          >
            {country}
          </li>
        )}
      </ul>
    </div>
  )
}

export default themr(CountryExplorer, styles)(CountryExplorer)
