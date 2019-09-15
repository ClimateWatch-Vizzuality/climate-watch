import { PureComponent, createElement } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import qs from 'query-string';
import { handleAnalytics } from 'utils/analytics';
import { isCountryIncluded } from 'app/utils';
import { getLocationParamUpdated } from 'utils/navigation';

import { actions as fetchActions } from 'pages/ndcs-lts';
import { actions as modalActions } from 'components/modal-metadata';

import Component from './ndcs-lts-viz-component';

import {
  getMapIndicator,
  getIndicatorsParsed,
  getPathsWithStyles,
  getISOCountries,
  getLinkToDataExplorer,
  summarizeIndicators,
  MAP_COLORS
} from './ndcs-lts-viz-selectors';

const actions = { ...fetchActions, ...modalActions };

const mapStateToProps = (state, { location }) => {
  const { data, loading } = state.ndcsLTS;
  const { countries } = state;
  const search = qs.parse(location.search);
  const ndcsLTSWithSelection = {
    ...data,
    countries: countries.data,
    query: search.search,
    search
  };
  return {
    loading,
    query: ndcsLTSWithSelection.query,
    paths: getPathsWithStyles(ndcsLTSWithSelection),
    isoCountries: getISOCountries(ndcsLTSWithSelection),
    indicator: getMapIndicator(ndcsLTSWithSelection),
    indicators: getIndicatorsParsed(ndcsLTSWithSelection),
    summaryData: summarizeIndicators(ndcsLTSWithSelection),
    downloadLink: getLinkToDataExplorer(ndcsLTSWithSelection),
    mapColors: MAP_COLORS
  };
};

class NDCSLTSVizContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      geometryIdHover: null,
      country: null
    };
  }

  componentWillMount() {
    this.props.fetchNDCSLTS();
  }

  getTooltipText() {
    const { geometryIdHover } = this.state;
    const { indicator, indicators } = this.props;
    if (!geometryIdHover || !indicator) return '';

    const id = geometryIdHover;

    const targetIndicator = indicators.find(
      indicator => indicator.value == 'lts_target'
    );

    if (
      indicator.locations &&
      indicator.locations[id] &&
      indicator.locations[id].value === 'Long-term Strategy Submitted'
    ) {
      return "Long-term Target: <em>"+targetIndicator.locations[id].value+"</em>";
    }
    return '';
  }

  handleSearchChange = query => {
    this.updateUrlParam({ name: 'search', value: query });
  };

  handleCountryClick = geography => {
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
    const { query } = this.props;
    const noContentMsg = query
      ? 'No results found'
      : 'There is no data for this indicator';
    return createElement(Component, {
      ...this.props,
      tooltipTxt,
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

NDCSLTSVizContainer.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  isoCountries: PropTypes.array.isRequired,
  setModalMetadata: PropTypes.func.isRequired,
  fetchNDCSLTS: PropTypes.func.isRequired
};

export default withRouter(
  connect(mapStateToProps, actions)(NDCSLTSVizContainer)
);
