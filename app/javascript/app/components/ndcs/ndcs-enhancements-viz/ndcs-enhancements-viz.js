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

import Component from './ndcs-enhancements-viz-component';

import {
  getMapIndicator,
  getIndicatorsParsed,
  getPathsWithStyles,
  getISOCountries,
  getLinkToDataExplorer,
  summarizeIndicators,
  MAP_COLORS
} from './ndcs-enhancements-viz-selectors';

const actions = { ...fetchActions, ...modalActions };

const mapStateToProps = (state, { location }) => {
  const { data, loading } = state.ndcsEnhancements;
  const { countries } = state;
  const search = qs.parse(location.search);
  const ndcsEnhancementsWithSelection = {
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
    isoCountries: getISOCountries(ndcsEnhancementsWithSelection),
    indicator: getMapIndicator(ndcsEnhancementsWithSelection),
    indicators: getIndicatorsParsed(ndcsEnhancementsWithSelection),
    summaryData: summarizeIndicators(ndcsEnhancementsWithSelection),
    downloadLink: getLinkToDataExplorer(ndcsEnhancementsWithSelection),
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

  getTooltipText() {
    const { geometryIdHover } = this.state;
    const { indicator, indicators } = this.props;
    if (!geometryIdHover || !indicator) return '';

    const isEuropeanCountry = europeanCountries.includes(geometryIdHover);
    const id = isEuropeanCountry ? europeSlug : geometryIdHover;

    const dateIndicator = indicators.find(i => i.value === 'ndce_date');
    const statementIndicator = indicators.find(
      i => i.value === 'ndce_statement'
    );

    if (indicator.locations && indicator.locations[id]) {
      let tooltipTxt;
      switch (indicator.locations[id].label_slug) {
        case 'submitted_2020':
          tooltipTxt = `Submitted a 2020 NDC on ${dateIndicator.locations[id].value}.`;
          break;
        case 'no_info_2020':
          break;
        default:
          tooltipTxt = `${indicator.locations[id].value}\n\n${statementIndicator.locations[id].value}`;
          break;
      }
      return tooltipTxt ? `${tooltipTxt}\n\nLearn more in table below.` : '';
    }
    return '';
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
      customTitle: 'NDC Content',
      category: 'NDC Content Map',
      slugs: ['ndc_cw', 'ndc_wb', 'ndc_die'],
      open: true
    });
  };

  updateUrlParam(param, clear) {
    const { history, location } = this.props;
    history.replace(getLocationParamUpdated(location, param, clear));
  }

  render() {
    const tooltipTxt = this.getTooltipText();
    const tooltipLabel = this.getTooltipLabel();
    const { query } = this.props;
    const noContentMsg = query
      ? 'No results found'
      : 'There is no data for this indicator';
    return createElement(Component, {
      ...this.props,
      tooltipTxt,
      tooltipLabel,
      handleCountryClick: this.handleCountryClick,
      handleCountryEnter: this.handleCountryEnter,
      handleInfoClick: this.handleInfoClick,
      noContentMsg,
      handleSearchChange: this.handleSearchChange,
      indicator: this.props.indicator,
      countryData: this.state.country,
      summaryData: this.props.summaryData
    });
  }
}

NDCSEnhancementsVizContainer.propTypes = {
  history: PropTypes.object.isRequired,
  query: PropTypes.string.isRequired,
  indicator: PropTypes.object,
  indicators: PropTypes.array,
  summaryData: PropTypes.object,
  location: PropTypes.object.isRequired,
  isoCountries: PropTypes.array.isRequired,
  countries: PropTypes.array,
  setModalMetadata: PropTypes.func.isRequired,
  fetchNDCSEnhancements: PropTypes.func.isRequired
};

export default withRouter(
  connect(mapStateToProps, actions)(NDCSEnhancementsVizContainer)
);
