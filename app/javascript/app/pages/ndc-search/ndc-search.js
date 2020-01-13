import { PureComponent, createElement } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import qs from 'query-string';

import actions from './ndc-search-actions';
import reducers, { initialState } from './ndc-search-reducers';

import SearchComponent from './ndc-search-component';
import { getResults, getMessageText } from './ndc-search-selectors';

const mapStateToProps = (state, { location }) => {
  const search = qs.parse(location.search);
  const stateWithQuery = {
    search,
    location,
    results: state.ndcSearch.data && state.ndcSearch.data.ndcs
  };
  return {
    search,
    loading: state.ndcSearch.loading,
    results: getResults(stateWithQuery),
    searchMessageText: getMessageText(search.searchBy)
  };
};

class SearchContainer extends PureComponent {
  componentWillMount() {
    const { fetchSearchResults, search } = this.props;
    fetchSearchResults(search);
  }

  componentDidUpdate(nextProps) {
    const { fetchSearchResults, search } = this.props;
    if (nextProps.search.query !== this.props.search.query) {
      fetchSearchResults(search);
    }
  }

  render() {
    return createElement(SearchComponent, {
      ...this.props,
      onSearchChange: this.onSearchChange
    });
  }
}

SearchContainer.propTypes = {
  fetchSearchResults: Proptypes.func.isRequired,
  search: Proptypes.object
};

export { actions, reducers, initialState };

export default withRouter(connect(mapStateToProps, actions)(SearchContainer));
