import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _find from 'lodash/find';
import cx from 'classnames';

import Fieldset from 'components/fieldset';
import TextInput from 'components/text-input';
import Loading from 'components/loading';
import Button from 'components/button';

import btnThemes from 'styles/themes/button/buttons';
import Legend from '../charts/legend';
import RenderChart from '../render-chart';

import styles from './steps-styles';

const findField = (field, coll) => _find(coll, { field });
const includesField = (field, coll) => Boolean(findField(field, coll));
const findDescription = (field, coll) =>
  findField(field, coll) && findField(field, coll).message;

class Step4 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.title === undefined ? props.placeholder : props.title || '',
      description: props.description || '',
      placeholder: props.placeholder || ''
    };
  }

  onInputChange = (e, input) => this.setState({ [input]: e.target.value });

  render() {
    const {
      chartData,
      saveTitle,
      saveDescription,
      timeseries,
      saveVisualisation,
      deleteVisualisation,
      id,
      creationStatus,
      visualisationType
    } = this.props;
    return [
      <li className={styles.step} key="step-4-last-li">
        <div className={styles.stepContainer}>
          <h2 className={styles.stepTitle}>4/4 - Annotate the visualisation</h2>
          <div className={styles.step4Container}>
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
                value={this.state.title}
                onChange={e => this.onInputChange(e, 'title')}
                className={styles.inputText}
                theme={styles}
              />
            </Fieldset>
            {timeseries.loading ? (
              <Loading light className={styles.timeseriesLoader} />
            ) : (
              [
                <RenderChart
                  key="chart"
                  className={styles.chart}
                  chart={visualisationType}
                  config={{ small: false, ...chartData }}
                  width="100%"
                  height={350}
                />,
                <Legend key="legend" theme={styles} data={chartData.legend} />
              ]
            )}
            <Fieldset
              className={styles.fieldset}
              theme={styles}
              {...{
                failed:
                  creationStatus.failed &&
                  includesField('description', creationStatus.fields),
                failMessage: findDescription(
                  'description',
                  creationStatus.fields
                )
              }}
            >
              <TextInput
                inputType="textarea"
                value={this.state.description}
                onChange={e => this.onInputChange(e, 'description')}
                className={styles.textArea}
                theme={styles}
              />
            </Fieldset>
          </div>
        </div>
      </li>,
      <li className="grid-column-element" key="step-4-button-li">
        <div className={styles.saveContainer}>
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
            onClick={() => {
              saveTitle(this.state.title);
              saveDescription(this.state.description);
              saveVisualisation({ id });
            }}
            className={styles.saveBtn}
          >
            Save
          </Button>
        </div>
      </li>
    ];
  }
}

Step4.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  placeholder: PropTypes.string,
  timeseries: PropTypes.object,
  chartData: PropTypes.object.isRequired,
  visualisationOptions: PropTypes.object,
  saveTitle: PropTypes.func.isRequired,
  saveVisualisation: PropTypes.func.isRequired,
  creationStatus: PropTypes.object,
  visualisationType: PropTypes.string,
  description: PropTypes.string,
  deleteVisualisation: PropTypes.func.isRequired,
  saveDescription: PropTypes.func.isRequired
};

export default Step4;
