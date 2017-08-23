import { createElement } from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { deburrUpper } from 'app/utils';

import AutocompleteSearchComponent from './autocomplete-search-component';
import actions from './autocomplete-search-actions';
import { getFilteredCountriesWithPath } from './autocomplete-search-selectors';

export { default as component } from './autocomplete-search-component';
export { initialState } from './autocomplete-search-reducers';
export { default as reducers } from './autocomplete-search-reducers';
export { default as styles } from './autocomplete-search-styles';
export { default as actions } from './autocomplete-search-actions';

const mapStateToProps = (state) => {
  const { query } = state.autocompleteSearch;
  return {
    query: deburrUpper(query),
    searchList: getFilteredCountriesWithPath(state.autocompleteSearch)
  };
};

const AutocompleteSearchContainer = (props) => {
  const onOptionClick = (selected) => {
    const { history } = props;
    if (selected) {
      history.push(`ndcs/${selected.value}`);
    }
  };

  return createElement(AutocompleteSearchComponent, {
    ...props,
    onOptionClick
  });
};

AutocompleteSearchContainer.propTypes = {
  query: Proptypes.string,
  history: Proptypes.object
};

export default withRouter(
  connect(mapStateToProps, actions)(AutocompleteSearchContainer)
);
