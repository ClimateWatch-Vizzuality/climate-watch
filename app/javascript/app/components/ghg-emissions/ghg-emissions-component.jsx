import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import startCase from 'lodash/startCase';
import isArray from 'lodash/isArray';
import { isPageContained } from 'utils/navigation';
import cx from 'classnames';

import { GHG_TABLE_HEADER } from 'data/constants';
import {
  Chart,
  Multiselect,
  MultiLevelDropdown,
  Dropdown
} from 'cw-components';
import EmissionsMetaProvider from 'providers/ghg-emissions-meta-provider';
import EmissionsProvider from 'providers/emissions-provider';
import RegionsProvider from 'providers/regions-provider';
import WorldBankDataProvider from 'providers/wb-country-data-provider';
import ButtonGroup from 'components/button-group';
import Table from 'components/table';
import ModalMetadata from 'components/modal-metadata';
import { TabletPortraitOnly, TabletLandscape } from 'components/responsive';
import { toPlural } from 'utils/ghg-emissions';
import { encodeAsCSVContent, invokeCSVDownload } from 'utils/csv';
import { orderByColumns, stripHTML } from 'utils';

import lineIcon from 'assets/icons/line_chart.svg';
import areaIcon from 'assets/icons/area_chart.svg';
import percentageIcon from 'assets/icons/icon-percentage-chart.svg';
import dropdownTheme from 'styles/themes/dropdown/react-selectize.scss';
import multiLevelDropdownTheme from 'styles/themes/dropdown/multi-level-dropdown.scss';

import styles from './ghg-emissions-styles.scss';

const getValues = value => (value && (isArray(value) ? value : [value])) || [];

class GhgEmissions extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function

  handleDownloadDataClick = () => {
    const { fieldToBreakBy, tableData } = this.props;

    const defaultColumnOrder = [GHG_TABLE_HEADER[fieldToBreakBy], 'unit'];
    const stripHtmlFromUnit = d => ({ ...d, unit: stripHTML(d.unit) });
    const data = tableData.map(stripHtmlFromUnit);
    const csvContentEncoded = encodeAsCSVContent(
      data,
      orderByColumns(defaultColumnOrder)
    );
    invokeCSVDownload(csvContentEncoded);
  };

  renderDropdown(label, field, icons) {
    const { selected: selectedOptions, options, handleChange } = this.props;
    const value = selectedOptions && selectedOptions[`${field}Selected`];
    const iconsProp = icons ? { icons } : {};
    return (
      <Dropdown
        key={field}
        label={label || startCase(field)}
        placeholder={`Filter by ${startCase(field)}`}
        options={options[field] || []}
        onValueChange={selected => handleChange(field, selected)}
        value={value || null}
        hideResetButton
        theme={dropdownTheme}
        {...iconsProp}
      />
    );
  }

  renderChart() {
    const {
      config,
      data,
      domain,
      fieldToBreakBy,
      filtersConflicts,
      handleChange,
      hideRemoveOptions,
      legendOptions,
      legendSelected,
      loading,
      providerFilters,
      selected: selectedOptions,
      tableData
    } = this.props;
    const { chartTypeSelected } = selectedOptions;

    const anyFilterConflicts = !!(
      filtersConflicts && filtersConflicts.conflicts.length
    );

    if (!providerFilters) {
      return (
        <div className={styles.messageContainer}>
          <div>
            <p>Please select an option for each of the filters</p>
          </div>
        </div>
      );
    }

    if (anyFilterConflicts) {
      return (
        <div className={styles.messageContainer}>
          <div>
            <p>We are not able to display current selection because:</p>
            <ul>
              {filtersConflicts.conflicts.map(conflict => (
                <li key={conflict}>{conflict}</li>
              ))}
            </ul>
            <p>{filtersConflicts.solutionText}</p>
          </div>
        </div>
      );
    }
    const setColumnWidth = column => {
      if (column === GHG_TABLE_HEADER[fieldToBreakBy]) return 300;
      return 200;
    };
    const tableDataReady = !loading && tableData && tableData.length;

    return (
      <React.Fragment>
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
          onLegendChange={v => handleChange(toPlural(fieldToBreakBy), v)}
          hideRemoveOptions={hideRemoveOptions}
        />
        {tableDataReady && (
          <Table
            data={tableData}
            horizontalScroll
            firstColumnHeaders={[GHG_TABLE_HEADER[fieldToBreakBy], 'unit']}
            flexGrow={0}
            parseHtml
            setColumnWidth={setColumnWidth}
            emptyValueLabel="N/A"
          />
        )}
      </React.Fragment>
    );
  }

  render() {
    const {
      handleInfoClick,
      handleChange,
      providerFilters,
      downloadLink,
      options,
      selected: selectedOptions
    } = this.props;

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
            link: downloadLink,
            tooltipText: 'View or download raw data'
          },
          {
            type: 'downloadCSV',
            tooltipText: 'Download data in csv',
            onClick: this.handleDownloadDataClick
          },
          {
            type: 'addToUser'
          }
        ]}
      />
    );
    const icons = {
      line: lineIcon,
      area: areaIcon,
      percentage: percentageIcon
    };
    const regionGroups = [
      {
        groupId: 'regions',
        title: 'Regions'
      },
      {
        groupId: 'countries',
        title: 'Countries'
      }
    ];
    const sectorGroups = [
      {
        groupId: 'totals',
        title: 'Total Emission'
      },
      {
        groupId: 'sectors',
        title: 'Sector&Sub-Sector'
      }
    ];

    return (
      <div>
        <div
          className={cx(styles.titleContainer, {
            [styles.containedButtonGroup]: isPageContained
          })}
        >
          {!isPageContained && (
            <h2 className={styles.title}>Global Historical Emissions</h2>
          )}
          <TabletLandscape>
            <div className={styles.buttonGroup}>{renderButtonGroup()}</div>
          </TabletLandscape>
        </div>
        <WorldBankDataProvider />
        <RegionsProvider />
        <EmissionsMetaProvider />
        {providerFilters && <EmissionsProvider filters={providerFilters} />}
        <div className={styles.col4}>
          {this.renderDropdown('Data Source', 'sources')}
          <Multiselect
            label={'Countries/Regions'}
            groups={regionGroups}
            options={options.regions || []}
            values={getValues(selectedOptions.regionsSelected)}
            onValueChange={selected => handleChange('regions', selected)}
            theme={dropdownTheme}
          />
          <MultiLevelDropdown
            label="Sectors/Subsectors"
            optGroups={sectorGroups}
            options={options.sectors}
            values={selectedOptions.sectorsSelected || []}
            onChange={selected => handleChange('sectors', selected)}
            clearable
            multiselect
            theme={multiLevelDropdownTheme}
          />
          <Multiselect
            label={'Gases'}
            options={options.gases}
            values={getValues(selectedOptions.gasesSelected)}
            onValueChange={selected => handleChange('gases', selected)}
            theme={dropdownTheme}
          />
          {this.renderDropdown('Show data by', 'breakBy')}
          {this.renderDropdown(null, 'chartType', icons)}
        </div>
        {this.renderChart()}
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
  tableData: PropTypes.array,
  domain: PropTypes.object,
  config: PropTypes.object,
  options: PropTypes.object,
  selected: PropTypes.object,
  filtersConflicts: PropTypes.object,
  fieldToBreakBy: PropTypes.string,
  legendOptions: PropTypes.array,
  legendSelected: PropTypes.array,
  handleChange: PropTypes.func.isRequired,
  handleInfoClick: PropTypes.func.isRequired,
  providerFilters: PropTypes.object,
  loading: PropTypes.bool,
  activeFilterRegion: PropTypes.object,
  downloadLink: PropTypes.string,
  hideRemoveOptions: PropTypes.bool
};

export default GhgEmissions;
