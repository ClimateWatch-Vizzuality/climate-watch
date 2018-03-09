import React from 'react';
import PropTypes from 'prop-types';
import sortBy from 'lodash/sortBy';
import Dropdown from 'components/dropdown';
import cx from 'classnames';
import styles from './country-compare-selector-styles.scss';

const CountryCompareSelector = ({
  countryOptions,
  handleDropDownChange,
  activeCountryOptions,
  selectors,
  className
}) => (
  <div className={styles.bottomBorder}>
    <div className="grid-column-item">
      <div className={cx(styles.layout, className)}>
        {selectors.map((v, index) => (
          <Dropdown
            key={v.color}
            placeholder="Add a country"
            options={sortBy(countryOptions, ['label'])}
            onValueChange={selected => handleDropDownChange(index, selected)}
            value={activeCountryOptions[index]}
            transparent
            colorDot={v.country ? v.color : null}
          />
        ))}
      </div>
    </div>
  </div>
);

CountryCompareSelector.propTypes = {
  activeCountryOptions: PropTypes.array,
  selectors: PropTypes.array,
  countryOptions: PropTypes.array,
  handleDropDownChange: PropTypes.func.isRequired,
  className: PropTypes.string
};

export default CountryCompareSelector;
