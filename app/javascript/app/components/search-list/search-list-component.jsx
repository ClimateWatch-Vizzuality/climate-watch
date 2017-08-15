import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Icon from 'components/icon';

import arrow from 'assets/icons/dropdown-arrow.svg';
import styles from './search-list-styles.scss';

const SearchList = (props) => {
  const { list, hasIcon } = props;
  return (
    <ul className={styles.searchList}>
      {list.map(item =>
        (<li className={styles.listItem} key={item.value} id={item.value}>
          <NavLink exact className={styles.link} to={item.path}>
            {item.label}
            {hasIcon && <Icon icon={arrow} className={styles.iconArrow} />}
          </NavLink>
        </li>)
      )}
    </ul>
  );
};

SearchList.propTypes = {
  list: PropTypes.array,
  hasIcon: PropTypes.bool
};

export default SearchList;
