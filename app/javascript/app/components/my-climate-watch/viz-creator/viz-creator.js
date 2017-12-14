import { Component, createElement } from 'react';
import { connect } from 'react-redux';
import { get } from 'js-lenses';
import { assign } from 'utils';

import VizCreatorComponent from './viz-creator-component';
import reducers from './viz-creator-reducers';
import initialState from './viz-creator-initial-state';
import * as actions from './viz-creator-actions';

import {
  $visualisations,
  $locations,
  $models,
  $scenarios,
  $indicators,
  $categories,
  $subcategories,
  $timeseries
} from './viz-creator-lenses';

class VizCreator extends Component {
  componentWillReceiveProps(props) {
    this.current = props;
    // console.log(props);
  }

  render() {
    const {
      fetchDatasets, // eslint-disable-line
      selectDataset, // eslint-disable-line
      fetchVisualisations, // eslint-disable-line
      selectVisualisation, // eslint-disable-line
      fetchLocations, // eslint-disable-line
      selectLocation, // eslint-disable-line
      fetchModels, // eslint-disable-line
      selectModel, // eslint-disable-line
      fetchScenarios, // eslint-disable-line
      selectScenario, // eslint-disable-line
      fetchIndicators, // eslint-disable-line
      selectIndicator, // eslint-disable-line
      fetchCategories, // eslint-disable-line
      selectCategory, // eslint-disable-line
      fetchSubCategories, // eslint-disable-line
      selectSubCategory, // eslint-disable-line
      fetchTimeseries // eslint-disable-line
    } = this.props;

    const datasets = this.props;
    const visualisations = get($visualisations, datasets);
    const locations = get($locations, datasets);
    const models = get($models, datasets);
    const scenarios = get($scenarios, datasets);
    const indicators = get($indicators, datasets);
    const categories = get($categories, datasets);
    const subcategories = get($subcategories, datasets);
    const timeseries = get($timeseries, datasets);

    const hasData =
      datasets.selected &&
      visualisations.selected &&
      locations.selected &&
      models.selected &&
      scenarios.selected &&
      indicators.selected &&
      categories.selected &&
      subcategories.selected;

    return createElement(
      VizCreatorComponent,
      assign(this.props, {
        datasets,
        visualisations,
        locations,
        models,
        scenarios,
        indicators,
        categories,
        subcategories,
        timeseries,
        hasData
      })
    );
  }
}

const mapStateToProps = ({ vizCreator }) => vizCreator;

export { actions, reducers, initialState };

export default connect(mapStateToProps, actions)(VizCreator);
