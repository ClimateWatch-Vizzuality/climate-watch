import { Component, createElement } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';

import initialState from './viz-creator-initial-state';
import * as actions from './viz-creator-actions';
import reducers from './viz-creator-reducers';

import VizCreatorComponent from './viz-creator-component';
import {
  vizSelector,
  filtersSelector,
  getFormatFilters,
  subcategoriesSelector
} from './viz-creator-selectors';

class VizCreator extends Component {
  static propTypes = {
    fetchDatasets: PropTypes.func.isRequired,
    fetchLocations: PropTypes.func.isRequired,
    fetchIndicators: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    props.fetchDatasets();
    props.fetchLocations();
  }

  componentWillReceiveProps(props) {
    this.loadFilter('locations', 'models', 'fetchModels', props);
    this.loadFilter('models', 'scenarios', 'fetchScenarios', props);
    this.loadCategories(props);
  }

  loadCategories(props) {
    const location = props.filters.locations.selected;
    const scenarios = props.filters.scenarios.selected;
    const indicators = props.filters.indicators;
    if (
      location &&
      !isEmpty(scenarios) &&
      (indicators && isEmpty(indicators.data) && !indicators.loading)
    ) {
      this.props.fetchIndicators({ location, scenarios });
    }
  }

  loadFilter(dep, key, load, props) {
    const dependency = props.filters[dep].selected;
    const dependencyId = dependency && dependency.value;
    const prevLocation = this.props.filters[dep];
    const prevLocationId = prevLocation.selected && prevLocation.selected.value;

    if (
      (dependency &&
        !props.filters[key].loading &&
        isEmpty(props.filters[key].data)) ||
      (dependency && dependencyId !== prevLocationId)
    ) {
      props[load](dependency.value);
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
  filters: {
    indicators: getFormatFilters('indicators')(vizCreator),
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
    })
  }
});

export { actions, reducers, initialState };

export default connect(mapStateToProps, actions)(VizCreator);
