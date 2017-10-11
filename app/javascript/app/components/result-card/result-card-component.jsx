import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import Button from 'components/button';
import Icon from 'components/icon';

import iconLink from 'assets/icons/dropdown-arrow.svg';
import styles from './result-card-styles.scss';

const ResultCard = props => {
  const { result, query } = props;
  console.log(result);
  return (
    <div className={styles.resultCard}>
      <div className={styles.header}>
        <h4 className={styles.title}>{result.label}</h4>
        {result.results.length === 1 &&
          <span className={styles.count}>{result.results[0].matches.length}</span>
        }
      </div>
      {result.results &&
        result.results.map(r => (
          <div key={`${r.location}-${r.documentType}`}>
            <h4 className={styles.title}>{r.documentType}({r.language})</h4>
            {r.matches &&
              r.matches.map(match => (
                <NavLink
                  key={match.fragment}
                  to={`/ndcs/country/${result.location}/full?search=${query}&idx=${match.idx}`}
                  className={styles.match}
                >
                  <div
                    className={styles.text}
                    id={match.idx}
                    dangerouslySetInnerHTML={{ __html: match.fragment }} // eslint-disable-line
                  />
                  <Button className={styles.link} color="white" square>
                    <Icon icon={iconLink} className={styles.iconLink} />
                  </Button>
                </NavLink>
              ))
            }
          </div>
        ))}
    </div>
  );
};

ResultCard.propTypes = {
  result: PropTypes.object,
  query: PropTypes.string
};

export default ResultCard;
