import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Dropdown from 'components/dropdown';
import MultiDropdown from 'components/dropdown/multi-dropdown';
import MultiSelect from 'components/multiselect';
import { deburrCapitalize } from 'app/utils';
import {
  MULTIPLE_LEVEL_SECTION_FIELDS,
  GROUPED_SELECT_FIELDS,
  SECTION_NAMES
} from 'data/data-explorer-constants';

class DataExplorerFilters extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function

  renderDropdown(field, isColumnField) {
    const {
      handleFilterChange,
      selectedOptions,
      filterOptions,
      isDisabled
    } = this.props;

    const value = isColumnField
      ? selectedOptions && selectedOptions[field] && selectedOptions[field][0]
      : selectedOptions && selectedOptions[field];
    return (
      <Dropdown
        key={field}
        label={deburrCapitalize(field)}
        placeholder={`Filter by ${deburrCapitalize(field)}`}
        options={(filterOptions && filterOptions[field]) || []}
        onValueChange={selected =>
          handleFilterChange(field, selected && selected.value)}
        value={value || null}
        plain
        disabled={isDisabled(field)}
        noAutoSort={field === 'goals' || field === 'targets'}
      />
    );
  }

  render() {
    const {
      handleFilterChange,
      selectedOptions,
      filterOptions,
      filters,
      section,
      activeFilterRegion,
      isDisabled
    } = this.props;

    const multipleSection = field =>
      MULTIPLE_LEVEL_SECTION_FIELDS[section] &&
      MULTIPLE_LEVEL_SECTION_FIELDS[section].find(s => s.key === field);
    const groupedSelect = field =>
      GROUPED_SELECT_FIELDS[section] &&
      GROUPED_SELECT_FIELDS[section].find(s => s.key === field);
    const fieldFilters = filters.map(field => {
      if (multipleSection(field)) {
        return (
          <MultiDropdown
            key={field}
            label={deburrCapitalize(field)}
            placeholder={`Filter by ${deburrCapitalize(field)}`}
            options={filterOptions ? filterOptions[field] : []}
            value={
              selectedOptions ? (
                selectedOptions[field] && selectedOptions[field][0]
              ) : null
            }
            disabled={isDisabled(field)}
            clearable
            onChange={option =>
              handleFilterChange(field, option && option.value)}
            noParentSelection={multipleSection(field).noSelectableParent}
          />
        );
      } else if (groupedSelect(field)) {
        const fieldInfo = GROUPED_SELECT_FIELDS[section].find(
          f => f.key === field
        );
        return (
          <MultiSelect
            key={field}
            label={fieldInfo.label}
            selectedLabel={activeFilterRegion}
            placeholder={`Filter by ${fieldInfo.label}`}
            values={(selectedOptions && selectedOptions[field]) || []}
            options={filterOptions ? filterOptions[field] : []}
            groups={fieldInfo.groups}
            disabled={isDisabled(field)}
            onMultiValueChange={selected =>
              handleFilterChange(field, selected, true)}
          />
        );
      }
      return this.renderDropdown(field, true);
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
  handleFilterChange: PropTypes.func.isRequired,
  isDisabled: PropTypes.func.isRequired,
  filters: PropTypes.array,
  selectedOptions: PropTypes.object,
  filterOptions: PropTypes.object
};

export default DataExplorerFilters;
