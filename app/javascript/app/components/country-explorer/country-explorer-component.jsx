import React from 'react';
import _map from 'lodash/map';
import cx from 'classnames';
import { themr } from 'react-css-themr';
import { NavLink } from 'react-router-dom';

import styles from './country-explorer-styles.scss';

const CountryExplorer = (props) => {
  const {
    open,
    countries,
    label,
    selected,
    className,
    theme,
    onLabelClick,
    closeCountryExplorer
  } = props;
  return (
    <div className={cx(className, theme.container)}>
      <span onClick={onLabelClick}>
        {label}
      </span>
      <ul
        className={cx(theme.list, {
          [theme.listClosed]: !open
        })}
      >
        {_map(countries, (country, iso) =>
          (<li
            className={cx(theme.listItem, {
              [theme.listItemSelected]: selected === iso
            })}
            key={iso}
          >
            <NavLink onClick={() => closeCountryExplorer()} className={theme.link} to={`/country/${iso}`}>{country}</NavLink>
          </li>)
        )}
      </ul>
    </div>
  );
};

export default themr(CountryExplorer, styles)(CountryExplorer);
