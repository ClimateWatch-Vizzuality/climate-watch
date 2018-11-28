import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Dropdown from 'components/dropdown';
import MultiDropdown from 'components/dropdown/multi-dropdown';
import MultiSelect from 'components/multiselect';
import { deburrCapitalize } from 'app/utils';
import {
  MULTIPLE_LEVEL_SECTION_FIELDS,
  SECTION_NAMES,
  FIELD_ALIAS,
  GROUPED_OR_MULTI_SELECT_FIELDS,
  NON_COLUMN_KEYS
} from 'data/data-explorer-constants';
import { ALL_SELECTED_OPTION } from 'data/constants';
import { isNoColumnField } from 'utils/data-explorer';

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
          handleFiltersChange({ [field]: selected && selected.value });
          handleChangeSelectorAnalytics();
        }}
        value={value || null}
        plain
        disabled={isDisabled(field)}
        noAutoSort={field === 'goals' || field === 'targets'}
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
      activeFilterRegion,
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
        return (
          <MultiDropdown
            key={field}
            label={deburrCapitalize(field)}
            placeholder={`Filter by ${deburrCapitalize(field)}`}
            options={getOptions(filterOptions, field)}
            value={
              selectedOptions ? (
                selectedOptions[field] && selectedOptions[field][0]
              ) : null
            }
            disabled={isDisabled(field)}
            onChange={option => {
              handleFiltersChange({ [field]: option && option.value });
              handleChangeSelectorAnalytics();
            }}
            noParentSelection={multipleSection(field).noSelectableParent}
          />
        );
      } else if (groupedSelect(field)) {
        const fieldInfo = GROUPED_OR_MULTI_SELECT_FIELDS[section].find(
          f => f.key === field
        );
        const label = fieldInfo.label || fieldInfo.key;
        return (
          <MultiSelect
            key={fieldInfo.key}
            label={deburrCapitalize(label)}
            selectedLabel={activeFilterRegion}
            placeholder={`Filter by ${label}`}
            values={(selectedOptions && selectedOptions[field]) || []}
            options={getOptions(filterOptions, field, true)}
            groups={fieldInfo.groups}
            disabled={isDisabled(field)}
            onMultiValueChange={selected => {
              handleFiltersChange({ [field]: selected });
              handleChangeSelectorAnalytics();
            }}
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
  activeFilterRegion: PropTypes.string,
  section: PropTypes.string.isRequired,
  handleFiltersChange: PropTypes.func.isRequired,
  handleChangeSelectorAnalytics: PropTypes.func.isRequired,
  isDisabled: PropTypes.func.isRequired,
  filters: PropTypes.array,
  selectedOptions: PropTypes.object,
  filterOptions: PropTypes.object
};

export default DataExplorerFilters;
