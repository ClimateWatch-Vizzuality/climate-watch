import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import cx from 'classnames';

import Button from 'components/button';
import Icon from 'components/icon';

import iconLink from 'assets/icons/dropdown-arrow.svg';
import styles from './result-card-styles.scss';

const ResultCard = props => {
  const { result, search, className } = props;
  const resultsText = `${result.matches.length} RESULT${
    result.matches.length !== 1 ? 'S' : ''
  }:`;

  return (
    <div className={cx(styles.resultCard, className)}>
      <span className={styles.count}>{resultsText}</span>
      {result.matches &&
        result.matches.map(match => (
          <NavLink
            key={`${match.fragment}-${match.idx}`}
            to={`/ndcs/country/${result.location.iso_code3}/full?searchBy=${search.searchBy}&query=${search.query}&idx=${match.idx}&document=${result.document_type}-${result.language}`}
            className={styles.match}
          >
            <div
              className={styles.text}
              id={match.idx}
              dangerouslySetInnerHTML={{ __html: match.fragment }} // eslint-disable-line
            />
            <Button
              className={styles.link}
              variant="secondary"
              square
              onClick={() => true}
            >
              <Icon icon={iconLink} className={styles.iconLink} />
            </Button>
          </NavLink>
        ))}
    </div>
  );
};

ResultCard.propTypes = {
  result: PropTypes.object,
  search: PropTypes.object,
  className: PropTypes.string
};

export default ResultCard;
