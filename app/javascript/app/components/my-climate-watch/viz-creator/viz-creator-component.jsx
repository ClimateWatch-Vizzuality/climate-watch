import React from 'react';
import PropTypes from 'prop-types';
import _map from 'lodash/map';
import upperFirst from 'lodash/upperFirst';
import _isUndefined from 'lodash/isUndefined';
import _isEmpty from 'lodash/isEmpty';
import _find from 'lodash/find';
import Textarea from 'react-textarea-autosize';

import MultiSelect from 'components/multiselect';
import Fieldset from 'components/fieldset';
import Dropdown from 'components/dropdown';
import Input from 'components/input';
// import Search from 'components/search';
import Button from 'components/button';
import Loading from 'components/loading';

import LineChart from './components/charts/line';
import Legend from './components/charts/legend';
import SelectableList from './components/selectable-list';
import CardContent from './components/card-content';
import styles from './viz-creator-styles';

const findField = (field, coll) => _find(coll, { field });
const includesField = (field, coll) => Boolean(findField(field, coll));
const findDescription = (field, coll) =>
  findField(field, coll) && findField(field, coll).message;

const Step1 = ({ datasets, selectDataset }) => (
  <li className={styles.step}>
    <h2 className={styles.stepTitle}>1/4 - Select a dataset</h2>
    <SelectableList
      type="dataset"
      data={datasets.data}
      selected={datasets.selected}
      onClick={selectDataset}
    >
      {d => (
        <CardContent placeholder={d.placeholder} image={d.image} type="dataset">
          <div className={styles.cardContent}>
            <p className={styles.cardTitle}>{d.name}</p>
          </div>
        </CardContent>
      )}
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
        {d => (
          <CardContent
            placeholder={d.placeholder}
            image={d.image}
            type="visualisation"
          >
            <div className={styles.cardContent}>
              <h1 className={styles.cardTitle}>{d.name}</h1>
              <p className={styles.cardTags}>{d.tags.join(' | ')}</p>
            </div>
          </CardContent>
        )}
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
      options: (f.data || []).map(d => ({
        ...d,
        label: d.label || '',
        key: `${d.label}-${Date.now()}`
      })),
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
                    className={styles.dropDowns}
                    {...selectProps(f, 'values')}
                    label={upperFirst(f.name)}
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
                    className={styles.dropDowns}
                    label={upperFirst(f.label)}
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

class ControlledTextArea extends React.Component {
  render() {
    const {
      value,
      onDescriptionChange,
      failed,
      failMessage,
      onFocus
    } = this.props;
    return (
      <Fieldset {...{ failed, failMessage }}>
        <Textarea
          className={styles.textArea}
          minRows={8}
          onChange={e => onDescriptionChange(e.target.value)}
          onFocus={e => onFocus(e.target.value)}
          placeholder="Add a description"
          value={value}
        />
      </Fieldset>
    );
  }
}

ControlledTextArea.propTypes = {
  value: PropTypes.string,
  onDescriptionChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  failed: PropTypes.bool,
  failMessage: PropTypes.string
};

const Step4 = props => {
  const {
    title,
    chartData,
    legendData,
    onNameChange,
    onDescriptionChange,
    timeseries,
    saveVisualisation,
    deleteVisualisation,
    id,
    description,
    creationStatus
  } = props;

  //   <Search
  //   icon={false}
  //   placeholder=""
  //   value={title}
  //   onChange={onNameChange}
  //   className={styles.inputText}
  //   theme={inputTextTheme}
  // />

  return [
    <li className={styles.step} key="step-4-last-li">
      <h2 className={styles.stepTitle}>4/4 - Annotate the visualisation</h2>
      <Fieldset
        {...{
          failed:
            creationStatus.failed &&
            includesField('title', creationStatus.fields),
          failMessage: findDescription('title', creationStatus.fields)
        }}
      >
        <Input
          placeholder=""
          value={title}
          onChange={onNameChange}
          onFocus={onNameChange}
          className={styles.inputText}
          theme={styles}
        />
      </Fieldset>
      {timeseries.loading ? (
        <Loading light className={styles.timeseriesLoader} />
      ) : (
        [
          <LineChart
            key="line-chart"
            className={styles.chart}
            {...chartData}
            width="90%"
            legend
          />,
          <Legend key="legend" theme={styles} data={legendData} />
        ]
      )}
      <ControlledTextArea
        onDescriptionChange={onDescriptionChange}
        onFocus={onDescriptionChange}
        value={description}
        failed={
          creationStatus.failed &&
          includesField('description', creationStatus.fields)
        }
        failMessage={findDescription('description', creationStatus.fields)}
      />
    </li>,
    <li className={styles.saveContainer} key="step-4-button-li">
      {id && (
        <Button
          color="red"
          onClick={() => deleteVisualisation({ id })}
          className={styles.deleteBtn}
        >
          Delete
        </Button>
      )}
      <Button
        color="yellow"
        onClick={() => saveVisualisation({ id })}
        className={styles.saveBtn}
      >
        Save
      </Button>
    </li>
  ];
};

Step4.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  timeseries: PropTypes.object,
  chartData: PropTypes.object.isRequired,
  onNameChange: PropTypes.func.isRequired,
  saveVisualisation: PropTypes.func.isRequired,
  creationStatus: PropTypes.object
};

const VizCreator = props => {
  const {
    id,
    title,
    description,
    selectDataset,
    selectVisualisation,
    datasets,
    timeseries,
    visualisations,
    hasData,
    chartData,
    legendData,
    filters,
    updateVisualisationName,
    updateVisualisationDescription,
    saveVisualisation,
    deleteVisualisation,
    handleFilterSelect,
    creationStatus
  } = props;

  return (
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
            description={description}
            timeseries={timeseries}
            chartData={chartData}
            onNameChange={updateVisualisationName}
            onDescriptionChange={updateVisualisationDescription}
            saveVisualisation={saveVisualisation}
            deleteVisualisation={deleteVisualisation}
            creationStatus={creationStatus}
            legendData={legendData}
          />
        )}
      </ul>
    </div>
  );
};

VizCreator.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  description: PropTypes.string,
  selectDataset: PropTypes.func.isRequired,
  selectVisualisation: PropTypes.func.isRequired,
  datasets: PropTypes.object,
  visualisations: PropTypes.object,
  timeseries: PropTypes.object,
  hasData: PropTypes.bool,
  chartData: PropTypes.object,
  filters: PropTypes.object,
  updateVisualisationName: PropTypes.func.isRequired,
  updateVisualisationDescription: PropTypes.func.isRequired,
  saveVisualisation: PropTypes.func.isRequired,
  deleteVisualisation: PropTypes.func.isRequired,
  handleFilterSelect: PropTypes.func.isRequired,
  creationStatus: PropTypes.object,
  legendData: PropTypes.array
};

export default VizCreator;
