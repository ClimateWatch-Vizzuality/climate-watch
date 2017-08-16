import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Icon from 'components/icon';

import arrow from 'assets/icons/dropdown-arrow.svg';
import styles from './results-list-styles.scss';

const ResultsList = (props) => {
  const { search, list, hasIcon, open } = props;
  return list.length > 0 && (search !== '' || open)
    ? <ul className={styles.resultsList}>
      {list.map(item =>
          (<li className={styles.listItem} key={item.value} id={item.value}>
            <NavLink exact className={styles.link} to={item.path}>
              {item.label}
              {hasIcon && <Icon icon={arrow} className={styles.iconArrow} />}
            </NavLink>
          </li>)
        )}
    </ul>
    : null;
};

ResultsList.propTypes = {
  list: PropTypes.array,
  hasIcon: PropTypes.bool,
  search: PropTypes.string,
  open: PropTypes.bool
};

export default ResultsList;
