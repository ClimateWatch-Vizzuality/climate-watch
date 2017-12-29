import React from 'react';
import PropTypes from 'prop-types';
import _map from 'lodash/map';
import _isUndefined from 'lodash/isUndefined';
import _isEmpty from 'lodash/isEmpty';

import MultiSelect from 'components/multiselect';
import Dropdown from 'components/dropdown';

import { processLineData } from './viz-creator-utils';
import LineChart from './components/charts/line/line';
import SelectableList from './components/selectable-list';
import CardContent from './components/card-content';
import styles from './viz-creator-styles';

const Step1 = ({ datasets, selectDataset }) => (
  <li className={styles.step}>
    <h2 className={styles.stepTitle}>1/4 - Select a dataset</h2>
    <SelectableList
      type="dataset"
      data={datasets.data}
      selected={datasets.selected}
      onClick={selectDataset}
    >
      {d => <CardContent data={d} type="dataset" />}
    </SelectableList>
  </li>
);

Step1.propTypes = {
  datasets: PropTypes.shape({
    data: PropTypes.array.isRequired,
    selected: PropTypes.string
  }).isRequired,
  selectDataset: PropTypes.func.isRequired
};

const Step2 = ({ visualisations, selectVisualisation }) => (
  <li className={styles.step}>
    <h2 className={styles.stepTitle}>2/4 - Select what you want to compare</h2>
    {_map(visualisations.data, vs => [
      <h3 className={styles.stepSubTitle} key={vs.id}>
        {vs.name}
      </h3>,
      <SelectableList
        type="visualisation"
        data={vs.visualisations}
        selected={visualisations.selected}
        key={`v-${vs.id}`}
        onClick={selectVisualisation}
      >
        {d => <CardContent data={d} type="visualisation" />}
      </SelectableList>
    ])}
  </li>
);

Step2.propTypes = {
  visualisations: PropTypes.shape({
    data: PropTypes.array.isRequired,
    selected: PropTypes.string
  }).isRequired,
  selectVisualisation: PropTypes.func.isRequired
};

const Step3 = props => {
  const { spec } = props;
  const selectProps = (f, value) => {
    const dd = props[f.name];
    return {
      disabled: !_isUndefined(dd.active) || _isEmpty(dd.data),
      [value]:
        value === 'values' ? dd.selected.values || [] : dd.selected || {},
      options: dd.data || [],
      placeholder: dd.placeholder || dd.name
    };
  };

  return (
    <li className={styles.step}>
      <h2 className={styles.stepTitle}>3/4 - Filter the data</h2>
      {spec && (
        <ul className={styles.selectsContainer}>
          {_map(spec, f => {
            if (!props[f.name]) return null;
            return (
              <li key={f.name} className={styles.selectsItem}>
                {f.multi ? (
                  <MultiSelect
                    // log={console.log(selectProps(f, 'values'))}
                    {...selectProps(f, 'values')}
                    label={f.name}
                    onMultiValueChange={e =>
                      props.handleFilterSelect({
                        values: e,
                        type: f.name,
                        multi: true
                      })}
                  />
                ) : (
                  <Dropdown
                    {...selectProps(f, 'value')}
                    label={props[f.name].label}
                    onValueChange={e =>
                      props.handleFilterSelect({
                        ...e,
                        type: f.name
                      })}
                    hideResetButton
                  />
                )}
              </li>
            );
          })}
        </ul>
      )}
    </li>
  );
};

Step3.propTypes = {
  spec: PropTypes.object.isRequired
};

const VizCreator = props => {
  /* eslint-disable */
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
    fetchTimeseries,
    datasets,
    visualisations,
    locations,
    models,
    scenarios,
    indicators,
    categories,
    subcategories,
    timeseries,
    hasData,
    filters
  } = props;
  /* eslint-enable */

  return (
    <div>
      <div className={styles.container}>
        <ul className={styles.steps}>
          <Step1 {...{ datasets, selectDataset }} />
          {datasets.selected && (
            <Step2 {...{ visualisations, selectVisualisation }} />
          )}
          {visualisations.selected && (
            <Step3 {...{ spec: filters, ...props }} />
          )}
        </ul>
      </div>
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
};

export default VizCreator;
