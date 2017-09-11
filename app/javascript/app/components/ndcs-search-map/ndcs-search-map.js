import { PureComponent, createElement } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import paths from 'app/data/world-50m-paths';

import Component from './ndcs-search-map-component';
import { getCountriesIncluded } from './ndcs-search-map-selectors';

const mapStateToProps = state => {
  const { ndcSearch } = state;

  return {
    paths,
    countriesIncluded: getCountriesIncluded(ndcSearch)
  };
};

const countryStyles = {
  default: {
    fill: '#b1b1c1',
    fillOpacity: 0.3,
    stroke: '#ffffff',
    strokeWidth: 0.3,
    outline: 'none'
  },
  hover: {
    fill: '#25597c',
    stroke: '#ffffff',
    strokeWidth: 0.3,
    outline: 'none'
  },
  pressed: {
    fill: '#b1b1c1',
    stroke: '#ffffff',
    strokeWidth: 0.3,
    outline: 'none'
  }
};

class NDCSearchMapContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      geometryIdHover: null
    };
  }

  computedStyles = geography => {
    const { countriesIncluded } = this.props;
    const isCountryIncluded = countriesIncluded.includes(geography.id);

    if (isCountryIncluded) {
      const color = '#25597c';
      return {
        ...countryStyles,
        default: {
          ...countryStyles.default,
          fill: color,
          fillOpacity: 0.9
        },
        hover: {
          ...countryStyles.hover,
          fill: color,
          fillOpacity: 1
        }
      };
    }
    return countryStyles;
  };

  handleCountryClick = geography => {
    this.props.history.push(`/ndcs/country/${geography.id}`);
  };

  render() {
    return createElement(Component, {
      ...this.props,
      computedStyles: this.computedStyles,
      handleCountryClick: this.handleCountryClick
    });
  }
}

NDCSearchMapContainer.propTypes = {
  history: PropTypes.object.isRequired,
  countriesIncluded: PropTypes.array.isRequired
};

export default withRouter(connect(mapStateToProps)(NDCSearchMapContainer));
