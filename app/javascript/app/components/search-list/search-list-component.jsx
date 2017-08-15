import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import styles from './search-list-styles.scss';

const SearchList = (props) => {
  const { list } = props;
  return (
    <ul className={styles.searchList}>
      {list.map(item =>
        (<li className={styles.listItem} key={item.value} id={item.value}>
          <NavLink exact className={styles.link} to={item.path}>
            {item.label}
          </NavLink>
        </li>)
      )}
    </ul>
  );
};

SearchList.propTypes = {
  list: PropTypes.array
};

export default SearchList;
