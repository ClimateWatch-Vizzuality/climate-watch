import React from 'react';
import PropTypes from 'prop-types';

import Step1 from './components/steps/step-one';
import Step2 from './components/steps/step-two';
import Step3 from './components/steps/step-three';
import Step4 from './components/steps/step-four';
import styles from './viz-creator-styles';

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
    visualisationType,
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
            visualisationType={visualisationType}
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
  visualisationType: PropTypes.string,
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
