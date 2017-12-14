/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import startCase from 'lodash/startCase';
import _ from 'lodash-inflection';
import { format } from 'd3-format';
import { get } from 'js-lenses';

import reducers from './viz-creator-reducers';
import initialState from './viz-creator-initial-state';
import * as actions from './viz-creator-actions';
import { selections } from './viz-creator-mocks';
import LineChart from './components/charts/line/line';
import {
  groupDataByScenario,
  pickByKey,
  mergeLineProps,
  getLineProps,
  COLORS
} from './components/charts/line/utils';

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

const toFetcher = name => `fetch${_.pluralize(startCase(name))}`;
const toSelector = name => `select${_.singularize(startCase(name))}`;

const Option = ({
  enableLoad,
  enableSelect,
  onClickLoad,
  onClickSelect,
  name
}) => (
  <li>
    {enableLoad && (
      <button disabled={!enableLoad} onClick={onClickLoad}>
        {toFetcher(name)}
      </button>
    )}
    {enableSelect && (
      <button disabled={!enableSelect} onClick={onClickSelect}>
        {toSelector(name)}
      </button>
    )}
  </li>
);

const processLineData = (idc, scn) => {
  const data = groupDataByScenario(idc, scn);
  const lineData = pickByKey('value', data);

  const lineProps = mergeLineProps(
    {
      type: 'monotone',
      dot: false
    },
    getLineProps(data, COLORS)
  );

  const lines = Object.keys(lineData[0]).slice(1);
  const axis = {
    x: {
      props: {
        dataKey: 'year',
        tick: { stroke: '#8f8fa1', strokeWidth: 0.5, fontSize: '13px' },
        padding: { left: 15, right: 20 },
        tickSize: 8
      }
    },
    y: {
      props: {
        axisLine: false,
        tickFormatter: tick => `${format('.2s')(tick)}t`,
        tickLine: false,
        tick: { stroke: '#8f8fa1', strokeWidth: 0.5, fontSize: '13px' },
        domain: ['auto', 'auto']
      }
    }
  };

  const margin = { top: 20, right: 0, left: -10, bottom: 0 };

  const config = {
    data: lineData,
    margin
  };

  const cartesianGrid = {
    vertical: false
  };

  return {
    config,
    lineProps,
    lines,
    axis,
    cartesianGrid
  };
};

class VizCreator extends Component {
  componentWillReceiveProps(props) {
    this.current = props;
    // console.log(props);
  }

  render() {
    const {
      fetchDatasets,
      selectDataset,
      fetchVisualisations,
      selectVisualisation,
      fetchLocations,
      selectLocation,
      fetchModels,
      selectModel,
      fetchScenarios,
      selectScenario,
      fetchIndicators,
      selectIndicator,
      fetchCategories,
      selectCategory,
      fetchSubCategories,
      selectSubCategory,
      fetchTimeseries
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

    window.state = datasets;

    const hasData =
      datasets.selected &&
      visualisations.selected &&
      locations.selected &&
      models.selected &&
      scenarios.selected &&
      indicators.selected &&
      categories.selected &&
      subcategories.selected;

    return (
      <div>
        <ul style={{ listStyle: 'none' }}>
          <Option
            name="dataset"
            enableLoad
            enableSelect={datasets.loaded}
            onClickLoad={fetchDatasets}
            onClickSelect={() => selectDataset(selections.datasets.value)}
          />
          <Option
            name="visualisations"
            enableLoad={datasets.selected}
            enableSelect={visualisations.loaded}
            onClickLoad={() => fetchVisualisations(datasets.selected)}
            onClickSelect={() =>
              selectVisualisation(selections.visualisations.value)}
          />
          <Option
            name="locations"
            enableLoad={visualisations.selected}
            enableSelect={locations.loaded}
            onClickLoad={() => fetchLocations(visualisations.selected)}
            onClickSelect={() => selectLocation(selections.locations.value)}
          />
          <Option
            name="models"
            enableLoad={locations.selected}
            enableSelect={models.loaded}
            onClickLoad={() => fetchModels(locations.selected)}
            onClickSelect={() => selectModel(selections.models.value)}
          />
          <Option
            name="scenarios"
            enableLoad={models.selected}
            enableSelect={scenarios.loaded}
            onClickLoad={() => fetchScenarios(models.selected)}
            onClickSelect={() => selectScenario(selections.scenarios)}
          />
          <Option
            name="categories"
            enableLoad={indicators.loaded}
            enableSelect={indicators.loaded}
            onClickLoad={() =>
              fetchIndicators({
                location: { value: locations.selected },
                scenarios: scenarios.selected
              })}
            onClickSelect={() => selectCategory(selections.categories.value)}
          />
          <Option
            name="subcategories"
            enableLoad={indicators.loaded}
            enableSelect={categories.selected}
            onClickLoad={() =>
              fetchIndicators({
                location: { value: locations.selected },
                scenarios: scenarios.selected
              })}
            onClickSelect={() =>
              selectSubCategory(selections.subcategories.value)}
          />
          <Option
            name="indicators"
            enableLoad={scenarios.selected}
            enableSelect={subcategories.selected}
            onClickLoad={() =>
              fetchIndicators({
                location: { value: locations.selected },
                scenarios: scenarios.selected
              })}
            onClickSelect={() => selectIndicator(selections.indicators)}
          />
        </ul>
        {hasData && (
          <button
            onClick={() =>
              fetchTimeseries({
                locations: locations.selected,
                indicators: indicators.selected.value,
                scenarios: scenarios.selected
              })}
          >
            fetchTimeseries
          </button>
        )}
        {timeseries.loaded && (
          <LineChart {...processLineData(timeseries.data, scenarios.data)} />
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ vizCreator }) => vizCreator;

export { actions, reducers, initialState };

export default connect(mapStateToProps, actions)(VizCreator);
