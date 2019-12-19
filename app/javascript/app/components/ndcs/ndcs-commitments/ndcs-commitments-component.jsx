import React from 'react';
import PropTypes from 'prop-types';
import layout from 'styles/layout.scss';
import styles from './ndcs-commitments-styles.scss';

const CommitmentContent = props => {
  const { title, description, hint } = props;
  return (
    <div className={styles.commitmentWrapper}>
      <div className={styles.commitmentInfo}>
        <div>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.description}>{description}</p>
        </div>
        <p className={styles.hint}>{hint}</p>
      </div>
      <div className={styles.barCharts} />
    </div>
  );
};

const NdcOverview = ({ data }) => (
  <div className={layout.content}>
    {data.map(commitment => (
      <CommitmentContent {...commitment} />
    ))}
  </div>
);

CommitmentContent.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  hint: PropTypes.string
};

NdcOverview.propTypes = {
  data: PropTypes.array
};

export default NdcOverview;
