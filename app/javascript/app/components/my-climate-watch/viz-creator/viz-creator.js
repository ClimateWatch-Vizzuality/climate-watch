import { Component, createElement } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toSelector } from './viz-creator-utils';
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
  chartDataSelector,
  getFormatFilters
} from './viz-creator-selectors';

const mapStateToProps = ({ vizCreator }) => ({
  id: vizCreator.id,
  title: vizCreator.title,
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
  chartData: chartDataSelector(vizCreator),
  filters: {
    locations: getFormatFilters('locations')(vizCreator),
    models: getFormatFilters('models')(vizCreator),
    scenarios: getFormatFilters('scenarios')(vizCreator),
    indicators: getFormatFilters('indicators')(vizCreator),
    categories: getFormatFilters('categories')(vizCreator),
    subcategories: getFormatFilters('subcategories')(vizCreator)
  }
});

class VizCreator extends Component {
  constructor(props) {
    super(props);
    props.fetchDatasets();
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
      fetchVisualisations,
      fetchLocations,
      fetchModels,
      fetchScenarios,
      fetchIndicators,
      fetchTimeseries
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
    if (locations.selected && !models.loading && !models.loaded) {
      fetchModels(locations.selected.value);
    }
    if (models.selected && !scenarios.loading && !scenarios.loaded) {
      fetchScenarios(models.selected.value);
    }
    if (scenarios.selected && !indicators.loading && !indicators.loaded) {
      fetchIndicators({
        location: locations.selected.value,
        scenarios: scenarios.selected
      });
    }
    if (indicators.selected && !timeseries.loading && !timeseries.loaded) {
      fetchTimeseries({
        locations: locations.selected.value,
        indicators: indicators.selected.value,
        scenarios: scenarios.selected
      });
    }
  }

  handleFilterSelect = filter => {
    const actionName = toSelector(filter.type);
    if (this.props[actionName]) {
      const filterParsed = filter.multi
        ? filter.values
        : {
          value: filter.value,
          label: filter.label
        };

      this.props[actionName](filterParsed);
    }
  };

  render() {
    return createElement(VizCreatorComponent, {
      ...this.props,
      handleFilterSelect: this.handleFilterSelect
    });
  }
}

VizCreator.propTypes = {
  fetchDatasets: PropTypes.func.isRequired,
  fetchVisualisations: PropTypes.func.isRequired,
  fetchLocations: PropTypes.func.isRequired,
  fetchModels: PropTypes.func.isRequired,
  fetchScenarios: PropTypes.func.isRequired,
  fetchIndicators: PropTypes.func.isRequired,
  fetchTimeseries: PropTypes.func.isRequired
};

export { actions, reducers, initialState };

export default connect(mapStateToProps, actions)(VizCreator);
