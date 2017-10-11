import React, { PureComponent } from 'react';
import Proptypes from 'prop-types';
import cx from 'classnames';

import NdcsSdgsMetaProvider from 'providers/ndcs-sdgs-meta-provider';
import Dropdown from 'components/dropdown';
import Icon from 'components/icon';

import searchIcon from 'assets/icons/search.svg';
import theme from 'styles/themes/dropdown/dropdown-links.scss';
import styles from './ndcs-autocomplete-search-styles.scss';

class NdcsAutocompleteSearch extends PureComponent {
  render() {
    const { handleValueClick, setNdcsAutocompleteSearch, searchList } = this.props;
    return (
      <div className={styles.wrapper}>
        <NdcsSdgsMetaProvider />
        <Dropdown
          className={theme.dropdownOptionWithArrow}
          placeholder={'e.g. “Energy”, “SDG 8.1”, “reduce emissions by 37%”'}
          options={searchList}
          onSearchChange={setNdcsAutocompleteSearch}
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

NdcsAutocompleteSearch.propTypes = {
  handleValueClick: Proptypes.func.isRequired,
  setNdcsAutocompleteSearch: Proptypes.func.isRequired,
  searchList: Proptypes.array
};

export default NdcsAutocompleteSearch;
