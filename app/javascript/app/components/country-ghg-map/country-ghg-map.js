import { PureComponent, createElement } from 'react';
import { connect } from 'react-redux';
import isEqual from 'lodash/isEqual';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { compose, onlyUpdateForKeys } from 'recompose';

import mapActions from 'components/map/map-actions';
import CountryGhgMapComponent from './country-ghg-map-component';
import {
  getPathsWithStyles,
  getLegendData,
  getMapCenter
} from './country-ghg-map-selectors';

const data = { BRA: 1, SPA: 10, FRA: 3 };

const mapStateToProps = (state, { match }) => {
  const stateWithSelected = {
    countries: state.countries.data,
    selected: match.params.iso,
    data
  };
  return {
    legend: getLegendData(stateWithSelected),
    paths: getPathsWithStyles(stateWithSelected),
    center: getMapCenter(stateWithSelected)
  };
};

const defaultZoom = 4;
let forceUpdate = false;

class CountryGhgMapContainer extends PureComponent {
  componentDidMount() {
    const params = {
      zoom: defaultZoom,
      center: this.props.center
    };
    this.props.setMapParams(params);
  }

  componentWillReceiveProps(nextProps) {
    forceUpdate = !isEqual(nextProps.data, this.props.data);
  }

  componentDidUpdate() {
    const params = {
      zoom: defaultZoom,
      center: this.props.center
    };
    this.props.setMapParams(params);
  }

  componentWillUnmount() {
    this.props.setMapParams({ zoom: 1, center: [0, 20] });
  }

  render() {
    return createElement(CountryGhgMapComponent, {
      ...this.props,
      forceUpdate
    });
  }
}

CountryGhgMapContainer.propTypes = {
  data: PropTypes.array,
  center: PropTypes.array,
  setMapParams: PropTypes.func.isRequired
};

export { default as component } from './country-ghg-map-component';
export { default as styles } from './country-ghg-map-styles';

const enhance = compose(
  withRouter,
  connect(mapStateToProps, mapActions),
  onlyUpdateForKeys(['paths', 'center'])
);
export default enhance(CountryGhgMapContainer);
