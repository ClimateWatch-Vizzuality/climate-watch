import { PureComponent, createElement } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import qs from 'query-string';
import { handleAnalytics } from 'utils/analytics';
import { isCountryIncluded } from 'app/utils';
import { getLocationParamUpdated } from 'utils/navigation';
import { europeSlug, europeanCountries } from 'app/data/european-countries';

import { actions as modalActions } from 'components/modal-metadata';
import { actions as pngModalActions } from 'components/modal-png-download';

import Component from './ndcs-enhancements-2025-map-component';

import {
  sortIndicatorLegend,
  getIndicatorsParsed,
  getPathsWithStyles,
  getISOCountries,
  getPreviousComparisonCountryValues,
  getCompareLinks,
  getCountries,
  getMetadata,
  MAP_COLORS
} from './ndcs-enhancements-2025-map-selectors';

const actions = { ...modalActions, ...pngModalActions };

const mapStateToProps = (state, { location }) => {
  const search = qs.parse(location.search);
  const ndcsEnhancementsWithSelection = {
    ...state,
    query: search.search,
    search
  };

  return {
    loading: state.ndcs && state.ndcs.loading,
    query: ndcsEnhancementsWithSelection.query,
    paths: getPathsWithStyles(ndcsEnhancementsWithSelection),
    countries: getCountries(ndcsEnhancementsWithSelection),
    isoCountries: getISOCountries(ndcsEnhancementsWithSelection),
    compareLink: getCompareLinks(ndcsEnhancementsWithSelection),
    indicator: sortIndicatorLegend(ndcsEnhancementsWithSelection),
    indicators: getIndicatorsParsed(ndcsEnhancementsWithSelection),
    compareLinks: getCompareLinks(ndcsEnhancementsWithSelection),
    previousComparisonCountryValues: getPreviousComparisonCountryValues(
      ndcsEnhancementsWithSelection
    ),
    metadata: getMetadata(ndcsEnhancementsWithSelection),
    mapColors: MAP_COLORS
  };
};

const pngDownloadId = 'ndcs-enhancements-map';

class NDCSEnhancements2025MapContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      geometryIdHover: null,
      country: null
    };
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
      i => i.value === '2025_statement'
    );

    if (
      indicator.locations &&
      indicator.locations[id] &&
      indicator.locations[id].label_slug !== 'no_info_2025'
    ) {
      const statement =
        statementIndicator &&
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
        note:
          'Click on the country or see table below to compare with previous NDC',
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
    const { isoCountries, history, compareLinks } = this.props;

    const iso = geography.properties && geography.properties.id;
    if (iso && isCountryIncluded(isoCountries, iso)) {
      history.push(compareLinks[iso].link);
      handleAnalytics(
        '2025 NDC Enhancements Map',
        'Use link to compare enhancements',
        geography.properties.name
      );
    }
  };

  handleCountryEnter = geography => {
    const iso = geography.properties && geography.properties.id;
    if (iso) this.setState({ geometryIdHover: iso });
    this.setState({ country: geography.properties });
  };

  handleSearchChange = query => {
    this.updateUrlParam({ name: 'search', value: query });
  };

  updateUrlParam(param, clear) {
    const { history, location } = this.props;
    history.replace(getLocationParamUpdated(location, param, clear));
  }

  render() {
    const tooltipValues = this.getTooltipValues();
    const { query, indicator } = this.props;
    const noContentMsg = query
      ? 'No results found'
      : 'There is no data for this indicator';
    return createElement(Component, {
      ...this.props,
      tooltipValues,
      pngDownloadId,
      handleCountryClick: this.handleCountryClick,
      handleCountryEnter: this.handleCountryEnter,
      noContentMsg,
      handleSearchChange: this.handleSearchChange,
      indicator
    });
  }
}

NDCSEnhancements2025MapContainer.propTypes = {
  history: PropTypes.object.isRequired,
  query: PropTypes.string,
  indicator: PropTypes.object,
  indicators: PropTypes.array,
  location: PropTypes.object.isRequired,
  isoCountries: PropTypes.array.isRequired,
  compareLinks: PropTypes.object,
  countries: PropTypes.array,
  previousComparisonCountryValues: PropTypes.object
};

export default withRouter(
  connect(mapStateToProps, actions)(NDCSEnhancements2025MapContainer)
);
