import { Component, createElement } from 'react';
import { connect } from 'react-redux';

import VizCreatorComponent from './viz-creator-component';
import reducers from './viz-creator-reducers';
import initialState from './viz-creator-initial-state';
import * as actions from './viz-creator-actions';

import {
  datasetsSelector,
  visualisationsSelector,
  locationsSelector,
  modelsSelector,
  scenariosSelector,
  indicatorsSelector,
  categoriesSelector,
  subcategoriesSelector,
  timeseriesSelector,
  hasDataSelector,
  filtersSelector,
  getFormatFilters
} from './viz-creator-selectors';

const mapStateToProps = ({ vizCreator }) => ({
  ...vizCreator,
  datasets: datasetsSelector(vizCreator),
  visualisations: visualisationsSelector(vizCreator),
  locations: locationsSelector(vizCreator),
  models: modelsSelector(vizCreator),
  scenarios: scenariosSelector(vizCreator),
  indicators: indicatorsSelector(vizCreator),
  categories: categoriesSelector(vizCreator),
  subcategories: subcategoriesSelector(vizCreator),
  timeseries: timeseriesSelector(vizCreator),
  hasData: hasDataSelector(vizCreator),
  filters: {
    locations: getFormatFilters('locations')(vizCreator),
    models: getFormatFilters('models')(vizCreator),
    scenarios: getFormatFilters('scenarios')(vizCreator),
    indicators: getFormatFilters('indicators')(vizCreator),
    categories: getFormatFilters('categories')(vizCreator),
    subcategories: getFormatFilters('subcategories')(vizCreator),
    timeseries: getFormatFilters('timeseries')(vizCreator)
  }
});

class VizCreator extends Component {
  constructor(props) {
    super(props);
    props.fetchDatasets(); // eslint-disable-line
  }

  componentWillReceiveProps(props) {
    const {
      datasets, // eslint-disable-line
      visualisations, // eslint-disable-line
      locations, // eslint-disable-line
      models, // eslint-disable-line
      scenarios, // eslint-disable-line
      indicators, // eslint-disable-line
      categories, // eslint-disable-line
      subcategories, // eslint-disable-line
      timeseries // eslint-disable-line
    } = props;

    const {
      fetchVisualisations, // eslint-disable-line
      fetchLocations // eslint-disable-line
    } = props;

    if (
      datasets.selected &&
      !visualisations.loading &&
      !visualisations.loaded
    ) {
      fetchVisualisations(datasets.selected);
    }
    if (visualisations.selected && !locations.loading && !locations.loaded) {
      fetchLocations(visualisations.selected);
    }
  }

  render() {
    return createElement(VizCreatorComponent, this.props);
  }
}

export { actions, reducers, initialState };

export default connect(mapStateToProps, actions)(VizCreator);
