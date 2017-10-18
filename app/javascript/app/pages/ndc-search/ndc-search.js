import { PureComponent, createElement } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import qs from 'query-string';

import actions from './ndc-search-actions';
import SearchComponent from './ndc-search-component';
import {
  getSearchResultsSorted,
  getDocumentOptions,
  getDocumentSelected,
  getAnchorLinks
} from './ndc-search-selectors';

export { default as component } from './ndc-search-component';
export { default as styles } from './ndc-search-styles';

const mapStateToProps = (state, { location }) => {
  const search = qs.parse(location.search);
  const stateWithQuery = {
    search,
    location,
    results: state.ndcSearch.data
  };
  return {
    search,
    loading: state.ndcSearch.loading,
    results: getSearchResultsSorted(stateWithQuery),
    docOptions: getDocumentOptions(stateWithQuery),
    docSelected: getDocumentSelected(stateWithQuery),
    anchorLinks: getAnchorLinks(stateWithQuery)
  };
};

class SearchContainer extends PureComponent {
  componentWillMount() {
    const { fetchSearchResults, search } = this.props;
    fetchSearchResults(search);
  }

  onSearchChange = query => {
    const { history, location, fetchSearchResults } = this.props;
    const search = qs.parse(location.search);
    const newSearch = {
      ...search,
      searchBy: search.searchBy,
      query
    };

    history.replace({
      pathname: location.pathname,
      search: qs.stringify(newSearch)
    });
    fetchSearchResults(newSearch);
  };

  render() {
    return createElement(SearchComponent, {
      ...this.props,
      onSearchChange: this.onSearchChange
    });
  }
}

SearchContainer.propTypes = {
  fetchSearchResults: Proptypes.func.isRequired,
  search: Proptypes.object,
  history: Proptypes.object,
  location: Proptypes.object
};

export { initialState } from './ndc-search-reducers';
export { default as reducers } from './ndc-search-reducers';
export { default as actions } from './ndc-search-actions';

export default withRouter(connect(mapStateToProps, actions)(SearchContainer));
