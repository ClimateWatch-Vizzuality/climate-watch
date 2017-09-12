import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import Button from 'components/button';
import Icon from 'components/icon';

import iconLink from 'assets/icons/dropdown-arrow.svg';
import styles from './result-card-styles.scss';

const ResultCard = props => {
  const { result, query } = props;
  return (
    <div className={styles.resultCard}>
      <div className={styles.header}>
        <h4 className={styles.title}>{result.iso_code3}</h4>
        <span className={styles.count}>{result.matches.length}</span>
      </div>
      {result.matches &&
        result.matches.map(match => (
          <NavLink
            key={match.fragment}
            to={`/ndcs/country/${result.iso_code3}/full?search=${query}&idx=0`}
            className={styles.match}
          >
            <div
              className={styles.text}
              id={match.idx}
              dangerouslySetInnerHTML={{ __html: match.fragment }}
            />
            <Button className={styles.link} color="white" square>
              <Icon icon={iconLink} className={styles.iconLink} />
            </Button>
          </NavLink>
        ))}
    </div>
  );
};

ResultCard.propTypes = {
  result: PropTypes.object,
  query: PropTypes.string
};

export default ResultCard;
