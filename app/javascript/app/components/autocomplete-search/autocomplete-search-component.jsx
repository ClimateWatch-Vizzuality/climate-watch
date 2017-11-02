import React, { PureComponent } from 'react';
import Proptypes from 'prop-types';
import cx from 'classnames';

import Dropdown from 'components/dropdown';
import Icon from 'components/icon';

import searchIcon from 'assets/icons/search.svg';
import theme from 'styles/themes/dropdown/dropdown-links.scss';
import styles from './autocomplete-search-styles.scss';

class CountriesSelect extends PureComponent {
  render() {
    const { handleValueClick, handleSearchChange, searchList } = this.props;
    return (
      <div className={styles.wrapper}>
        <Dropdown
          className={theme.dropdownOptionWithArrow}
          placeholder={'e.g. "Brazil", "energy", "deforestation targets"'}
          options={searchList}
          onSearchChange={handleSearchChange}
          onValueChange={handleValueClick}
          value={null}
          hideResetButton
          white
          hasSearch
          renderToggleButton={({ open }) => (
            <Icon
              icon={searchIcon}
              className={cx(styles.searchIcon, !open ? styles.whiteIcon : '')}
            />
          )}
        />
      </div>
    );
  }
}

CountriesSelect.propTypes = {
  handleValueClick: Proptypes.func.isRequired,
  handleSearchChange: Proptypes.func.isRequired,
  searchList: Proptypes.array
};

export default CountriesSelect;
