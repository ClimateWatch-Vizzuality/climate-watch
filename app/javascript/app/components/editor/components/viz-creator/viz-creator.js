import { Component, createElement } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import isArray from 'lodash/isArray';
import initialState from './viz-creator-initial-state';
import * as actions from './viz-creator-actions';
import reducers from './viz-creator-reducers';

import VizCreatorComponent from './viz-creator-component';
import {
  vizSelector,
  filtersSelector,
  getFormatFilters,
  subcategoriesSelector,
  timeseriesSelector
} from './viz-creator-selectors';

const empty = o => Object.keys(o || {}).length > 0;

class VizCreator extends Component {
  static propTypes = {
    fetchDatasets: PropTypes.func.isRequired,
    filters: PropTypes.object.isRequired,
    fetchLocations: PropTypes.func.isRequired,
    fetchTimeseries: PropTypes.func.isRequired,
    timeseries: PropTypes.object.isRequired,
    fetchIndicators: PropTypes.func.isRequired,
    fetchTopEmmiters: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    props.fetchDatasets();
    props.fetchLocations();
    props.fetchTopEmmiters();
  }

  componentWillReceiveProps(props) {
    this.loadFilter('locations', 'models', 'fetchModels', props);
    this.loadFilter('models', 'scenarios', 'fetchScenarios', props);
    this.loadIndicators(props);

    // if (props.filters.indicators.selected && (!props.timeseries.loading && isEmpty(props.timeseries.data))) {
    //   props.fetchTimeseries(props.filters);
    // }
  }

  loadIndicators(props) {
    const location = props.filters.locations.selected;
    const scenarios = props.filters.scenarios.selected;
    const indicators = props.filters.indicators;

    const prevLocation = this.props.filters.locations
      && this.props.filters.locations.selected && this.props.filters.locations.selected.value;
    const prevScenario = this.props.filters.scenarios
      && this.props.filters.scenarios.selected && this.props.filters.scenarios.selected.value;
    const prevIndicator = this.props.filters.indicators
      && this.props.filters.indicators.selected && this.props.filters.indicators.selected.value;

    const curLocation = location && location.selected && location.selected.value;
    const curScenario = scenarios && scenarios.selected && scenarios.selected.value;
    const curIndicator = indicators && indicators.selected && indicators.selected.value;

    if (
      location && !isEmpty(scenarios) &&
      (
        (indicators && isEmpty(indicators.data) && !indicators.loading)
        || (curIndicator !== prevIndicator)
      )
    ) {
      this.props.fetchIndicators({ location, scenarios });
    }
  }

  loadFilter(dep, key, load, props) {
    const dependency = props.filters[dep].selected;
    const dependencyId = dependency && dependency.value;
    const prevDep = this.props.filters[dep].selected;
    const prevDepId = prevDep && prevDep.value;
    const resource = props.filters[key];

    if (
      (dependency && !isEmpty(dependency) && !resource.loading && isEmpty(resource.data)) ||
      (dependency && !isEmpty(dependency) && dependencyId !== prevDepId)
    ) {
      props[load](isArray(dependency) ? dependency.map(d => d.value).join(',') : dependency.value);
    }
  }

  render() {
    return createElement(VizCreatorComponent, this.props);
  }
}

const mapStateToProps = ({ vizCreator }) => ({
  ...vizCreator,
  visualisations: vizSelector(vizCreator),
  selectors: filtersSelector(vizCreator),
  timeseries: {
    ...vizCreator.timeseries,
    data: timeseriesSelector(vizCreator)
  },
  filters: {
    locations: getFormatFilters('locations')(vizCreator),
    models: getFormatFilters('models')(vizCreator),
    scenarios: getFormatFilters('scenarios')(vizCreator),
    categories: getFormatFilters('categories')(vizCreator),
    subcategories: getFormatFilters('subcategories')({
      ...vizCreator,
      filters: {
        ...vizCreator.filters,
        subcategories: {
          ...vizCreator.filters.subcategories,
          data: subcategoriesSelector(vizCreator)
        }
      }
    }),
    indicators: getFormatFilters('indicators')({
      ...vizCreator,
      filters: {
        indicators: {
          ...vizCreator.filters.indicators,
          active: (
            !empty(vizCreator.filters.categories.selected) ||
            !empty(vizCreator.filters.subcategories.selected)
          )
        }
      }
    })
  }
});

export { actions, reducers, initialState };

export default connect(mapStateToProps, actions)(VizCreator);
