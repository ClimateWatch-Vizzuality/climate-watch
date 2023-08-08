import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { getLocationParamUpdated } from 'utils/navigation';
import { handleAnalytics } from 'utils/analytics';
import qs from 'query-string';
import castArray from 'lodash/castArray';
import { actions as modalActions } from 'components/modal-metadata';
import { actions as pngModalActions } from 'components/modal-png-download';
import { actions as downloadModalActions } from 'components/modal-download';

import { getStorageWithExpiration } from 'utils/localStorage';
import { encodeAsCSVContent, invokeCSVDownload } from 'utils/csv';
import { orderByColumns, stripHTML, useSlug, usePrevious } from 'utils';
import { GHG_TABLE_HEADER } from 'data/constants';
import GhgEmissionsComponent from './ghg-emissions-component';
import { getGHGEmissions } from './ghg-emissions-selectors/ghg-emissions-selectors';

const mapStateToProps = (state, props) => {
  const { location } = props;
  const search = location && location.search && qs.parse(location.search);
  return getGHGEmissions(state, { ...props, search });
};

const pngDownloadId = 'ghg-emissions';

function GhgEmissionsContainer(props) {
  const {
    search,
    selected,
    setModalMetadata,
    history,
    location,
    fieldToBreakBy,
    tableData,
    data,
    dataZoomYears,
    setModalDownloadParams,
    pngSelectionSubtitle
  } = props;

  const handleSetYears = years => {
    const { min, max } = years || {};
    updateUrlParam([
      {
        name: 'start_year',
        value: min
      },
      {
        name: 'end_year',
        value: max
      }
    ]);
  };

  // Data Zoom Logic

  const [updatedData, setUpdatedData] = useState(data);
  const DATA_ZOOM_START_POSITION = {
    min: 0,
    max: 0
  };
  const [dataZoomPosition, setDataZoomPosition] = useState(
    DATA_ZOOM_START_POSITION
  );

  // Filter data with dataZoomYears
  useEffect(() => {
    if (!data) {
      return undefined;
    }
    if (dataZoomYears.min && dataZoomYears.max) {
      setUpdatedData(
        data.filter(
          d =>
            (!dataZoomYears.min || d.x >= dataZoomYears.min) &&
            (!dataZoomYears.max || d.x <= dataZoomYears.max)
        )
      );
    } else {
      setUpdatedData(data);
    }
    return undefined;
  }, [dataZoomYears, data]);

  const previousData = usePrevious(data);

  // Set data limit years on URL when we don't have any years selected or reset when we change the data (source)
  useEffect(() => {
    const hasDataChanged =
      (!previousData && data) ||
      (data && data.length) !== (previousData && previousData.length);

    if (
      hasDataChanged &&
      data &&
      data.length &&
      (!dataZoomYears.min || !dataZoomYears.max)
    ) {
      const firstDataYear = data[0].x;
      const lastDataYear = data[data.length - 1].x;

      handleSetYears({ min: firstDataYear, max: lastDataYear });
    }

    return undefined;
  }, [dataZoomYears, data]);

  useEffect(() => {
    const { sourcesSelected } = selected;
    if (!(search && search.source) && sourcesSelected) {
      updateUrlParam({
        name: 'source',
        value: sourcesSelected.name
      });
    }
  }, []);

  const handleSourcesChange = category => {
    updateUrlParam([
      {
        name: 'source',
        value: category.name
      },
      { name: 'sectors', value: null },
      { name: 'gases', value: null },
      {
        name: 'start_year',
        value: undefined
      },
      {
        name: 'end_year',
        value: undefined
      }
    ]);
    setDataZoomPosition(DATA_ZOOM_START_POSITION);
    handleAnalytics('Historical Emissions', 'Source selected', category.label);
  };

  const handleBreakByChange = breakBy => {
    updateUrlParam({ name: 'breakBy', value: breakBy.value });
    handleAnalytics('Historical Emissions', 'Break by selected', breakBy.label);
  };

  const handleCalculationChange = calculation => {
    updateUrlParam({ name: 'calculation', value: calculation.value });
    handleAnalytics(
      'Historical Emissions',
      'Calculation selected',
      calculation.label
    );
  };

  const handleChartTypeChange = type => {
    updateUrlParam({ name: 'chartType', value: type.value });
    handleAnalytics('Chart Type', 'Chart type selected', type.label);
  };

  const handleRegionsChange = filters => {
    const filtersArray = castArray(filters);
    updateUrlParam({
      name: 'regions',
      value: filtersArray.map(v => v.value).join(',')
    });

    sendToAnalitics('regions', filtersArray);
  };

  const sendToAnalitics = (field, filters) => {
    const selectedFilterLabels = filters.map(f => f.label);
    if (selectedFilterLabels.length > 0) {
      handleAnalytics(
        'Historical Emissions',
        'Filter by',
        `${field}: ${selectedFilterLabels.toString()}`
      );
    }
  };

  const handleFilterChange = (field, filters) => {
    updateUrlParam({
      name: [field],
      value: castArray(filters)
        .map(v => useSlug(v.label))
        .join(',')
    });
    sendToAnalitics(field, filters);
  };

  const handleChange = (field, optionSelected) => {
    if (['sectors', 'gases'].includes(field)) {
      return handleFilterChange(field, optionSelected);
    }
    const changeFunctions = {
      regions: handleRegionsChange,
      sources: handleSourcesChange,
      breakBy: handleBreakByChange,
      calculation: handleCalculationChange,
      chartType: handleChartTypeChange
    };
    return changeFunctions[field](optionSelected);
  };

  const updateUrlParam = (params, clear) => {
    history.replace(getLocationParamUpdated(location, params, clear));
  };

  const handleInfoClick = () => {
    let { label: source } = selected.sourcesSelected || {};
    if (source) {
      if (source.startsWith('UNFCCC')) source = 'UNFCCC';
      const slugs = `historical_emissions_${source.replace(' ', '_')}`;
      setModalMetadata({
        category: 'Historical Emissions',
        slugs,
        open: true
      });
    }
  };

  const createCSVContent = () => {
    const defaultColumnOrder = [
      'iso',
      GHG_TABLE_HEADER[fieldToBreakBy],
      'unit'
    ];
    const stripHtmlFromUnit = d => ({ ...d, unit: stripHTML(d.unit) });
    const parsedTableData = tableData.map(stripHtmlFromUnit);
    const encodeParam = param =>
      param &&
      castArray(param)
        .map(r => r.label)
        .join(', ');
    const {
      sourcesSelected,
      regionsSelected,
      sectorsSelected,
      gasesSelected,
      calculationSelected,
      breakBySelected
    } = selected;
    const filterSelectionLabels = `Location: ${encodeParam(
      regionsSelected
    )}. Sectors/Subsectors: ${encodeParam(
      sectorsSelected
    )}. Gases: ${encodeParam(gasesSelected)}. Calculation: ${encodeParam(
      calculationSelected
    )}. Show data by ${encodeParam(breakBySelected)}`;
    const metadata = {
      'Data source': selected && sourcesSelected.label,
      'Data for': filterSelectionLabels
    };

    const csvContentEncoded = encodeAsCSVContent(
      parsedTableData,
      orderByColumns(defaultColumnOrder),
      metadata
    );
    return csvContentEncoded;
  };

  const handlePngDownloadModal = () => {
    const { setModalPngDownload } = props;
    setModalPngDownload({ open: pngDownloadId });
  };

  const setColumnWidth = column => {
    if (column === GHG_TABLE_HEADER[fieldToBreakBy]) return 300;
    return 200;
  };

  const handleDownloadModalOpen = () => {
    const hasCompletedSurvey = getStorageWithExpiration('userSurvey');
    const downloadAction = () => {
      handleAnalytics('GHG emissions', 'Download Data', 'Download Chart Data');
      invokeCSVDownload(createCSVContent());
    };

    if (hasCompletedSurvey) {
      downloadAction();
    } else {
      setModalDownloadParams({ open: true, downloadAction });
    }
  };

  return (
    <GhgEmissionsComponent
      {...props}
      data={updatedData}
      updateUrlParam={updateUrlParam}
      handleChange={handleChange}
      handleInfoClick={handleInfoClick}
      handlePngDownloadModal={handlePngDownloadModal}
      setColumnWidth={setColumnWidth}
      setYears={handleSetYears}
      dataZoomPosition={dataZoomPosition}
      dataZoomYears={dataZoomYears}
      pngSelectionSubtitle={pngSelectionSubtitle}
      setDataZoomPosition={setDataZoomPosition}
      handleDownloadModalOpen={handleDownloadModalOpen}
      pngDownloadId={pngDownloadId}
    />
  );
}

GhgEmissionsContainer.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  setModalMetadata: PropTypes.func.isRequired,
  setYears: PropTypes.func.isRequired,
  setModalDownloadParams: PropTypes.func.isRequired,
  dataZoomYears: PropTypes.object,
  selected: PropTypes.object,
  legendSelected: PropTypes.array,
  fieldToBreakBy: PropTypes.string,
  pngSelectionSubtitle: PropTypes.string,
  tableData: PropTypes.array,
  data: PropTypes.array,
  search: PropTypes.object
};

GhgEmissionsContainer.defaultProps = {
  selected: undefined,
  search: undefined
};

export default withRouter(
  connect(mapStateToProps, {
    ...modalActions,
    ...downloadModalActions,
    ...pngModalActions
  })(GhgEmissionsContainer)
);
