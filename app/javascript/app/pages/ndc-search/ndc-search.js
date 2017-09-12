import { PureComponent, createElement } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import qs from 'query-string';

import actions from './ndc-search-actions';
import SearchComponent from './ndc-search-component';
import { getSearchResults } from './ndc-search-selectors';

export { default as component } from './ndc-search-component';
export { default as styles } from './ndc-search-styles';

const mapStateToProps = (state, { location }) => {
  const { query } = qs.parse(location.search);
  const stateWithQuery = {
    query,
    results: state.ndcSearch.data
  };
  return {
    query,
    results: getSearchResults(stateWithQuery)
  };
};

class SearchContainer extends PureComponent {
  componentWillMount() {
    const { fetchSearchResults, query } = this.props;
    fetchSearchResults(query);
  }

  onResultClick = result => {
    console.info(result);
  };

  onSearchChange = query => {
    const { history, location, fetchSearchResults } = this.props;
    const search = qs.parse(location.search);
    const newSearch = { ...search, query };

    history.replace({
      pathname: location.pathname,
      search: qs.stringify(newSearch)
    });
    fetchSearchResults(query);
  };

  render() {
    return createElement(SearchComponent, {
      ...this.props,
      onResultClick: this.onResultClick,
      onSearchChange: this.onSearchChange
    });
  }
}

SearchContainer.propTypes = {
  fetchSearchResults: Proptypes.func.isRequired,
  query: Proptypes.string,
  history: Proptypes.object,
  location: Proptypes.object
};

export { initialState } from './ndc-search-reducers';
export { default as reducers } from './ndc-search-reducers';
export { default as actions } from './ndc-search-actions';

export default withRouter(connect(mapStateToProps, actions)(SearchContainer));
