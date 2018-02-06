import React, { createElement } from 'react';
import PropTypes from 'prop-types';
import _find from 'lodash/find';
import cx from 'classnames';

import Fieldset from 'components/fieldset';
import TextInput from 'components/text-input';
import TextArea from 'components/text-area';
import Loading from 'components/loading';
import Button from 'components/button';

import btnThemes from 'styles/themes/button/buttons';
import Legend from '../charts/legend';
import charts from '../charts';

import styles from './steps-styles';

const findField = (field, coll) => _find(coll, { field });
const includesField = (field, coll) => Boolean(findField(field, coll));
const findDescription = (field, coll) =>
  findField(field, coll) && findField(field, coll).message;

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
    creationStatus,
    visualisationType
  } = props;
  return [
    <li className={styles.step} key="step-4-last-li">
      <h2 className={styles.stepTitle}>4/4 - Annotate the visualisation</h2>
      <Fieldset
        className={styles.fieldset}
        theme={styles}
        {...{
          failed:
            creationStatus.failed &&
            includesField('title', creationStatus.fields),
          failMessage: findDescription('title', creationStatus.fields)
        }}
      >
        <TextInput
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
          console.log(visualisationType) || createElement(charts[visualisationType], {
            key: 'line-chart',
            className: styles.chart,
            width: '90%',
            legend: true,
            ...chartData
          }),
          <Legend key="legend" theme={styles} data={legendData} />
        ]
      )}
      <Fieldset
        className={styles.fieldset}
        theme={styles}
        {...{
          failed:
            creationStatus.failed &&
            includesField('description', creationStatus.fields),
          failMessage: findDescription('description', creationStatus.fields)
        }}
      >
        <TextArea
          className={styles.textArea}
          theme={styles}
          onDescriptionChange={onDescriptionChange}
          onFocus={onDescriptionChange}
          value={description}
        />
      </Fieldset>
    </li>,
    <li className={styles.saveContainer} key="step-4-button-li">
      {id && (
        <Button
          onClick={() => deleteVisualisation({ id })}
          className={cx(btnThemes.btnSecondary, styles.deleteBtn)}
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

export default Step4;
