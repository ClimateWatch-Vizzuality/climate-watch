import React from 'react';
import PropTypes from 'prop-types';

import Button from 'components/button';
import Icon from 'components/icon';

import iconLink from 'assets/icons/dropdown-arrow.svg';
import styles from './result-card-styles.scss';

const ResultCard = props => {
  const { result } = props;
  return (
    <div className={styles.resultCard}>
      <div className={styles.header}>
        <h4 className={styles.title}>{result.iso_code3}</h4>
        <span className={styles.count}>{result.matches.length}</span>
      </div>
      {result.matches &&
        result.matches.map(match => (
          <div
            key={match.fragment}
            id={match.idx}
            className={styles.match}
            dangerouslySetInnerHTML={{ __html: match.fragment }}
          />
        ))}
      <Button
        className={styles.iconLink}
        link={`/ndcs/country/${result.iso_code3}`}
        color="white"
        square
      >
        <Icon icon={iconLink} />
      </Button>
    </div>
  );
};

ResultCard.propTypes = {
  result: PropTypes.object
};

export default ResultCard;
