import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import EmissionsMetaProvider from 'providers/ghg-emissions-meta-provider';
import EmissionsProvider from 'providers/emissions-provider';
import RegionsProvider from 'providers/regions-provider';
import Dropdown from 'components/dropdown';
import ButtonGroup from 'components/button-group';
import { Chart, MultiSelect } from 'cw-components';
import ModalMetadata from 'components/modal-metadata';
import { TabletPortraitOnly, TabletLandscape } from 'components/responsive';
import startCase from 'lodash/startCase';
import isArray from 'lodash/isArray';
import { ALL_SELECTED_OPTION } from 'data/constants';
import styles from './ghg-emissions-styles.scss';

const NON_COLUMN_KEYS = ['breakBy', 'chartType'];

class GhgEmissions extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function

  renderDropdown(label, field, multi, icons) {
    const addAllSelected = (filterOptions, f) => {
      const noAllSelected = NON_COLUMN_KEYS.includes(f);
      if (noAllSelected) return filterOptions && filterOptions[f];
      return (
        (filterOptions &&
        filterOptions[f] && [ALL_SELECTED_OPTION, ...filterOptions[f]]) ||
        []
      );
    };

    const { selected: selectedOptions, options } = this.props;
    const value = selectedOptions && selectedOptions[field];
    const iconsProp = icons ? { icons } : {};
    if (multi) {
      return (
        <MultiSelect
          key={field}
          label={label || startCase(field)}
          placeholder={`Filter by ${startCase(field)}`}
          options={addAllSelected(options, field)}
          onValueChange={selected => this.handleChange(field, selected)}
          values={(isArray(value) ? value : [value]) || null}
          hideResetButton
        />
      );
    }
    return (
      <Dropdown
        key={field}
        label={label || startCase(field)}
        placeholder={`Filter by ${startCase(field)}`}
        options={addAllSelected(options, field)}
        onValueChange={selected => this.handleChange(field, selected)}
        value={value || null}
        hideResetButton
        {...iconsProp}
      />
    );
  }

  render() {
    const {
      data,
      domain,
      config,
      groups,
      handleInfoClick,
      handleChange,
      providerFilters,
      loading,
      activeFilterRegion,
      downloadLink,
      options,
      selected: selectedOptions
    } = this.props;
    const { filters } = options;
    const {
      chartTypeSelected,
      breakBySelected,
      filtersSelected
    } = selectedOptions;

    const renderButtonGroup = () => (
      <ButtonGroup
        className={styles.colEnd}
        buttonsConfig={[
          {
            type: 'info',
            onClick: handleInfoClick
          },
          {
            type: 'share',
            shareUrl: '/embed/ghg-emissions',
            analyticsGraphName: 'Ghg-emissions',
            positionRight: true
          },
          {
            type: 'download',
            section: 'ghg-emissions',
            link: downloadLink
          },
          {
            type: 'addToUser'
          }
        ]}
      />
    );

    return (
      <div>
        <h2 className={styles.title}>Global Historical Emissions</h2>
        <RegionsProvider />
        <EmissionsMetaProvider />
        <EmissionsProvider filters={providerFilters} />
        <div className={styles.col4}>
          {this.renderDropdown('Source', 'sources')}
          {this.renderDropdown('IPCC Version', 'versions')}
          {this.renderDropdown('Select by', 'breakBy')}
          <MultiSelect
            selectedLabel={activeFilterRegion ? activeFilterRegion.label : null}
            label={breakBySelected.label}
            groups={breakBySelected.value === 'location' ? groups : null}
            values={filtersSelected || []}
            options={filters || []}
            onMultiValueChange={selected => handleChange('filter', selected)}
          />
          {this.renderDropdown('Chart Selected', 'chartType')}
          <TabletLandscape>{renderButtonGroup()}</TabletLandscape>
        </div>
        <Chart
          className={styles.chartWrapper}
          type={chartTypeSelected && chartTypeSelected.value}
          theme={{ legend: styles.legend }}
          config={config}
          data={data}
          domain={domain}
          dataOptions={filters}
          dataSelected={filtersSelected}
          height={500}
          loading={loading}
          lineType="linear"
          showUnit
          // onLegendChange={v =>
          //   this.handleFilterChange(fieldToBreakBy, v)}
        />
        <TabletPortraitOnly>
          <div className={styles.buttonGroup}>{renderButtonGroup(true)}</div>
        </TabletPortraitOnly>
        <ModalMetadata />
      </div>
    );
  }
}

GhgEmissions.propTypes = {
  data: PropTypes.array,
  domain: PropTypes.object,
  config: PropTypes.object,
  options: PropTypes.object,
  selected: PropTypes.object,
  groups: PropTypes.array,
  handleChange: PropTypes.func.isRequired,
  handleInfoClick: PropTypes.func.isRequired,
  providerFilters: PropTypes.object,
  loading: PropTypes.bool,
  activeFilterRegion: PropTypes.object,
  downloadLink: PropTypes.string
};

export default GhgEmissions;
