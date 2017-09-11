import { PureComponent, createElement } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import qs from 'query-string';

import actions from './search-actions';
import SearchComponent from './search-component';
import { getSearchResults } from './search-selectors';

export { default as component } from './search-component';
export { default as styles } from './search-styles';

const mapStateToProps = (state, { location }) => {
  const { query } = qs.parse(location.search);
  const stateWithQuery = {
    query,
    results: state.search
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

  onResultClick = (result) => {
    console.log(result);
  }

  render() {
    return createElement(SearchComponent, {
      ...this.props,
      onResultClick: this.onResultClick
    });
  }
}

SearchContainer.propTypes = {
  fetchSearchResults: Proptypes.func.isRequired,
  query: Proptypes.string
};

export { initialState } from './search-reducers';
export { default as reducers } from './search-reducers';
export { default as actions } from './search-actions';

export default withRouter(connect(mapStateToProps, actions)(SearchContainer));
