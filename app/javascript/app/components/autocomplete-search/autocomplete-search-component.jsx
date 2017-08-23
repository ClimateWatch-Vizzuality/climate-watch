import React, { PureComponent } from 'react';
import Proptypes from 'prop-types';
import cx from 'classnames';

import Search from 'components/search';
import ResultsList from 'components/results-list';

import layout from 'styles/layout.scss';
import styles from './autocomplete-search-styles.scss';

class CountriesSelect extends PureComponent {
  render() {
    const { query, setAutocompleteSearch, searchList } = this.props;
    return (
      <div className={cx(layout.content, styles.wrapper)}>
        <Search placeholder="" value={query} onChange={setAutocompleteSearch} />
        <ResultsList list={searchList} emptyDataMsg="No results" />
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
