import { createElement, useEffect, useState } from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  getLocationParamUpdated,
  isPageContained,
  isEmbededComponent,
  isPageNdcp
} from 'utils/navigation';
import { usePrevious } from 'utils';
import qs from 'query-string';
import { handleAnalytics } from 'utils/analytics';
import { actions as modalActions } from 'components/modal-metadata';
import { actions as pngModalActions } from 'components/modal-png-download';
import ownActions from './country-ghg-emissions-actions';
import reducers, { initialState } from './country-ghg-emissions-reducers';

import CountryGhgEmissionsComponent from './country-ghg-emissions-component';
import {
  getCountryName,
  getSourceOptions,
  getCalculationOptions,
  getSourceSelected,
  getCalculationSelected,
  getChartData,
  getChartDomain,
  getChartConfig,
  getSelectorDefaults,
  getQuantificationsData,
  getQuantificationsTagsConfig,
  getFilterOptions,
  getFiltersSelected,
  getDownloadLink,
  getPngSelectionSubtitle,
  getDataZoomYears,
  getDataZoomData
} from './country-ghg-emissions-selectors';

const actions = { ...ownActions, ...modalActions, ...pngModalActions };

const mapStateToProps = (state, { location, match }) => {
  const { data, quantifications } = state.countryGhgEmissions;
  const calculationData = state.wbCountryData.data;
  const { meta } = state.ghgEmissionsMeta;
  const isEmbed = isEmbededComponent(location);
  const isNdcp = isPageNdcp(location) || isPageContained;
  const search = qs.parse(location.search);
  const iso = match.params.iso;
  const countryGhg = {
    iso,
    meta,
    data,
    countries: state.countries,
    calculationData,
    search,
    quantifications
  };
  return {
    iso,
    isEmbed,
    isNdcp,
    countryName: getCountryName(countryGhg),
    loading: state.countryGhgEmissions.loading || state.wbCountryData.loading,
    data: getChartData(countryGhg),
    domain: getChartDomain(countryGhg),
    quantifications: getQuantificationsData(countryGhg),
    quantificationsTagsConfig: getQuantificationsTagsConfig(countryGhg),
    calculations: getCalculationOptions(countryGhg),
    calculationSelected: getCalculationSelected(countryGhg),
    sources: getSourceOptions(countryGhg),
    sourceSelected: getSourceSelected(countryGhg),
    filtersOptions: getFilterOptions(countryGhg),
    filtersSelected: getFiltersSelected(countryGhg),
    config: getChartConfig(countryGhg),
    pngSelectionSubtitle: getPngSelectionSubtitle(countryGhg),
    selectorDefaults: getSelectorDefaults(countryGhg),
    downloadLink: getDownloadLink(countryGhg),
    dataZoomYears: getDataZoomYears(countryGhg),
    dataZoomData: getDataZoomData(countryGhg)
  };
};

const pngDownloadId = 'country-ghg-emissions';

function CountryGhgEmissionsContainer(props) {
  const {
    fetchCountryGhgEmissionsData,
    sourceSelected: { source },
    setModalMetadata,
    location: { search },
    setModalPngDownload,
    history,
    location,
    iso,
    sourceSelected,
    data,
    dataZoomYears,
    selectorDefaults
  } = props;

  useEffect(() => {
    if (sourceSelected.value) {
      const filters = {
        location: iso,
        gas: selectorDefaults && selectorDefaults.gas,
        source: sourceSelected.value || null
      };
      fetchCountryGhgEmissionsData(filters);
    }
  }, [iso, sourceSelected]);

  // Data Zoom Logic

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

  const updateUrlParam = (params, clear) => {
    history.replace(getLocationParamUpdated(location, params, clear));
  };

  const handleInfoClick = () => {
    if (source) {
      setModalMetadata({
        category: 'Country',
        slugs: isPageContained ? [source] : [source, 'ndc_quantification_UNDP'],
        customTitle: 'Greenhouse Gas Emissions and Emissions Targets',
        disclaimerConfig: {
          display: !isPageContained,
          onlyText: true
        },
        open: true
      });
    }
  };

  const handleAnalyticsClick = () => {
    handleAnalytics('Country', 'Leave page to explore data', 'Ghg emissions');
  };

  const handleSourceChange = category => {
    const searchQuery = qs.parse(search);
    if (category) {
      updateUrlParam(
        [
          {
            name: 'source',
            value: category.name
          },
          { name: 'sector', value: searchQuery.sector },
          { name: 'calculation', value: searchQuery.calculation }
        ],
        true
      );
      handleAnalytics('Country', 'Change Emissions source', category.label);
    }
  };

  const handleCalculationChange = calculation => {
    if (calculation) {
      updateUrlParam({ name: 'calculation', value: calculation.value });
    }
  };

  const handlePngDownloadModal = () => {
    setModalPngDownload({ open: pngDownloadId });
  };

  return createElement(CountryGhgEmissionsComponent, {
    ...props,
    pngDownloadId,
    handleSourceChange,
    handleCalculationChange,
    handleInfoClick,
    handleAnalyticsClick,
    handlePngDownloadModal,
    dataZoomYears,
    setYears: handleSetYears,
    setDataZoomPosition,
    dataZoomPosition,
    data: updatedData
  });
}

CountryGhgEmissionsContainer.propTypes = {
  history: Proptypes.object,
  location: Proptypes.object,
  sourceSelected: Proptypes.object,
  setModalMetadata: Proptypes.func,
  setModalPngDownload: Proptypes.func,
  fetchCountryGhgEmissionsData: Proptypes.func
};

export { actions, reducers, initialState };

export default withRouter(
  connect(mapStateToProps, actions)(CountryGhgEmissionsContainer)
);
