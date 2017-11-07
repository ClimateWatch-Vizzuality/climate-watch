import React from 'react';
import PropTypes from 'prop-types';

import styles from './widget-picker-styles';

const visualizations = [
  {
    key: 'viz-1',
    type: 'barchart',
    data: [2, 3, 6, 9]
  },
  {
    key: 'viz-2',
    type: 'barchart',
    data: [3, 9, 5, 1]
  }
];

const WidgetPicker = ({ onHidePicker, onSelectVis }) => (
  <div className={styles.container}>
    <h1>Select a visualisation</h1>
    <ul className={styles.options}>
      {visualizations.map((viz, i) => (
        <li key={viz.key} className={styles.option}>
          <button className={styles.viz} onClick={() => onSelectVis(viz)}>
            W{i}
          </button>
        </li>
      ))}
      <li className={styles.option}>
        <button className={styles.viz}>Create a new visualisation</button>
      </li>
    </ul>
    <button onClick={onHidePicker}>Cancel</button>
  </div>
);

WidgetPicker.propTypes = {
  onHidePicker: PropTypes.func.isRequired,
  onSelectVis: PropTypes.func.isRequired
};

export default WidgetPicker;
