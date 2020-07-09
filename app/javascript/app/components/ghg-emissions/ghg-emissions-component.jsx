import React from 'react';
import PropTypes from 'prop-types';
import startCase from 'lodash/startCase';
import isArray from 'lodash/isArray';
import { isPageContained } from 'utils/navigation';
import cx from 'classnames';
import { GHG_TABLE_HEADER, GHG_CALCULATION_OPTIONS } from 'data/constants';
import {
  Chart,
  Multiselect,
  MultiLevelDropdown,
  Dropdown
} from 'cw-components';
import LegendChart from 'components/charts/legend-chart';
import EmissionsMetaProvider from 'providers/ghg-emissions-meta-provider';
import EmissionsProvider from 'providers/emissions-provider';
import RegionsProvider from 'providers/regions-provider';
import WorldBankDataProvider from 'providers/wb-country-data-provider';
import ButtonGroup from 'components/button-group';
import ShareButton from 'components/button/share-button';
import Table from 'components/table';
import GhgMultiselectDropdown from 'components/ghg-multiselect-dropdown';
import ghgTableTheme from 'styles/themes/table/ghg-table-theme.scss';
import ModalPngDownload from 'components/modal-png-download';
import ModalDownload from 'components/modal-download';
import { TabletPortraitOnly, TabletLandscape } from 'components/responsive';
import { toPlural } from 'utils/ghg-emissions';
import { format } from 'd3-format';
import ModalShare from 'components/modal-share';
import ModalMetadata from 'components/modal-metadata';
import lineIcon from 'assets/icons/line_chart.svg';
import areaIcon from 'assets/icons/area_chart.svg';
import percentageIcon from 'assets/icons/icon-percentage-chart.svg';
import dropdownTheme from 'styles/themes/dropdown/react-selectize.scss';
import multiSelectTheme from 'styles/themes/dropdown/multiselect-dropdown.scss';
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
    title: 'Sector & Sub-Sector'
  }
];

const getValues = value => (value && (isArray(value) ? value : [value])) || [];

function GhgEmissions(props) {
  const {
    fieldToBreakBy,
    tableData,
    titleLinks,
    selected: selectedOptions,
    options,
    handleChange,
    config,
    data,
    setYears,
    domain,
    filtersConflicts,
    hideRemoveOptions,
    legendOptions,
    legendSelected,
    loading,
    providerFilters,
    dataZoomData,
    handlePngDownloadModal,
    handleDownloadModalOpen,
    handleInfoClick,
    setColumnWidth,
    downloadLink,
    dataZoomYears,
    dataZoomPosition,
    setDataZoomPosition
  } = props;

  const buttonGroupConfig = [
    {
      type: 'info',
      onClick: handleInfoClick
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
      onClick: handleDownloadModalOpen
    },
    {
      type: 'addToUser'
    }
  ];

  const buttonGroupGHGemissions = [
    {
      type: 'info',
      onClick: handleInfoClick
    },
    {
      type: 'downloadCombo',
      options: [
        {
          label: 'Download current data (CSV)',
          action: handleDownloadModalOpen
        },
        {
          label: 'Save as image (PNG)',
          action: handlePngDownloadModal
        },
        {
          label: 'Go to data explorer',
          link: downloadLink,
          target: '_self'
        }
      ],
      reverseDropdown: false
    },
    {
      type: 'addToUser'
    }
  ];

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

  const handleLegendChange = v => {
    // If there is only one region selected return the contracted region + new selected item
    if (
      toPlural(fieldToBreakBy) === 'regions' &&
      selectedOptions.regionsSelected &&
      selectedOptions.regionsSelected.length === 1
    ) {
      handleChange(
        'regions',
        selectedOptions.regionsSelected.concat(v[v.length - 1])
      );
    } else {
      handleChange(toPlural(fieldToBreakBy), v);
    }
  };

  const renderPngChart = () => {
    const { chartTypeSelected } = selectedOptions;
    return (
      <Chart
        type={chartTypeSelected && chartTypeSelected.value}
        theme={legendChartTheme}
        config={config}
        data={data}
        domain={domain}
        height={250}
        loading={loading}
        lineType="linear"
        showUnit
      />
    );
  };

  const renderPngLegend = () => (
    <LegendChart
      theme={styles}
      config={config}
      dataOptions={legendOptions}
      dataSelected={legendOptions}
      hideRemoveOptions
    />
  );

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

    const tableDataReady = !loading && tableData && tableData.length;
    const isPercentageChangeCalculation =
      selectedOptions.calculationSelected.value ===
      GHG_CALCULATION_OPTIONS.PERCENTAGE_CHANGE.value;

    const percentageChangeCustomLabelFormat = value => {
      if (value === undefined) {
        return 'n/a';
      }
      return value ? `${format('.2r')(value)}%` : '0%';
    };
    return (
      <React.Fragment>
        <Chart
          className={styles.chartWrapper}
          type={chartTypeSelected && chartTypeSelected.value}
          theme={legendChartTheme}
          config={config}
          data={data}
          domain={domain}
          dataOptions={legendOptions}
          dataSelected={legendSelected || []}
          height={500}
          loading={loading}
          lineType="linear"
          showUnit
          onLegendChange={handleLegendChange}
          hideRemoveOptions={hideRemoveOptions}
          getCustomYLabelFormat={
            isPercentageChangeCalculation
              ? percentageChangeCustomLabelFormat
              : undefined
          }
          dataZoomComponent={
            FEATURE_NEW_GHG &&
            !loading && (
              <DataZoom
                data={dataZoomData}
                position={dataZoomPosition}
                years={dataZoomYears}
                setPosition={setDataZoomPosition}
                onYearChange={(min, max) => setYears({ min, max })}
              />
            )
          }
        />
        {tableDataReady && (
          <Table
            data={tableData}
            horizontalScroll
            firstColumnHeaders={[GHG_TABLE_HEADER[fieldToBreakBy], 'unit']}
            flexGrow={0}
            headerHeight={30}
            parseHtml
            setColumnWidth={setColumnWidth}
            emptyValueLabel="N/A"
            splittedColumns
            titleLinks={titleLinks}
            theme={ghgTableTheme}
          />
        )}
      </React.Fragment>
    );
  };

  const renderButtonGroup = () => (
    <ButtonGroup
      className={styles.buttonGroup}
      buttonsConfig={
        FEATURE_NEW_GHG ? buttonGroupGHGemissions : buttonGroupConfig
      }
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
          <div className={styles.buttonGroupContainer}>
            {renderButtonGroup()}
          </div>
          <ShareButton
            className={styles.shareButton}
            sharePath={'/ghg-emissions'}
          />
        </TabletLandscape>
        {FEATURE_NEW_GHG && (
          <p className={styles.bodyText}>
            Explore GHG emissions from multiple data source (CAIT, PIK, UNFCCC,
            GCP) and understand their differences in the{' '}
            <a className={styles.link} href="about/faq/ghg">
              FAQ
            </a>
          </p>
        )}
      </div>
      <WorldBankDataProvider />
      <RegionsProvider includeGHGSources />
      <EmissionsMetaProvider />
      {providerFilters && <EmissionsProvider filters={providerFilters} />}
      <div className={cx(styles.col4, { [styles.newGHG]: FEATURE_NEW_GHG })}>
        {renderDropdown('Data Source', 'sources')}
        {FEATURE_NEW_GHG ? (
          <GhgMultiselectDropdown
            label={'Countries/Regions'}
            groups={regionGroups}
            options={options.regions || []}
            values={getValues(selectedOptions.regionsSelected)}
            onSelectionChange={selected => handleChange('regions', selected)}
          />
        ) : (
          <Multiselect
            label={'Countries/Regions'}
            groups={regionGroups}
            options={options.regions || []}
            values={getValues(selectedOptions.regionsSelected)}
            onValueChange={selected => handleChange('regions', selected)}
            theme={multiSelectTheme}
          />
        )}
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
          theme={multiSelectTheme}
        />
        {FEATURE_NEW_GHG && renderDropdown('Calculations', 'calculation')}
        {renderDropdown('Show data by', 'breakBy')}
        {renderDropdown(null, 'chartType', icons, {
          variant: 'icons-labels',
          customTheme: 'icons-dropdown'
        })}
      </div>
      {renderChart()}
      <TabletPortraitOnly>
        <div className={styles.actionsContainer}>
          <div className={styles.buttonGroupContainer}>
            {renderButtonGroup()}
          </div>
          <ShareButton
            className={styles.shareButton}
            sharePath={'/ghg-emissions'}
          />
        </div>
      </TabletPortraitOnly>
      <ModalPngDownload chartParams={selectedOptions}>
        {renderPngChart()}
        {renderPngLegend()}
      </ModalPngDownload>
      <ModalShare analyticsName={'GHG Emissions'} />
      <ModalMetadata />
      <ModalDownload />
    </div>
  );
}

GhgEmissions.propTypes = {
  data: PropTypes.array,
  tableData: PropTypes.array,
  dataZoomData: PropTypes.array,
  titleLinks: PropTypes.array,
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
  handleDownloadModalOpen: PropTypes.func.isRequired,
  handlePngDownloadModal: PropTypes.func.isRequired,
  setYears: PropTypes.func.isRequired,
  setColumnWidth: PropTypes.func.isRequired,
  providerFilters: PropTypes.object,
  loading: PropTypes.bool,
  downloadLink: PropTypes.string,
  hideRemoveOptions: PropTypes.bool,
  dataZoomPosition: PropTypes.object,
  dataZoomYears: PropTypes.object,
  setDataZoomPosition: PropTypes.func.isRequired
};

export default GhgEmissions;
