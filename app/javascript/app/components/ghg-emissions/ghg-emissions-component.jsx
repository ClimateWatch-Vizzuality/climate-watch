import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import EmissionsMetaProvider from 'providers/ghg-emissions-meta-provider';
import EmissionsProvider from 'providers/emissions-provider';
import RegionsProvider from 'providers/regions-provider';
import Dropdown from 'components/dropdown';
import ButtonGroup from 'components/button-group';
import MultiSelect from 'components/multiselect';
import { Chart } from 'cw-components';
import ModalMetadata from 'components/modal-metadata';
import { TabletPortraitOnly, TabletLandscape } from 'components/responsive';
import startCase from 'lodash/startCase';
import isArray from 'lodash/isArray';
import { ALL_SELECTED_OPTION } from 'data/constants';
import lineIcon from 'assets/icons/line_chart.svg';
import areaIcon from 'assets/icons/area_chart.svg';
import styles from './ghg-emissions-styles.scss';

const NO_ALL_SELECTED_COLUMNS = ['breakBy', 'chartType', 'sources'];
const getValues = value => (value && (isArray(value) ? value : [value])) || [];

class GhgEmissions extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function

  renderDropdown(label, field, multi, icons) {
    const addAllSelected = (filterOptions, f) => {
      const noAllSelected = NO_ALL_SELECTED_COLUMNS.includes(f);
      if (noAllSelected) return filterOptions && filterOptions[f];
      return (
        (filterOptions &&
        filterOptions[f] && [ALL_SELECTED_OPTION, ...filterOptions[f]]) ||
        []
      );
    };

    const { selected: selectedOptions, options, handleChange } = this.props;
    const value = selectedOptions && selectedOptions[`${field}Selected`];
    const iconsProp = icons ? { icons } : {};
    if (multi) {
      return (
        <MultiSelect
          key={field}
          label={label || startCase(field)}
          placeholder={`Filter by ${startCase(field)}`}
          options={addAllSelected(options, field)}
          onValueChange={selected => handleChange(field, selected)}
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
        onValueChange={selected => handleChange(field, selected)}
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
      downloadLink,
      options,
      selected: selectedOptions,
      legendOptions,
      legendSelected
    } = this.props;
    const { chartTypeSelected } = selectedOptions;
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
    const icons = { line: lineIcon, area: areaIcon };
    return (
      <div>
        <h2 className={styles.title}>Global Historical Emissions</h2>
        <RegionsProvider />
        <EmissionsMetaProvider />
        <EmissionsProvider filters={providerFilters} />
        <div className={styles.col4}>
          {this.renderDropdown('Source', 'sources')}
          <MultiSelect
            label={'Regions'}
            groups={groups}
            values={getValues(selectedOptions.regionsSelected)}
            options={options.regions || []}
            onMultiValueChange={selected => handleChange('regions', selected)}
          />
          <MultiSelect
            label={'Sectors / Subsectors'}
            values={getValues(selectedOptions.sectorsSelected)}
            options={options.sectors || []}
            onMultiValueChange={selected => handleChange('sectors', selected)}
          />
          <MultiSelect
            label={'Gases'}
            values={getValues(selectedOptions.gasesSelected)}
            options={options.gases || []}
            onMultiValueChange={selected => handleChange('gases', selected)}
          />
          {this.renderDropdown('Break by', 'breakBy')}
          {this.renderDropdown(null, 'chartType', false, icons)}
          <TabletLandscape>{renderButtonGroup()}</TabletLandscape>
        </div>
        <Chart
          className={styles.chartWrapper}
          type={chartTypeSelected && chartTypeSelected.value}
          theme={{ legend: styles.legend }}
          config={config}
          data={data}
          domain={domain}
          dataOptions={legendOptions}
          dataSelected={legendSelected || []}
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
  legendOptions: PropTypes.array,
  legendSelected: PropTypes.array,
  groups: PropTypes.array,
  handleChange: PropTypes.func.isRequired,
  handleInfoClick: PropTypes.func.isRequired,
  providerFilters: PropTypes.object,
  loading: PropTypes.bool,
  activeFilterRegion: PropTypes.object,
  downloadLink: PropTypes.string
};

export default GhgEmissions;
