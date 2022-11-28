import { useState, useEffect, createElement } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import qs from 'query-string';
import castArray from 'lodash/castArray';
import { handleAnalytics } from 'utils/analytics';
import { isCountryIncluded } from 'app/utils';
import { getLocationParamUpdated } from 'utils/navigation';
import { IGNORED_COUNTRIES_ISOS } from 'data/ignored-countries';
import { getHoverIndex } from 'components/ndcs/shared/utils';
import {
  NO_DOCUMENT_SUBMITTED_COUNTRIES,
  SWITCH_OPTIONS
} from 'components/ndcs/shared/constants';
import { actions as modalActions } from 'components/modal-metadata';
import { actions as pngModalActions } from 'components/modal-png-download';
import exploreMapActions from 'components/ndcs/shared/explore-map/explore-map-actions';
import { getIsShowEUCountriesChecked } from 'components/ndcs/shared/explore-map/explore-map-selectors';
import Component from './ndcs-explore-map-component';

import {
  getMapIndicator,
  getPathsWithStyles,
  getSelectedCountriesISO,
  getLinkToDataExplorer,
  getEmissionsCardData,
  getLegend,
  getSummaryCardData,
  getDocuments,
  getCategories,
  getCategoryIndicators,
  getSelectedDocument,
  getSelectedCategory,
  getTooltipCountryValues,
  getDonutActiveIndex,
  getPngSelectionSubtitle,
  getLocations,
  getSelectedLocations,
  getVulnerabilityData
} from './ndcs-explore-map-selectors';

const actions = { ...modalActions, ...exploreMapActions, ...pngModalActions };

const mapStateToProps = (state, { location }) => {
  const { data, loading } = state.ndcsExplore;
  const { countries } = state;
  const search = qs.parse(location.search);

  const ndcsExploreWithSelection = {
    ...state,
    ...data,
    countries: countries.data,
    query: search.search,
    categorySelected: search.category,
    indicatorSelected: search.indicator,
    emissions: state.emissions,
    search
  };

  return {
    loading,
    query: ndcsExploreWithSelection.query,
    selectedDocument: getSelectedDocument(ndcsExploreWithSelection),
    selectedCategory: getSelectedCategory(ndcsExploreWithSelection),
    selectedIndicator: getMapIndicator(ndcsExploreWithSelection),
    selectedLocations: getSelectedLocations(ndcsExploreWithSelection),
    documents: getDocuments(ndcsExploreWithSelection),
    categories: getCategories(ndcsExploreWithSelection),
    indicators: getCategoryIndicators(ndcsExploreWithSelection),
    paths: getPathsWithStyles(ndcsExploreWithSelection),
    isoCountries: getSelectedCountriesISO(ndcsExploreWithSelection),
    emissionsCardData: getEmissionsCardData(ndcsExploreWithSelection),
    tooltipCountryValues: getTooltipCountryValues(ndcsExploreWithSelection),
    legendData: getLegend(ndcsExploreWithSelection),
    summaryCardData: getSummaryCardData(ndcsExploreWithSelection),
    downloadLink: getLinkToDataExplorer(ndcsExploreWithSelection),
    donutActiveIndex: getDonutActiveIndex(ndcsExploreWithSelection),
    checked: getIsShowEUCountriesChecked(ndcsExploreWithSelection),
    pngSelectionSubtitle: getPngSelectionSubtitle(ndcsExploreWithSelection),
    locations: getLocations(ndcsExploreWithSelection),
    vulnerabilityData: getVulnerabilityData(ndcsExploreWithSelection)
  };
};
const pngDownloadId = 'ndcs-explore-map';

function NDCSExploreMapContainer(props) {
  const {
    setModalMetadata,
    selectedCategory,
    query,
    indicator,
    summaryData,
    selectActiveDonutIndex,
    checked
  } = props;
  const [country, setCountry] = useState(null);
  const [tooltipValues, setTooltipValues] = useState({});
  const [secondCardSelectedTab, setSecondCardSelectedTab] = useState(null);
  useEffect(() => {
    selectActiveDonutIndex(0);
  }, [selectActiveDonutIndex]);
  useEffect(() => {
    if (selectedCategory && selectedCategory.value === 'adaptation') {
      setSecondCardSelectedTab(SWITCH_OPTIONS[1].value);
    } else if (secondCardSelectedTab !== SWITCH_OPTIONS[0].value) {
      setSecondCardSelectedTab(SWITCH_OPTIONS[0].value);
    }
  }, [selectedCategory && selectedCategory.value]);

  const updateUrlParams = (params, clear) => {
    const { history, location } = props;
    history.replace(getLocationParamUpdated(location, params, clear));
  };

  const handleSearchChange = q => {
    updateUrlParams([{ name: 'search', value: q }]);
  };

  const handleCountryClick = (geography, countryData) => {
    const { isoCountries, history } = props;
    const { id: iso, name } = countryData || {};
    const countryIso =
      iso || (geography && geography.properties && geography.properties.id);

    if (
      countryIso &&
      !NO_DOCUMENT_SUBMITTED_COUNTRIES.some(c => c.iso === countryIso) &&
      isCountryIncluded(isoCountries, countryIso)
    ) {
      history.push(`/ndcs/country/${countryIso}`);
      handleAnalytics(
        'NDCS Explore Map',
        'Use map to find country',
        name || geography.properties.name
      );
    }
  };

  const handleCountryEnter = geography => {
    const { tooltipCountryValues, legendData, emissionsCardData } = props;
    const iso = geography.properties && geography.properties.id;

    if (IGNORED_COUNTRIES_ISOS.includes(iso)) {
      // We won't show Taiwan and Western Sahara as a independent countries
      setTooltipValues(null);
      setCountry(null);
    } else {
      const tooltipValue = tooltipCountryValues && tooltipCountryValues[iso];
      if (tooltipValue && tooltipValue.labelId) {
        const hoveredlegendData = legendData.find(
          l => parseInt(l.id, 10) === tooltipValue.labelId
        );
        if (hoveredlegendData) {
          selectActiveDonutIndex(
            getHoverIndex(emissionsCardData, hoveredlegendData)
          );
        }
      } else if (legendData) {
        // This is the last legend item aggregating all the no data geographies
        selectActiveDonutIndex(
          getHoverIndex(emissionsCardData, legendData[legendData.length - 1])
        );
      }

      setTooltipValues({
        value: (tooltipValue && tooltipValue.value) || 'Not Applicable',
        indicators: tooltipValue && tooltipValue.indicators,
        countryName: geography.properties && geography.properties.name
      });
      setCountry(geography.properties);
    }
  };

  const handleLocationsChange = filters => {
    const filtersArray = castArray(filters);
    const values = filtersArray.map(v => v.value);
    const resetToWorld = values[values.length - 1] === 'WORLD';
    const value = resetToWorld
      ? []
      : values.filter(v => v !== 'WORLD').join(',');
    updateUrlParams([
      {
        name: 'locations',
        value
      }
    ]);
  };

  const handleDropdownChange = (type, selection) => {
    const clearDependency = {
      document: ['category', 'indicator'],
      category: ['indicator']
    }[type];

    let params = [
      {
        name: type,
        value: selection.value
      }
    ];

    if (clearDependency) {
      params = params.concat(
        clearDependency.map(clearType => ({
          name: clearType,
          value: undefined
        }))
      );
    }

    updateUrlParams(params);
    handleAnalytics('NDCS Explore Map', `Change ${type}`, selection.label);
  };

  const handleInfoClick = () => {
    setModalMetadata({
      customTitle: 'Explore NDCs',
      category: 'NDCS Explore Map',
      slugs: [
        'ndc_cw',
        'ndc_wb',
        'ndc_die',
        'ndc_adaptation',
        'ndc_unicef',
        'ndc_finance'
      ],
      open: true
    });
  };

  const handleOnChangeChecked = q => {
    updateUrlParams([{ name: 'showEUCountries', value: q }]);
  };

  const handlePngDownloadModal = () => {
    const { setModalPngDownload } = props;
    setModalPngDownload({ open: pngDownloadId });
  };

  const noContentMsg = query
    ? 'No results found'
    : 'There is no data for this indicator';
  return createElement(Component, {
    ...props,
    pngDownloadId,
    handleCountryClick,
    handleCountryEnter,
    handleInfoClick,
    noContentMsg,
    handleSearchChange,
    handleDocumentChange: selection =>
      handleDropdownChange('document', selection),
    handleCategoryChange: selection =>
      handleDropdownChange('category', selection),
    handleIndicatorChange: selection =>
      handleDropdownChange('indicator', selection),
    handleOnChangeChecked,
    handleLocationsChange,
    handlePngDownloadModal,
    checked,
    indicator,
    summaryData,
    selectedCategory,
    countryData: country,
    tooltipValues,
    secondCardSelectedTab,
    setSecondCardSelectedTab
  });
}

NDCSExploreMapContainer.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  isoCountries: PropTypes.array.isRequired,
  setModalMetadata: PropTypes.func.isRequired,
  setModalPngDownload: PropTypes.func.isRequired,
  query: PropTypes.object,
  summaryData: PropTypes.array,
  selectedCategory: PropTypes.object,
  emissionsCardData: PropTypes.object,
  indicator: PropTypes.object,
  selectActiveDonutIndex: PropTypes.func.isRequired,
  legendData: PropTypes.array,
  checked: PropTypes.bool,
  tooltipCountryValues: PropTypes.object,
  secondCardSelectedTab: PropTypes.string,
  setSecondCardSelectedTab: PropTypes.string
};

export default withRouter(
  connect(mapStateToProps, actions)(NDCSExploreMapContainer)
);
