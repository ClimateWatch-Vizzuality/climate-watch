import React, { Component, createElement } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import qs from 'query-string';

import Loading from 'components/loading';

import mapActions from 'components/map/map-actions';
import ghgMapActions from './country-ghg-map-actions';

import CountryGhgMapComponent from './country-ghg-map-component';
import {
  getPathsWithStyles,
  getLegendData,
  getMapCenter,
  getSourceSelected,
  getDefaultValues,
  getYearSelected,
  getMapReady
} from './country-ghg-map-selectors';

const actions = {
  ...mapActions,
  ...ghgMapActions
};

const mapStateToProps = (state, { location, match, year }) => {
  const { data } = state.countryGhgEmissionsMap;
  const { meta } = state.ghgEmissionsMeta;
  const { data: countries } = state.countries;
  const search = qs.parse(location.search);
  const stateWithSelected = {
    countries,
    data,
    meta,
    search,
    iso: match.params.iso,
    year
  };

  return {
    iso: match.params.iso,
    ready: getMapReady(state.countryGhgEmissionsMap),
    yearSelected: getYearSelected(stateWithSelected),
    sourceSelected: getSourceSelected(stateWithSelected),
    defaultValues: getDefaultValues(stateWithSelected),
    legend: getLegendData(stateWithSelected),
    paths: getPathsWithStyles(stateWithSelected),
    center: getMapCenter(stateWithSelected)
  };
};

const defaultZoom = 4;

class CountryGhgMapContainer extends Component {
  componentDidMount() {
    const { center, setMapParams } = this.props;
    const params = {
      center,
      zoom: defaultZoom
    };
    setMapParams(params);
    this.fetchData(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.sourceSelected !== this.props.sourceSelected) {
      this.fetchData(nextProps);
    }
  }

  componentDidUpdate(prevProps) {
    const params = {
      zoom: defaultZoom,
      center: this.props.center
    };
    if (prevProps.center !== this.props.center) {
      this.props.setMapParams(params);
    }
  }

  fetchData = props => {
    const { sourceSelected, fetchGhgEmissionsMapData, defaultValues } = props;
    if (sourceSelected && sourceSelected.value) {
      fetchGhgEmissionsMapData({
        source: sourceSelected.value,
        gas: defaultValues.gas,
        sector: defaultValues.sector
      });
    }
  };

  render() {
    if (!this.props.ready) return <Loading light />;

    return createElement(CountryGhgMapComponent, {
      ...this.props
    });
  }
}

CountryGhgMapContainer.propTypes = {
  ready: PropTypes.bool,
  center: PropTypes.array,
  defaultValues: PropTypes.object,
  sourceSelected: PropTypes.object,
  setMapParams: PropTypes.func.isRequired,
  fetchGhgEmissionsMapData: PropTypes.func.isRequired
};

export { default as component } from './country-ghg-map-component';
export { default as styles } from './country-ghg-map-styles';
export { initialState } from './country-ghg-map-reducers';
export { default as reducers } from './country-ghg-map-reducers';
export { default as actions } from './country-ghg-map-actions';

export default withRouter(
  connect(mapStateToProps, actions)(CountryGhgMapContainer)
);
