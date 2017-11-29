import React from 'react';
import isUndefined from 'lodash/isUndefined';
import isEmpty from 'lodash/isEmpty';
import reduce from 'lodash/reduce';
import find from 'lodash/find';
import map from 'lodash/map';
import LineChart from 'components/charts/line';

import MultiSelect from 'components/multiselect';
import Dropdown from 'components/dropdown';
import SelectableList from './components/selectable-list';
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

const pickChart = (charType, data) => {
  console.log(data);
  /*
    id: 145791,
    indicator_id: 573,
    location_id: 10,
    model_id: 3,
    scenario_id: 37,
    unit_of_entry: "EJ/yr",
    value: "0.0",
    year: 2005
  */
  const conf = {
    axes: {
      xBottom: {
        name: 'Year',
        unit: 'date',
        format: 'YYYY'
      },
      yLeft: {
        name: 'Emissions',
        unit: 'CO<sub>2</sub>e',
        format: 'number'
      }
    },
    theme: {
      yAllGhg: {
        stroke: '#2D9290',
        fill: '#2D9290'
      },
      yCo2: {
        stroke: '#B25BD0',
        fill: '#B25BD0'
      },
      yCh4: {
        stroke: '#7EA759',
        fill: '#7EA759'
      },
      yN2O: {
        stroke: '#FF0D3A',
        fill: '#FF0D3A'
      },
      yFGas: {
        stroke: '#687AB7',
        fill: '#687AB7'
      }
    },
    tooltip: {
      yAllGhg: {
        label: 'All GHG'
      },
      yCo2: {
        label: 'CO2'
      },
      yCh4: {
        label: 'CH4'
      },
      yN2O: {
        label: 'N2O'
      },
      yFGas: {
        label: 'F-Gas'
      }
    },
    columns: {
      x: [
        {
          label: 'year',
          value: 'x'
        }
      ],
      y: [
        {
          label: 'All GHG',
          value: 'yAllGhg'
        },
        {
          label: 'CO2',
          value: 'yCo2'
        },
        {
          label: 'CH4',
          value: 'yCh4'
        },
        {
          label: 'N2O',
          value: 'yN2O'
        },
        {
          label: 'F-Gas',
          value: 'yFGas'
        }
      ]
    }
  };
  const config = {
    axes: {
      xBottom: {
        name: 'Year',
        unit: 'date',
        format: 'YYYY'
      },
      yLeft: {
        name: 'Emissions',
        unit: 'CO<sub>2</sub>e',
        format: 'number'
      }
    },
    theme: {
      year: {
        stroke: '#2D9290',
        fill: '#2D9290'
      },
      value: {
        stroke: '#2D9290',
        fill: '#2D9290'
      }
    },
    tooltip: {
      year: {
        label: 'All GHG'
      },
      value: {
        label: 'CO2'
      }
    },
    columns: {
      x: [{ label: 'year', value: 'year' }],
      y: [{
        label: 'Value',
        value: 'value'
      }]
    }
  };

  switch (charType) {
    // case 'LineChart':
    // return !isEmpty(data) ? (<LineChart config={config} data={data} height={500} />) : null;

    default:
      console.log(data);
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
      {pickChart(charType, timeseries)}
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
