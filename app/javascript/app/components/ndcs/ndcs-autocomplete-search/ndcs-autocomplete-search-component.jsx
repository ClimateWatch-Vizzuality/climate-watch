import React, { PureComponent } from 'react';
import Proptypes from 'prop-types';
import cx from 'classnames';

import NdcsSdgsMetaProvider from 'providers/ndcs-sdgs-meta-provider';
import NdcsSdgsDataProvider from 'providers/ndcs-sdgs-data-provider';
import Dropdown from 'components/dropdown';
import Search from 'components/search';

import darkSearch from 'styles/themes/search/search-dark.scss';
import lightSearch from 'styles/themes/search/search-light.scss';
import theme from 'styles/themes/dropdown/dropdown-links.scss';
import styles from './ndcs-autocomplete-search-styles.scss';

class NdcsAutocompleteSearch extends PureComponent {
  render() {
    const {
      className,
      onSearchChange,
      searchList,
      groups,
      optionSelected,
      label,
      global,
      search,
      handleKeyUp,
      dark
    } = this.props;
    return (
      <div className={cx(styles.wrapper, styles.col2, className)}>
        {global ? <NdcsSdgsMetaProvider /> : <NdcsSdgsDataProvider />}
        <Dropdown
          label={label ? 'Highlight SDG Linkages' : ''}
          className={theme.dropdownOptionWithArrow}
          placeholder="Select a goal or target"
          groups={groups}
          options={searchList}
          onValueChange={onSearchChange}
          value={optionSelected}
          hideResetButton
          white={!dark}
        />
        <Search
          theme={dark ? darkSearch : lightSearch}
          className={label ? styles.search : ''}
          placeholder="e.g. “reduce emissions by 37%”"
          value={search.searchBy === 'query' ? search.query : ''}
          handleKeyUp={handleKeyUp}
        />
      </div>
    );
  }
}

NdcsAutocompleteSearch.propTypes = {
  className: Proptypes.string,
  onSearchChange: Proptypes.func.isRequired,
  searchList: Proptypes.array,
  groups: Proptypes.array,
  optionSelected: Proptypes.object,
  label: Proptypes.bool,
  global: Proptypes.bool,
  search: Proptypes.object,
  handleKeyUp: Proptypes.func,
  dark: Proptypes.bool
};

export default NdcsAutocompleteSearch;
