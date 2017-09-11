import React from 'react';
import PropTypes from 'prop-types';

import styles from './result-card-styles.scss';

const ResultCard = props => {
  const { result } = props;
  return (
    <div className={styles.resultCard}>
      <h4 className={styles.title}>{result.iso_code3}</h4>
      {result.matches &&
        result.matches.map(match => (
          <p key={match.idx} id={match.idx} className={styles.match}>
            {match.fragment}
          </p>
        ))}
    </div>
  );
};

ResultCard.propTypes = {
  result: PropTypes.object
};

export default ResultCard;
