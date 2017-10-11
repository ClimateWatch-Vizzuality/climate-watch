import { PureComponent, createElement } from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import NdcsAutocompleteSearchComponent from './ndcs-autocomplete-search-component';
import actions from './ndcs-autocomplete-search-actions';
import {
  getQueryUpper,
  getFilteredCountriesWithPath
} from './ndcs-autocomplete-search-selectors';

export { default as component } from './ndcs-autocomplete-search-component';
export { initialState } from './ndcs-autocomplete-search-reducers';
export { default as reducers } from './ndcs-autocomplete-search-reducers';
export { default as styles } from './ndcs-autocomplete-search-styles';
export { default as actions } from './ndcs-autocomplete-search-actions';

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

class NdcsAutocompleteSearchContainer extends PureComponent {
  componentWillUnmount() {
    this.props.setNdcsAutocompleteSearch('');
  }

  handleValueClick = option => {
    this.props.history.push(option.path);
  };

  render() {
    return createElement(NdcsAutocompleteSearchComponent, {
      ...this.props,
      handleValueClick: this.handleValueClick
    });
  }
}

NdcsAutocompleteSearchContainer.propTypes = {
  history: Proptypes.object.isRequired,
  setNdcsAutocompleteSearch: Proptypes.func.isRequired
};

export default withRouter(
  connect(mapStateToProps, actions)(NdcsAutocompleteSearchContainer)
);
