import React from 'react';
import isUndefined from 'lodash/isUndefined';
import isEmpty from 'lodash/isEmpty';
import reduce from 'lodash/reduce';
import find from 'lodash/find';
import map from 'lodash/map';

import MultiSelect from 'components/multiselect';
import Dropdown from 'components/dropdown';
import SelectableList from './components/selectable-list';
import LineChart from './components/charts/line';
import styles from './viz-creator-styles';

const Step1 = ({ datasets, dataset, selectDataset }) => (
  <li className={styles.step}>
    <h1>1/4 - Select a dataset</h1>
    <SelectableList
      type="dataset"
      data={datasets.data}
      selected={dataset}
      onClick={selectDataset}
    >
      {d => d.name}
    </SelectableList>
  </li>
);

const Step2 = ({ visualisations, visualisation, selectViz }) => (
  <li className={styles.step}>
    <h1>2/4 - Select what you want to compare</h1>
    {map(visualisations, vs => [
      <h2 key={vs.id}>{vs.name}</h2>,
      <SelectableList
        type="visualisation"
        data={vs.visualisations}
        selected={visualisation}
        key={`v-${vs.id}`}
        onClick={selectViz}
      >
        {d => d.name}
      </SelectableList>
    ])}
  </li>
);

const Step3 = ({ selectors, filters, selectFilter }) => {
  const selectProps = (f, value) => ({
    disabled: (!isUndefined(filters[f.name].active) && filters[f.name].active) || isEmpty(filters[f.name].data),
    [value]: filters[f.name].selected,
    options: filters[f.name].data,
    placeholder: filters[f.name].placeholder
  });

  return (
    <li className={styles.step}>
      <h1>3/4 - Filter the data</h1>
      {selectors && (
        <ul>
          {selectors.map(f => (
            <li key={f.name}>
              {filters[f.name] && f.multi ? (
                <MultiSelect
                  {...selectProps(f, 'values')}
                  label={f.name}
                  onMultiValueChange={e =>
                    selectFilter({
                      values: e,
                      type: f.name
                    })}
                />
              ) : (
                filters[f.name] && (
                  <Dropdown
                    {...selectProps(f, 'value')}
                    label={filters[f.name].label}
                    onValueChange={
                      e => selectFilter({
                        ...e,
                        type: f.name
                      })}
                    hideResetButton
                  />
                )
              )}
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

const pickChart = (charType, config) => {
  switch (charType) {
    case 'LineChart':
      return <LineChart {...config} />;

    default:
      // console.log(data);
      return false;
  }
};

const Step4 = ({ filters, visualisations, visualisation, timeseries }) => {
  const allViz = reduce(visualisations, (r, v) => r.concat(v.visualisations), []);
  const selectedVisualisation = visualisations && find(allViz, { id: visualisation });
  const charType = selectedVisualisation && selectedVisualisation.chart.type;
  return (
    <li className={styles.step}>
      <h1>4/4 - Annotate the visualisation</h1>
      {!isEmpty(timeseries.data) && pickChart(charType, timeseries.data)}
    </li>
  );
};

const VizCreator = ({
  datasets,
  selectDataset,
  dataset,
  visualisations,
  selectViz,
  visualisation,
  filters,
  selectors,
  selectFilter,
  categories,
  timeseries
}) => (
  <div className={styles.container}>
    <ul className={styles.steps}>
      <Step1 {...{ datasets, dataset, selectDataset }} />
      <Step2 {...{ visualisations, visualisation, selectViz }} />
      <Step3 {...{ selectors, filters, selectFilter }} />
      <Step4 {...{ filters, visualisations, visualisation, timeseries }} />
    </ul>
  </div>
);

export default VizCreator;
