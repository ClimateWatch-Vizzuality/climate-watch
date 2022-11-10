import { PureComponent, createElement } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import qs from 'query-string';
import { handleAnalytics } from 'utils/analytics';
import { isCountryIncluded } from 'app/utils';
import { getLocationParamUpdated } from 'utils/navigation';
import { IGNORED_COUNTRIES_ISOS } from 'data/ignored-countries';
import { getHoverIndex } from 'components/ndcs/shared/utils';
import { actions as modalActions } from 'components/modal-metadata';
import { actions as pngModalActions } from 'components/modal-png-download';
import exploreMapActions from 'components/ndcs/shared/explore-map/explore-map-actions';
import { getIsShowEUCountriesChecked } from 'components/ndcs/shared/explore-map/explore-map-selectors';
import Component from './ndcs-explore-map-component';

import {
  getMapIndicator,
  getPathsWithStyles,
  getISOCountries,
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
  getRegions
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
    documents: getDocuments(ndcsExploreWithSelection),
    categories: getCategories(ndcsExploreWithSelection),
    indicators: getCategoryIndicators(ndcsExploreWithSelection),
    paths: getPathsWithStyles(ndcsExploreWithSelection),
    isoCountries: getISOCountries(ndcsExploreWithSelection),
    emissionsCardData: getEmissionsCardData(ndcsExploreWithSelection),
    tooltipCountryValues: getTooltipCountryValues(ndcsExploreWithSelection),
    legendData: getLegend(ndcsExploreWithSelection),
    summaryCardData: getSummaryCardData(ndcsExploreWithSelection),
    downloadLink: getLinkToDataExplorer(ndcsExploreWithSelection),
    donutActiveIndex: getDonutActiveIndex(ndcsExploreWithSelection),
    checked: getIsShowEUCountriesChecked(ndcsExploreWithSelection),
    pngSelectionSubtitle: getPngSelectionSubtitle(ndcsExploreWithSelection),
    regions: getRegions(ndcsExploreWithSelection)
  };
};
const pngDownloadId = 'ndcs-explore-map';

class NDCSExploreMapContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      country: null,
      tooltipValues: {}
    };
  }

  handleSearchChange = query => {
    this.updateUrlParams([{ name: 'search', value: query }]);
  };

  handleCountryClick = (geography, countryData) => {
    const { isoCountries, history } = this.props;
    const { id: iso, name } = countryData || {};
    const countryIso =
      iso || (geography && geography.properties && geography.properties.id);
    if (countryIso && isCountryIncluded(isoCountries, countryIso)) {
      history.push(`/ndcs/country/${countryIso}`);
      handleAnalytics(
        'NDCS Explore Map',
        'Use map to find country',
        name || geography.properties.name
      );
    }
  };

  handleCountryEnter = geography => {
    const {
      tooltipCountryValues,
      legendData,
      selectActiveDonutIndex,
      emissionsCardData
    } = this.props;
    const iso = geography.properties && geography.properties.id;

    if (IGNORED_COUNTRIES_ISOS.includes(iso)) {
      // We won't show Taiwan and Western Sahara as an independent country
      this.setState({ tooltipValues: null, country: null });
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

      const tooltipValues = {
        value: (tooltipValue && tooltipValue.value) || 'Not Applicable',
        indicators: tooltipValue && tooltipValue.indicators,
        countryName: geography.properties && geography.properties.name
      };

      this.setState({ tooltipValues, country: geography.properties });
    }
  };

  handleSearchChange = query => {
    this.updateUrlParams([{ name: 'search', value: query }]);
  };

  handleDropdownChange = (type, selection) => {
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

    this.updateUrlParams(params);
    handleAnalytics('NDCS Explore Map', `Change ${type}`, selection.label);
  };

  handleInfoClick = () => {
    this.props.setModalMetadata({
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

  handleOnChangeChecked = query => {
    this.updateUrlParams([{ name: 'showEUCountries', value: query }]);
  };

  updateUrlParams(params, clear) {
    const { history, location } = this.props;
    history.replace(getLocationParamUpdated(location, params, clear));
  }

  handlePngDownloadModal = () => {
    const { setModalPngDownload } = this.props;
    setModalPngDownload({ open: pngDownloadId });
  };

  render() {
    const {
      query,
      indicator,
      summaryData,
      selectedCategory,
      checked
    } = this.props;
    const { country: countryData, tooltipValues } = this.state;
    const noContentMsg = query
      ? 'No results found'
      : 'There is no data for this indicator';
    return createElement(Component, {
      ...this.props,
      pngDownloadId,
      handleCountryClick: this.handleCountryClick,
      handleCountryEnter: this.handleCountryEnter,
      handleInfoClick: this.handleInfoClick,
      noContentMsg,
      handleSearchChange: this.handleSearchChange,
      handleDocumentChange: selection =>
        this.handleDropdownChange('document', selection),
      handleCategoryChange: selection =>
        this.handleDropdownChange('category', selection),
      handleIndicatorChange: selection =>
        this.handleDropdownChange('indicator', selection),
      handleOnChangeChecked: this.handleOnChangeChecked,
      handlePngDownloadModal: this.handlePngDownloadModal,
      checked,
      indicator,
      summaryData,
      selectedCategory,
      countryData,
      tooltipValues
    });
  }
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
  tooltipCountryValues: PropTypes.object
};

export default withRouter(
  connect(mapStateToProps, actions)(NDCSExploreMapContainer)
);
