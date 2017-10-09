import { Component, createElement } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import qs from 'query-string';
import isEqual from 'lodash/isEqual';

import mapActions from 'components/map/map-actions';
import ghgMapActions from './country-ghg-map-actions';

import CountryGhgMapComponent from './country-ghg-map-component';
import {
  getPathsWithStyles,
  getLegendData,
  getMapCenter,
  getSourceSelected,
  getDefaultValues,
  getYearSelected
} from './country-ghg-map-selectors';

const actions = {
  ...mapActions,
  ...ghgMapActions
};

const mapStateToProps = (state, { location, match }) => {
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
    year: search.year
  };

  return {
    iso: match.params.iso,
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
  constructor() {
    super();
    this.state = { forceUpdate: false };
  }

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
    this.state.forceUpdate = !isEqual(nextProps.paths, this.props.paths);
  }

  componentDidUpdate(prevProps) {
    const params = {
      zoom: defaultZoom,
      center: this.props.center
    };
    if (prevProps.center !== this.props.center) {
      this.props.setMapParams(params);
    }
    if (this.state.forceUpdate) {
      // Not a good practice but I want to force a rerender
      // because setting the map cache improve performance a lot!
      this.setState({ forceUpdate: false }); // eslint-disable-line
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
    return createElement(CountryGhgMapComponent, {
      ...this.props,
      forceUpdate: this.state.forceUpdate
    });
  }
}

CountryGhgMapContainer.propTypes = {
  center: PropTypes.array,
  paths: PropTypes.array.isRequired,
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
