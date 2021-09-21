import { PureComponent, createElement } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import qs from 'query-string';
import { handleAnalytics } from 'utils/analytics';
import { isCountryIncluded } from 'app/utils';
import { getLocationParamUpdated } from 'utils/navigation';
import { europeSlug, europeanCountries } from 'app/data/european-countries';

import { actions as fetchActions } from 'pages/ndcs-enhancements';
import { actions as modalActions } from 'components/modal-metadata';
import { actions as pngModalActions } from 'components/modal-png-download';

import Component from './ndcs-enhancements-viz-component';

import {
  sortIndicatorLegend,
  getIndicatorsParsed,
  getPathsWithStyles,
  getISOCountries,
  getLinkToDataExplorer,
  summarizeIndicators,
  getIsEnhancedChecked,
  getPreviousComparisonCountryValues,
  MAP_COLORS
} from './ndcs-enhancements-viz-selectors';

const actions = { ...fetchActions, ...modalActions, ...pngModalActions };

const mapStateToProps = (state, { location }) => {
  const { data, loading } = state.ndcsEnhancements;
  const { countries } = state;
  const search = qs.parse(location.search);
  const ndcsEnhancementsWithSelection = {
    ...state,
    ...data,
    countries: countries.data,
    query: search.search,
    search
  };
  return {
    loading,
    query: ndcsEnhancementsWithSelection.query,
    paths: getPathsWithStyles(ndcsEnhancementsWithSelection),
    countries: countries.data,
    checked: getIsEnhancedChecked(ndcsEnhancementsWithSelection),
    isoCountries: getISOCountries(ndcsEnhancementsWithSelection),
    indicator: sortIndicatorLegend(ndcsEnhancementsWithSelection),
    indicators: getIndicatorsParsed(ndcsEnhancementsWithSelection),
    summaryData: summarizeIndicators(ndcsEnhancementsWithSelection),
    downloadLink: getLinkToDataExplorer(ndcsEnhancementsWithSelection),
    previousComparisonCountryValues: getPreviousComparisonCountryValues(
      ndcsEnhancementsWithSelection
    ),
    mapColors: MAP_COLORS
  };
};

class NDCSEnhancementsVizContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      geometryIdHover: null,
      country: null
    };
  }

  componentWillMount() {
    this.props.fetchNDCSEnhancements();
  }

  getTooltipValues() {
    const { geometryIdHover } = this.state;
    const {
      indicator,
      indicators,
      previousComparisonCountryValues
    } = this.props;
    if (!geometryIdHover || !indicator) return null;

    const isEuropeanCountry = europeanCountries.includes(geometryIdHover);
    const id = isEuropeanCountry ? europeSlug : geometryIdHover;

    const statementIndicator = indicators.find(
      i => i.value === 'ndce_statement'
    );

    if (
      indicator.locations &&
      indicator.locations[id] &&
      indicator.locations[id].label_slug !== 'no_info_2020'
    ) {
      const statement =
        statementIndicator.locations[id] &&
        statementIndicator.locations[id].value;
      const indicatorLabelId = indicator.locations[id].label_id;
      const value =
        indicatorLabelId &&
        indicator.legendBuckets &&
        indicator.legendBuckets[indicatorLabelId] &&
        indicator.legendBuckets[indicatorLabelId].name;

      return {
        label: this.getTooltipLabel(),
        value,
        statement,
        note: 'Learn more in table below',
        indicators:
          previousComparisonCountryValues && previousComparisonCountryValues[id]
      };
    }
    return null;
  }

  getTooltipLabel() {
    const { geometryIdHover } = this.state;
    const { indicator, countries } = this.props;
    if (!geometryIdHover || !indicator) return '';
    if (europeanCountries.includes(geometryIdHover)) {
      return countries.find(c => c.iso_code3 === 'EUU').wri_standard_name;
    }
    const country = countries.find(c => c.iso_code3 === geometryIdHover);
    return country ? country.wri_standard_name : '';
  }

  handleSearchChange = query => {
    this.updateUrlParam({ name: 'search', value: query });
  };

  handleCountryClick = geography => {
    // Click action has been disabled for countries on this map per WRI request
    const { isoCountries } = this.props;
    const iso = geography.properties && geography.properties.id;
    if (iso && isCountryIncluded(isoCountries, iso)) {
      this.props.history.push(`/ndcs/country/${iso}`);
      handleAnalytics(
        'NDC Content Map',
        'Use map to find country',
        geography.properties.name
      );
    }
  };

  handleOnChangeChecked = query => {
    this.updateUrlParam({ name: 'showEnhancedAmbition', value: query });
  };

  handleCountryEnter = geography => {
    const iso = geography.properties && geography.properties.id;
    if (iso) this.setState({ geometryIdHover: iso });
    this.setState({ country: geography.properties });
  };

  handleSearchChange = query => {
    this.updateUrlParam({ name: 'search', value: query });
  };

  handleInfoClick = () => {
    this.props.setModalMetadata({
      category: 'NDC Content Map',
      slugs: '2020_NDC',
      open: true
    });
  };

  updateUrlParam(param, clear) {
    const { history, location } = this.props;
    history.replace(getLocationParamUpdated(location, param, clear));
  }

  handlePngDownloadModal = () => {
    const { setModalPngDownload } = this.props;
    setModalPngDownload({ open: true });
  };

  render() {
    const tooltipValues = this.getTooltipValues();
    const { query, indicator, checked, summaryData } = this.props;
    const noContentMsg = query
      ? 'No results found'
      : 'There is no data for this indicator';
    return createElement(Component, {
      ...this.props,
      tooltipValues,
      handleCountryClick: this.handleCountryClick,
      handleCountryEnter: this.handleCountryEnter,
      handleInfoClick: this.handleInfoClick,
      handleOnChangeChecked: this.handleOnChangeChecked,
      handlePngDownloadModal: this.handlePngDownloadModal,
      noContentMsg,
      handleSearchChange: this.handleSearchChange,
      checked,
      indicator,
      summaryData
    });
  }
}

NDCSEnhancementsVizContainer.propTypes = {
  history: PropTypes.object.isRequired,
  query: PropTypes.string,
  indicator: PropTypes.object,
  indicators: PropTypes.array,
  summaryData: PropTypes.object,
  checked: PropTypes.bool,
  location: PropTypes.object.isRequired,
  isoCountries: PropTypes.array.isRequired,
  countries: PropTypes.array,
  previousComparisonCountryValues: PropTypes.array,
  setModalMetadata: PropTypes.func.isRequired,
  setModalPngDownload: PropTypes.func.isRequired,
  fetchNDCSEnhancements: PropTypes.func.isRequired
};

export default withRouter(
  connect(mapStateToProps, actions)(NDCSEnhancementsVizContainer)
);
