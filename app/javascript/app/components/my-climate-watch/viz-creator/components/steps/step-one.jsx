import React from 'react';
import PropTypes from 'prop-types';
import SelectableList from '../selectable-list';
import CardContent from '../card-content';

import styles from './steps-styles';

const Step1 = ({ datasets, selectDataset }) => (
  <li className={styles.step}>
    <div className={styles.stepContainer}>
      <h2 className={styles.stepTitle}>1/4 - Select a dataset</h2>
      <div className="layout-item-container">
        <SelectableList
          type="dataset"
          data={datasets.data}
          selected={datasets.selected}
          onClick={selectDataset}
          className={styles.step1ListContainer}
        >
          {d => (
            <CardContent
              placeholder={d.placeholder}
              image={d.image}
              type="dataset"
            >
              <div className={styles.cardContent}>
                <p className={styles.cardTitle}>{d.name}</p>
              </div>
            </CardContent>
          )}
        </SelectableList>
      </div>
    </div>
  </li>
);

Step1.propTypes = {
  datasets: PropTypes.shape({
    data: PropTypes.array.isRequired,
    selected: PropTypes.string
  }).isRequired,
  selectDataset: PropTypes.func.isRequired
};

export default Step1;
