import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Dropdown from 'components/dropdown';
import { MultiLevelDropdown, Multiselect } from 'cw-components';
import { deburrCapitalize } from 'app/utils';
import {
  MULTIPLE_LEVEL_SECTION_FIELDS,
  SECTION_NAMES,
  FIELD_ALIAS,
  GROUPED_OR_MULTI_SELECT_FIELDS,
  NON_COLUMN_KEYS
} from 'data/data-explorer-constants';
import { ALL_SELECTED_OPTION, ALL_SELECTED } from 'data/constants';
import { isNoColumnField } from 'utils/data-explorer';
import isArray from 'lodash/isArray';
import last from 'lodash/last';
import dropdownTheme from 'styles/themes/dropdown/react-selectize.scss';
import multiLevelDropdownTheme from 'styles/themes/dropdown/multi-level-dropdown.scss';

const getOptions = (filterOptions, field, addGroupId) => {
  const noAllSelected = NON_COLUMN_KEYS.includes(field);
  if (noAllSelected) return filterOptions && filterOptions[field];
  const allSelectedOption = addGroupId
    ? { ...ALL_SELECTED_OPTION, groupId: 'regions' }
    : ALL_SELECTED_OPTION;
  return (
    (filterOptions &&
      filterOptions[field] && [allSelectedOption, ...filterOptions[field]]) ||
    []
  );
};

class DataExplorerFilters extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function

  renderDropdown(field, isColumnField) {
    const {
      handleFiltersChange,
      handleChangeSelectorAnalytics,
      selectedOptions,
      filterOptions,
      isDisabled,
      section
    } = this.props;
    const label =
      (FIELD_ALIAS[section] && FIELD_ALIAS[section][field]) || field;
    const value = isColumnField
      ? selectedOptions && selectedOptions[field] && selectedOptions[field][0]
      : selectedOptions && selectedOptions[field];
    return (
      <Dropdown
        key={label}
        label={deburrCapitalize(label)}
        placeholder={`Filter by ${deburrCapitalize(label)}`}
        options={getOptions(filterOptions, field)}
        onValueChange={selected => {
          handleFiltersChange({
            [field]: (selected && selected.slug) || selected.value
          });
          handleChangeSelectorAnalytics();
        }}
        value={value || null}
        plain
        disabled={isDisabled(field)}
        noAutoSort={field === 'goals' || field === 'targets'}
        theme={dropdownTheme}
      />
    );
  }

  render() {
    const {
      handleFiltersChange,
      selectedOptions,
      filterOptions,
      filters,
      section,
      activeFilterLabel,
      isDisabled,
      handleChangeSelectorAnalytics
    } = this.props;
    const multipleSection = field =>
      MULTIPLE_LEVEL_SECTION_FIELDS[section] &&
      MULTIPLE_LEVEL_SECTION_FIELDS[section].find(s => s.key === field);
    const groupedSelect = field =>
      GROUPED_OR_MULTI_SELECT_FIELDS[section] &&
      GROUPED_OR_MULTI_SELECT_FIELDS[section].find(s => s.key === field);
    const fieldFilters = filters.map(field => {
      if (multipleSection(field)) {
        const isMulti = multipleSection(field).multiselect;
        const getSelectedValue = option => {
          if (isArray(option)) {
            return option.length > 0 && last(option).value === ALL_SELECTED
              ? ALL_SELECTED
              : option
                .map(o => o.slug)
                .filter(v => v !== ALL_SELECTED)
                .join();
          }
          return option && option.slug;
        };

        return (
          <MultiLevelDropdown
            key={field}
            label={deburrCapitalize(field)}
            placeholder={`Filter by ${deburrCapitalize(field)}`}
            options={getOptions(filterOptions, field)}
            values={(selectedOptions && selectedOptions[field]) || []}
            disabled={isDisabled(field)}
            onChange={option => {
              handleFiltersChange({ [field]: getSelectedValue(option) });
              handleChangeSelectorAnalytics();
            }}
            noParentSelection={multipleSection(field).noSelectableParent}
            multiselect={isMulti}
            theme={multiLevelDropdownTheme}
          />
        );
      } else if (groupedSelect(field)) {
        const fieldInfo = GROUPED_OR_MULTI_SELECT_FIELDS[section].find(
          f => f.key === field
        );
        const label = fieldInfo.label || fieldInfo.key;
        return (
          <Multiselect
            key={fieldInfo.key}
            label={deburrCapitalize(label)}
            selectedLabel={activeFilterLabel[field]}
            placeholder={`Filter by ${label}`}
            values={(selectedOptions && selectedOptions[field]) || []}
            options={getOptions(filterOptions, field, true)}
            groups={fieldInfo.groups}
            disabled={isDisabled(field)}
            onValueChange={selected => {
              handleFiltersChange({ [field]: selected });
              handleChangeSelectorAnalytics();
            }}
            theme={dropdownTheme}
          />
        );
      }
      return this.renderDropdown(field, !isNoColumnField(section, field));
    });
    const hasYearFilters =
      section === SECTION_NAMES.historicalEmissions ||
      section === SECTION_NAMES.pathways;
    const yearFilters =
      hasYearFilters &&
      ['start_year', 'end_year'].map(field =>
        this.renderDropdown(field, false)
      );
    return yearFilters ? fieldFilters.concat(yearFilters) : fieldFilters;
  }
}

DataExplorerFilters.propTypes = {
  activeFilterLabel: PropTypes.object,
  section: PropTypes.string.isRequired,
  handleFiltersChange: PropTypes.func.isRequired,
  handleChangeSelectorAnalytics: PropTypes.func.isRequired,
  isDisabled: PropTypes.func.isRequired,
  filters: PropTypes.array,
  selectedOptions: PropTypes.object,
  filterOptions: PropTypes.object
};

export default DataExplorerFilters;
