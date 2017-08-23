import React, { PureComponent } from 'react';
import Proptypes from 'prop-types';
import cx from 'classnames';

import Search from 'components/search';
import ResultsList from 'components/results-list';

import searchLightTheme from 'styles/themes/search-light.scss';
import styles from './autocomplete-search-styles.scss';

class CountriesSelect extends PureComponent {
  render() {
    const { query, setAutocompleteSearch, searchList } = this.props;
    return (
      <div className={styles.wrapper}>
        <Search
          theme={searchLightTheme}
          className={cx({ [styles.isOpen]: query }, styles.search)}
          placeholder={'e.g. "Brazil", "energy", "reduce emissions by 37%"'}
          value={query}
          onChange={setAutocompleteSearch}
        />
        {query &&
          <ResultsList
            className={styles.results}
            list={searchList}
            emptyDataMsg="No results"
            hasIcon
          />}
      </div>
    );
  }
}

CountriesSelect.propTypes = {
  query: Proptypes.string,
  setAutocompleteSearch: Proptypes.func.isRequired,
  searchList: Proptypes.array
};

export default CountriesSelect;
