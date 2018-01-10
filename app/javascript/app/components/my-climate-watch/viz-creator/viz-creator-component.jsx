import React from 'react';
import PropTypes from 'prop-types';
import _map from 'lodash/map';
import _isUndefined from 'lodash/isUndefined';
import _isEmpty from 'lodash/isEmpty';

import MultiSelect from 'components/multiselect';
import Dropdown from 'components/dropdown';
import Search from 'components/search';
import Button from 'components/button';
import inputTextTheme from 'styles/themes/search/input-text.scss';

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
  const selectProps = (f, format) => {
    let value = f.selected;
    if (!value) {
      value = f.multi ? [] : {};
    }
    const disabled = _isUndefined(f.disabled) ? _isEmpty(f.data) : f.disabled;
    return {
      disabled,
      [format]: value,
      options: (f.data || []).map(d => ({ ...d, label: d.label || '' })),
      placeholder: f.placeholder || f.name,
      loading: f.loading
    };
  };

  const { spec, handleFilterSelect } = props;
  return (
    <li className={styles.step}>
      <h2 className={styles.stepTitle}>3/4 - Filter the data</h2>
      {spec && (
        <ul className={styles.selectsContainer}>
          {_map(spec, (f, i) => {
            if (!f.data) return null;
            return (
              <li key={f.name || i} className={styles.selectsItem}>
                {f.multi ? (
                  <MultiSelect
                    {...selectProps(f, 'values')}
                    label={f.name}
                    onMultiValueChange={e =>
                      handleFilterSelect({
                        values: e,
                        type: f.name,
                        multi: f.multi
                      })}
                  />
                ) : (
                  <Dropdown
                    {...selectProps(f, 'value')}
                    label={f.label}
                    onValueChange={e =>
                      handleFilterSelect({
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
  spec: PropTypes.object.isRequired,
  handleFilterSelect: PropTypes.func.isRequired
};

const Step4 = props => {
  const { id, title, chartData, onNameChange, onSaveClick } = props;
  return (
    <li className={styles.step}>
      <h2 className={styles.stepTitle}>4/4 - Annotate the visualisation</h2>
      <Search
        icon={false}
        placeholder=""
        value={title}
        onChange={onNameChange}
        className={styles.inputText}
        theme={inputTextTheme}
      />
      <LineChart {...chartData} width="90%" />
      <div className={styles.saveContainer}>
        <Button
          color="yellow"
          onClick={() => onSaveClick({ id })}
          className={styles.saveBtn}
        >
          Save
        </Button>
      </div>
    </li>
  );
};

Step4.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  chartData: PropTypes.object.isRequired,
  onSaveClick: PropTypes.func.isRequired,
  onNameChange: PropTypes.func.isRequired
};

const VizCreator = props => {
  const {
    id,
    title,
    selectDataset,
    selectVisualisation,
    datasets,
    visualisations,
    hasData,
    chartData,
    filters,
    updateVisualisationName,
    saveVisualisation,
    handleFilterSelect
  } = props;

  return (
    <div>
      <div className={styles.container}>
        <ul className={styles.steps}>
          <Step1 {...{ datasets, selectDataset }} />
          {datasets.selected && (
            <Step2 {...{ visualisations, selectVisualisation }} />
          )}
          {visualisations.selected && (
            <Step3 {...{ spec: filters, handleFilterSelect }} />
          )}
          {hasData && (
            <Step4
              id={id}
              title={title}
              chartData={chartData}
              onNameChange={updateVisualisationName}
              onSaveClick={saveVisualisation}
            />
          )}
        </ul>
      </div>
    </div>
  );
};

VizCreator.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  selectDataset: PropTypes.func.isRequired,
  selectVisualisation: PropTypes.func.isRequired,
  datasets: PropTypes.object,
  visualisations: PropTypes.object,
  hasData: PropTypes.bool,
  chartData: PropTypes.object,
  filters: PropTypes.object,
  updateVisualisationName: PropTypes.func.isRequired,
  saveVisualisation: PropTypes.func.isRequired,
  handleFilterSelect: PropTypes.func.isRequired
};

export default VizCreator;
