import { PureComponent, createElement } from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import actions from './autocomplete-search-actions';
import reducers, { initialState } from './autocomplete-search-reducers';

import AutocompleteSearchComponent from './autocomplete-search-component';
import {
  getQueryUpper,
  getFilteredCountriesWithPath
} from './autocomplete-search-selectors';

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

  handleValueClick = option => {
    this.props.history.push(option.path);
  };

  render() {
    return createElement(AutocompleteSearchComponent, {
      ...this.props,
      handleValueClick: this.handleValueClick
    });
  }
}

AutocompleteSearchContainer.propTypes = {
  history: Proptypes.object.isRequired,
  setAutocompleteSearch: Proptypes.func.isRequired
};

export { actions, reducers, initialState };

export default withRouter(
  connect(mapStateToProps, actions)(AutocompleteSearchContainer)
);
