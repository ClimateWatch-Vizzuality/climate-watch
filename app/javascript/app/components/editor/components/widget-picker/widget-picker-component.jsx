import React from 'react';
import PropTypes from 'prop-types';
import { importAllImagesFromFolder } from 'app/utils';

import Loading from 'components/loading';
import Card from 'components/card';
import styles from './widget-picker-styles';

const vizimages = importAllImagesFromFolder(
  require.context('assets/visualisations', false, /\.(png|jpe?g)$/)
);

const WidgetPicker = ({
  visualisations,
  loading,
  onHidePicker,
  onSelectVis
}) => (
  <div className={styles.container}>
    <h1>Select a visualisation</h1>
    <ul className={styles.options}>
      {!loading ? (
        visualisations.map(viz => (
          <li key={viz.key} className={styles.option}>
            <button className={styles.viz} onClick={() => onSelectVis(viz)}>
              <Card className={styles.vizCard} theme={styles} title={viz.title}>
                <img
                  alt={`${viz.type}-visualisation`}
                  src={vizimages[`${viz.type}.png`]}
                />
              </Card>
            </button>
          </li>
        ))
      ) : (
        <Loading />
      )}
      <li className={styles.option}>
        <button className={styles.viz}>Create a new visualisation</button>
      </li>
    </ul>
    <button style={{ display: 'none' }} onClick={onHidePicker}>
      Cancel
    </button>
  </div>
);

WidgetPicker.propTypes = {
  onHidePicker: PropTypes.func.isRequired,
  onSelectVis: PropTypes.func.isRequired,
  visualisations: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
};

export default WidgetPicker;
