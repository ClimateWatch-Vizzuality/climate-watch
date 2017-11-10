import { PureComponent, createElement } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import qs from 'query-string';
import { getLocationParamUpdated } from 'utils/navigation';

import { actions as modalActions } from 'components/modal-metadata';

import EmissionPathwayGraphComponent from './emission-pathway-graph-component';
import {
  getChartData,
  getChartConfig,
  getLocationsOptions,
  getLocationSelected,
  getScenarioSelected
} from './emission-pathway-graph-selectors';

const actions = { ...modalActions };

const mapStateToProps = (state, { location }) => {
  const { data } = state.espTimeSeries;
  const { currentLocation, scenario } = qs.parse(location.search);
  const espData = {
    locations: state.espLocations.data,
    data,
    location: currentLocation,
    scenario
  };
  return {
    data: getChartData(espData),
    config: getChartConfig(espData),
    locationsOptions: getLocationsOptions(espData),
    locationSelected: getLocationSelected(espData),
    scenarioSelected: getScenarioSelected(espData),
    loading: state.espTimeSeries.loading || state.espLocations.loading
  };
};

class EmissionPathwayGraphContainer extends PureComponent {
  handleLocationChange = location => {
    this.updateUrlParam(
      { name: 'currentLocation', value: location.value },
      true
    );
  };

  updateUrlParam(params, clear) {
    const { history, location } = this.props;
    history.replace(getLocationParamUpdated(location, params, clear));
  }

  handleRemoveTag = tagData => {
    const { filtersSelected } = this.props;
    const newFilters = [];
    filtersSelected.forEach(filter => {
      if (filter.label !== tagData.label) {
        newFilters.push(filter.value);
      }
    });
    this.updateUrlParam({ name: 'filter', value: newFilters.toString() });
  };

  handleInfoClick = () => {
    const { source } = this.props.sourceSelected;
    if (source) {
      this.props.setModalMetadata({
        slug: source,
        open: true
      });
    }
  };

  render() {
    return createElement(EmissionPathwayGraphComponent, {
      ...this.props,
      handleLocationChange: this.handleLocationChange
    });
  }
}

EmissionPathwayGraphContainer.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  sourceSelected: PropTypes.object,
  setModalMetadata: PropTypes.func.isRequired,
  filtersSelected: PropTypes.array
};

EmissionPathwayGraphContainer.defaultProps = {
  sourceSelected: null
};

export default withRouter(
  connect(mapStateToProps, actions)(EmissionPathwayGraphContainer)
);
