import { PureComponent, createElement } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import qs from 'query-string';
import { format } from 'd3-format';
import { isCountryIncluded } from 'app/utils';
import { handleAnalytics } from 'utils/analytics';
import { countriesContexts } from './context-by-indicator-selectors';

import Component from './context-by-indicator-component';

const mapStateToProps = (state, { location, countries }) => {
  const search = qs.parse(location.search);
  const cc = { ...state, search, countries };
  return {
    ...countriesContexts(cc)
  };
};

class ContextByIndicatorContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      geometryIdHover: null,
      country: null
    };
  }

  // eslint-disable-next-line react/sort-comp
  indicatorValueFormat = (value, unit) => {
    if (!value) return 'No Data';
    if (unit === '%' || !unit) return `${Math.round(value * 10) / 10} %`;
    return `${format(',.2s')(value)} ${unit}`;
  };

  getTooltipText() {
    const { geometryIdHover } = this.state;
    const { mapData, selectedIndicator } = this.props;
    if (!geometryIdHover || !mapData || !selectedIndicator) return '';

    const countryData = mapData.find(c => c.iso === geometryIdHover);

    return (
      countryData &&
      this.indicatorValueFormat(countryData.value, selectedIndicator.unit)
    );
  }

  handleCountryEnter = geography => {
    const iso = geography.properties && geography.properties.id;
    if (iso) this.setState({ geometryIdHover: iso });
    this.setState({ country: geography.properties });
  };

  handleCountryClick = geography => {
    const { isoCountries, history } = this.props;
    const iso = geography.properties && geography.properties.id;
    if (iso && isCountryIncluded(isoCountries, iso)) {
      history.push(`/countries/${iso}`);
      handleAnalytics(
        'Agriculture Profile - Countries Context',
        'Use map to find country',
        geography.properties.name
      );
    }
  };

  render() {
    const tooltipTxt = this.getTooltipText();
    return createElement(Component, {
      ...this.props,
      tooltipTxt,
      handleCountryEnter: this.handleCountryEnter,
      handleCountryClick: this.handleCountryClick,
      countryData: this.state.country
    });
  }
}

ContextByIndicatorContainer.propTypes = {
  selectedIndicator: PropTypes.shape({}),
  mapData: PropTypes.arrayOf(PropTypes.shape({})),
  isoCountries: PropTypes.arrayOf(PropTypes.string),
  history: PropTypes.shape({})
};

export default withRouter(
  connect(mapStateToProps, null)(ContextByIndicatorContainer)
);
