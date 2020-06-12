import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { getLocationParamUpdated } from 'utils/navigation';
import { handleAnalytics } from 'utils/analytics';
import qs from 'query-string';
import castArray from 'lodash/castArray';
import kebabCase from 'lodash/kebabCase';
import { actions as modalActions } from 'components/modal-metadata';
import { actions as pngModalActions } from 'components/modal-png-download';
import { encodeAsCSVContent, invokeCSVDownload } from 'utils/csv';
import { orderByColumns, stripHTML } from 'utils';
import { GHG_TABLE_HEADER } from 'data/constants';
import GhgEmissionsComponent from './ghg-emissions-component';
import { getGHGEmissions } from './ghg-emissions-selectors/ghg-emissions-selectors';

const mapStateToProps = (state, props) => {
  const { location } = props;
  const search = location && location.search && qs.parse(location.search);
  return getGHGEmissions(state, { ...props, search });
};

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
    dataZoomYears
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
  useEffect(() => {
    if (!data) {
      return undefined;
    }
    if (dataZoomYears) {
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

  useEffect(() => {
    const { sourceSelected } = selected;
    if (!(search && search.source) && sourceSelected) {
      updateUrlParam({
        name: 'source',
        value: sourceSelected.name
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
        .map(v => kebabCase(v.label))
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
      const slugs = `historical_emissions_${source}`;
      setModalMetadata({
        category: 'Historical Emissions',
        slugs,
        open: true
      });
    }
  };

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

  const handlePngDownloadModal = () => {
    const { setModalPngDownload } = props;
    setModalPngDownload({ open: true });
  };

  const setColumnWidth = column => {
    if (column === GHG_TABLE_HEADER[fieldToBreakBy]) return 300;
    return 200;
  };

  return (
    <GhgEmissionsComponent
      {...props}
      data={updatedData}
      updateUrlParam={updateUrlParam}
      handleChange={handleChange}
      handleInfoClick={handleInfoClick}
      handleDownloadDataClick={handleDownloadDataClick}
      handlePngDownloadModal={handlePngDownloadModal}
      setColumnWidth={setColumnWidth}
      setYears={handleSetYears}
      dataZoomPosition={dataZoomPosition}
      dataZoomYears={dataZoomYears}
      setDataZoomPosition={setDataZoomPosition}
    />
  );
}

GhgEmissionsContainer.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  setModalMetadata: PropTypes.func.isRequired,
  setYears: PropTypes.func.isRequired,
  dataZoomYears: PropTypes.object,
  selected: PropTypes.object,
  legendSelected: PropTypes.array,
  fieldToBreakBy: PropTypes.string,
  tableData: PropTypes.array,
  data: PropTypes.array,
  search: PropTypes.object
};

GhgEmissionsContainer.defaultProps = {
  selected: undefined,
  search: undefined
};

export default withRouter(
  connect(mapStateToProps, { ...modalActions, ...pngModalActions })(
    GhgEmissionsContainer
  )
);
