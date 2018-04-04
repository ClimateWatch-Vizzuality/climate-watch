import React from 'react';
import Tag from 'components/tag';
import PropTypes from 'prop-types';

import MultiSelect from 'components/multiselect';
import plusIcon from 'assets/icons/plus.svg';
import { COUNTRY_COMPARE_COLORS } from 'data/constants';

import styles from './country-selector-footer-styles.scss';

const CountrySelectorFooter = ({
  activeCountryOptions,
  countryOptions,
  handleSelectionChange,
  handleRemove,
  locationsValues
}) => (
  <div className={styles.footerContainer}>
    <div className="grid-column-item">
      <div className={styles.tagsContainer}>
        {activeCountryOptions &&
          activeCountryOptions.map(
            (country, index) =>
              (country && country.label ? (
                <Tag
                  key={`${country.label}`}
                  label={country.label}
                  color={COUNTRY_COMPARE_COLORS[index]}
                  data={{
                    id: country.label,
                    value: country.value
                  }}
                  canRemove={locationsValues.length > 1}
                  onRemove={handleRemove}
                />
              ) : null)
          )}
      </div>
    </div>
    {countryOptions && locationsValues.length < 3 && (
      <MultiSelect
        className={styles.footerTagSelector}
        values={locationsValues || []}
        options={countryOptions}
        onMultiValueChange={handleSelectionChange}
        hideResetButton
        closeOnSelect
        dropdownDirection={-1}
        icon={plusIcon}
        searchInput={false}
      />
    )}
  </div>
);

CountrySelectorFooter.propTypes = {
  locationsValues: PropTypes.array,
  activeCountryOptions: PropTypes.array,
  countryOptions: PropTypes.array,
  handleSelectionChange: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired
};

export default CountrySelectorFooter;
