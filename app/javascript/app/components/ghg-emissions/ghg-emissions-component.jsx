import React, { useState, useEffect } from 'react';
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
import legendChartTheme from 'styles/themes/chart/legend-chart.scss';
import DataZoom from './data-zoom';

import styles from './ghg-emissions-styles.scss';

const FEATURE_NEW_GHG = process.env.FEATURE_NEW_GHG === 'true';

const icons = {
  'Line chart': lineIcon,
  'Stacked area Chart': areaIcon,
  '100% stacked area chart': percentageIcon
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

const getValues = value => (value && (isArray(value) ? value : [value])) || [];

function GhgEmissions(props) {
  const {
    fieldToBreakBy,
    tableData,
    selected: selectedOptions,
    options,
    handleChange,
    config,
    data,
    domain,
    filtersConflicts,
    hideRemoveOptions,
    legendOptions,
    legendSelected,
    loading,
    providerFilters,
    dataZoomData,
    handleInfoClick,
    downloadLink
  } = props;

  const [years, setYears] = useState(null);
  const [updatedData, setUpdatedData] = useState(data);
  useEffect(() => {
    if (data) {
      if (years) {
        setUpdatedData(data.filter(d => d.x >= years.min && d.x <= years.max));
      } else {
        setUpdatedData(data);
      }
    }
  }, [years, data]);

  const handleDownloadDataClick = () => {
    const defaultColumnOrder = [GHG_TABLE_HEADER[fieldToBreakBy], 'unit'];
    const stripHtmlFromUnit = d => ({ ...d, unit: stripHTML(d.unit) });
    const parsedTableData = tableData.map(stripHtmlFromUnit);
    const csvContentEncoded = encodeAsCSVContent(
      parsedTableData,
      orderByColumns(defaultColumnOrder)
    );
    invokeCSVDownload(csvContentEncoded);
  };

  const renderDropdown = (label, field, dropdownIcons, extraProps) => {
    const value = selectedOptions && selectedOptions[`${field}Selected`];
    const iconsProp = dropdownIcons ? { icons: dropdownIcons } : {};
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
        {...extraProps}
      />
    );
  };

  const renderChart = () => {
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

    const handleYearChange = (min, max) => setYears({ min, max });

    const tableDataReady = !loading && tableData && tableData.length;

    return (
      <React.Fragment>
        <Chart
          className={styles.chartWrapper}
          type={chartTypeSelected && chartTypeSelected.value}
          theme={legendChartTheme}
          config={config}
          data={updatedData}
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
        {FEATURE_NEW_GHG && !loading && (
          <DataZoom data={dataZoomData} onYearChange={handleYearChange} />
        )}
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
  };

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
          onClick: handleDownloadDataClick
        },
        {
          type: 'addToUser'
        }
      ]}
    />
  );

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
        {renderDropdown('Data Source', 'sources')}
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
        {renderDropdown('Show data by', 'breakBy')}
        {renderDropdown(null, 'chartType', icons, {
          variant: 'icons-labels',
          customTheme: 'icons-dropdown'
        })}
      </div>
      {renderChart()}
      <TabletPortraitOnly>
        <div className={styles.buttonGroup}>{renderButtonGroup(true)}</div>
      </TabletPortraitOnly>
      <ModalMetadata />
    </div>
  );
}

GhgEmissions.propTypes = {
  data: PropTypes.array,
  tableData: PropTypes.array,
  dataZoomData: PropTypes.array,
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
  downloadLink: PropTypes.string,
  hideRemoveOptions: PropTypes.bool
};

export default GhgEmissions;
