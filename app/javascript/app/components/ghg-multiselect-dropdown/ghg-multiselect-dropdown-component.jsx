import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { useCombobox, useMultipleSelection } from 'downshift';
import { groupBy } from 'lodash';
import Icon from 'components/icon';
import arrowIcon from 'assets/icons/dropdown-arrow.svg';
import caretIcon from 'assets/icons/arrow-down-tiny.svg';
import closeIcon from 'assets/icons/close.svg';
import styles from './ghg-multiselect-dropdown-styles.scss';

function isRegion(option) {
  return option.groupId === 'regions';
}

function regionIncludesInputValue(option, inputValue) {
  return (
    isRegion(option) &&
    option.regionCountries.find(country =>
      country.label.toLowerCase().startsWith(inputValue.toLowerCase())
    )
  );
}

function countryIncludesInputValue(option, inputValue) {
  return option.label.toLowerCase().startsWith(inputValue.toLowerCase());
}

const GhgMultiselectDropdowComponent = ({
  label,
  options,
  values,
  handleSelectionUpdate,
  handleClearSelection
}) => {
  const [inputContent, setInputContent] = useState('');
  const [expandedRegions, setExpandedRegion] = useState([]);

  const getFilteredItems = () =>
    options.filter(
      option =>
        countryIncludesInputValue(option, inputContent) ||
        regionIncludesInputValue(option, inputContent)
    ) || [];

  const selectedCountriesLabel = selected =>
    (selected.length === 1 ? selected[0].label : `${selected.length} selected`);

  const getGroupedOptions = filteredOptions =>
    filteredOptions.length && groupBy(filteredOptions, 'groupId');

  const isOptionSelected = option =>
    values.some(item => item.label === option.label);

  const isRegionExpanded = regionLabel => expandedRegions.includes(regionLabel);

  const handleExpandRegion = regionLabel => {
    if (isRegionExpanded(regionLabel)) {
      setExpandedRegion(expandedRegions.filter(r => r !== regionLabel));
    } else {
      setExpandedRegion([...expandedRegions, regionLabel]);
    }
  };

  const getFilteredGroup = group =>
    getGroupedOptions(getFilteredItems(options))[group];

  const { getSelectedItemProps, getDropdownProps } = useMultipleSelection({
    selectedItems: values
  });

  const {
    isOpen,
    getToggleButtonProps,
    getMenuProps,
    getInputProps,
    getComboboxProps
  } = useCombobox({
    inputValue: inputContent,
    selectedItem: null,
    items: getFilteredItems(),
    onStateChange: ({ inputValue, type }) => {
      switch (type) {
        case useCombobox.stateChangeTypes.InputChange:
          setInputContent(inputValue);
          break;
        default:
          break;
      }
    }
  });

  return (
    <div className={styles.container}>
      <div {...getComboboxProps()}>
        <span className={styles.label}>{label}</span>
        <div
          className={styles.boxToggle}
          {...getToggleButtonProps()}
          aria-label={'toggle menu'}
        >
          <span className={styles.selectedLabel}>
            {selectedCountriesLabel(values)}
          </span>
          {values.length > 0 && (
            <Icon
              className={styles.closeIcon}
              icon={closeIcon}
              onClick={handleClearSelection}
            />
          )}
          <Icon icon={arrowIcon} className={styles.dropdownArrow} />
        </div>
      </div>
      <div
        className={cx(styles.menuContainer, { [styles.menuOpen]: isOpen })}
        {...getMenuProps()}
      >
        {isOpen && (
          <Fragment>
            <div {...getToggleButtonProps()} className={styles.menuHeader}>
              <span className={styles.label}>{label}</span>
              <Icon icon={arrowIcon} className={styles.dropdownArrow} />
            </div>
            <input
              className={styles.input}
              placeholder="Search for countries or regions"
              {...getInputProps(getDropdownProps({ preventKeyAction: isOpen }))}
            />
            <div className={styles.optionsContainer}>
              <section className={styles.optionsSection}>
                <p className={styles.sectionTitle}>Countries</p>
                {getFilteredGroup('countries') &&
                  getFilteredGroup('countries').map(country => (
                    <div
                      key={country.iso}
                      className={cx(styles.menuOption, {
                        [styles.selected]: isOptionSelected(country)
                      })}
                      {...getSelectedItemProps({
                        index: country,
                        onClick: () => handleSelectionUpdate(values, country)
                      })}
                    >
                      <div className={styles.checkbox} />
                      {country.label}
                    </div>
                  ))}
              </section>
              <section className={styles.optionsSection}>
                <p className={styles.sectionTitle}>Regions</p>
                {getFilteredGroup('regions') &&
                  getFilteredGroup('regions').map(region => (
                    <div
                      className={styles.regionOptionContainer}
                      key={region.iso}
                    >
                      <button
                        className={styles.regionButton}
                        onClick={() => handleExpandRegion(region.label)}
                      >
                        <Icon
                          icon={caretIcon}
                          className={cx(styles.regionArrow, {
                            [styles.regionExpanded]: isRegionExpanded(
                              region.label
                            )
                          })}
                        />
                      </button>
                      <div
                        className={cx(styles.menuOption, {
                          [styles.selected]: isOptionSelected(region)
                        })}
                        {...getSelectedItemProps({
                          index: region,
                          onClick: () => handleSelectionUpdate(values, region)
                        })}
                      >
                        <div className={styles.checkbox} />
                        {region.label}
                      </div>
                      {isRegionExpanded(region.label) && (
                        <div
                          className={cx(styles.expandedRegionsContainer, {
                            [styles.expandedMediumRegionContainer]:
                              region.label === 'G77',
                            [styles.expandedHighRegionContainer]:
                              region.label === 'World'
                          })}
                        >
                          {region.regionCountries.map(country => (
                            <p key={country.iso} className={styles.regionName}>
                              {country.label}
                            </p>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
              </section>
            </div>
          </Fragment>
        )}
      </div>
    </div>
  );
};

GhgMultiselectDropdowComponent.propTypes = {
  label: PropTypes.string,
  options: PropTypes.array,
  values: PropTypes.array,
  handleSelectionUpdate: PropTypes.func,
  handleClearSelection: PropTypes.func
};

export default GhgMultiselectDropdowComponent;
