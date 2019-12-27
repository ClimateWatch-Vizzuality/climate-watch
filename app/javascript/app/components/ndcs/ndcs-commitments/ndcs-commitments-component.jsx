import React from 'react';
import PropTypes from 'prop-types';
import layout from 'styles/layout.scss';
import styles from './ndcs-commitments-styles.scss';

const Commitment = props => {
  const { title, description, hint } = props;
  return (
    <div className={styles.commitmentContainer}>
      <div className={layout.content}>
        <div className={styles.commitmentWrapper}>
          <div className={styles.commitmentText}>
            <div>
              <h1 className={styles.title}>{title}</h1>
              <p className={styles.description}>{description}</p>
            </div>
            <p className={styles.hint}>{hint}</p>
          </div>
          <div className={styles.barCharts} />
        </div>
      </div>
    </div>
  );
};

const NdcsCommitments = ({ data }) =>
  data.map(commitment => <Commitment key={commitment.title} {...commitment} />);

Commitment.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  hint: PropTypes.string
};

NdcsCommitments.propTypes = {
  data: PropTypes.array
};

export default NdcsCommitments;
