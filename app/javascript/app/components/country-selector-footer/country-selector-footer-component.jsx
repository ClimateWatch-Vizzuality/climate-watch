import React from 'react';
import Tag from 'components/tag';
import cx from 'classnames';
import PropTypes from 'prop-types';

import MultiSelect from 'components/multiselect';
import Icon from 'components/icon';

import plusIcon from 'assets/icons/plus.svg';
import { COUNTRY_COMPARE_COLORS } from 'data/constants';

import layout from 'styles/layout.scss';
import styles from './country-selector-footer-styles.scss';

const CountrySelectorFooter = ({
  locations,
  activeCountryOptions,
  countryOptions,
  handleSelectionChange,
  handleRemove
}) => (
  <div className={cx(layout.content, styles.footerContainer)}>
    {activeCountryOptions &&
      activeCountryOptions[0].label &&
      activeCountryOptions.map(
        (country, index) =>
          (country ? (
            <Tag
              className={styles.tag}
              key={`${country.label}`}
              data={{
                color: COUNTRY_COMPARE_COLORS[index],
                label: country.label,
                id: `${country.label}`,
                value: country.value
              }}
              canRemove
              onRemove={handleRemove}
            />
          ) : null)
      )}
    {countryOptions && locations.length < 3 && (
      <MultiSelect
        className={styles.footerTagSelector}
        values={locations || []}
        options={countryOptions}
        onMultiValueChange={handleSelectionChange}
        hideResetButton
        closeOnSelect
        dropdownDirection={-1}
      >
        <Icon className={styles.plusIcon} icon={plusIcon} />
      </MultiSelect>
    )}
  </div>
);

CountrySelectorFooter.propTypes = {
  locations: PropTypes.array,
  activeCountryOptions: PropTypes.array,
  countryOptions: PropTypes.array,
  handleSelectionChange: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired
};

export default CountrySelectorFooter;
