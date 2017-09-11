import { PureComponent, createElement } from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import AutocompleteSearchComponent from './autocomplete-search-component';
import actions from './autocomplete-search-actions';
import {
  getQueryUpper,
  getFilteredCountriesWithPath
} from './autocomplete-search-selectors';

export { default as component } from './autocomplete-search-component';
export { initialState } from './autocomplete-search-reducers';
export { default as reducers } from './autocomplete-search-reducers';
export { default as styles } from './autocomplete-search-styles';
export { default as actions } from './autocomplete-search-actions';

const mapStateToProps = state => {
  const { autocompleteSearch } = state;
  const searchListData = {
    query: autocompleteSearch.query,
    countries: state.countries.data
  };
  return {
    query: getQueryUpper(autocompleteSearch),
    searchList: getFilteredCountriesWithPath(searchListData)
  };
};

class AutocompleteSearchContainer extends PureComponent {
  componentWillUnmount() {
    this.props.setAutocompleteSearch('');
  }

  render() {
    return createElement(AutocompleteSearchComponent, {
      ...this.props
    });
  }
}

AutocompleteSearchContainer.propTypes = {
  setAutocompleteSearch: Proptypes.func.isRequired
};

export default withRouter(
  connect(mapStateToProps, actions)(AutocompleteSearchContainer)
);
