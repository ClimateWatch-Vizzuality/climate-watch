import { PureComponent, createElement } from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getLocationParamUpdated } from 'utils/navigation';
import qs from 'query-string';

import NdcsAutocompleteSearchComponent from './ndcs-autocomplete-search-component';
import actions from './ndcs-autocomplete-search-actions';
import {
  getQueryUpper,
  getSearchList,
  getOptionSelected
} from './ndcs-autocomplete-search-selectors';

export { default as component } from './ndcs-autocomplete-search-component';
export { initialState } from './ndcs-autocomplete-search-reducers';
export { default as reducers } from './ndcs-autocomplete-search-reducers';
export { default as styles } from './ndcs-autocomplete-search-styles';
export { default as actions } from './ndcs-autocomplete-search-actions';

const groups = [
  {
    groupId: 'search',
    title: 'Search'
  },
  {
    groupId: 'sector',
    title: 'Sectors'
  },
  {
    groupId: 'goal',
    title: 'Goals'
  },
  {
    groupId: 'target',
    title: 'Targets'
  }
];

const mapStateToProps = (state, props) => {
  const { ndcsAutocompleteSearch } = state;
  const { location } = props;
  const searchListData = {
    query: ndcsAutocompleteSearch.query,
    sectors: state.ndcsSdgsMeta.data.sectors,
    targets: state.ndcsSdgsMeta.data.targets,
    goals: state.ndcsSdgsMeta.data.goals,
    queryParams: qs.parse(location.search, { ignoreQueryPrefix: true })
  };
  return {
    query: getQueryUpper(ndcsAutocompleteSearch),
    searchList: getSearchList(searchListData),
    optionSelected: getOptionSelected(searchListData),
    groups
  };
};

class NdcsAutocompleteSearchContainer extends PureComponent {
  componentDidMount() {
    const search = qs.parse(this.props.location.search).search || '';
    this.props.setNdcsAutocompleteSearch(search);
  }

  handleValueClick = option => {
    this.props.onSearchChange(option);
    this.updateUrlParam({ name: option.groupId, value: option.value }, true);
  };

  updateUrlParam(params, clear) {
    const { history, location } = this.props;
    history.replace(getLocationParamUpdated(location, params, clear));
  }

  render() {
    return createElement(NdcsAutocompleteSearchComponent, {
      ...this.props,
      handleValueClick: this.handleValueClick
    });
  }
}

NdcsAutocompleteSearchContainer.propTypes = {
  history: Proptypes.object.isRequired,
  setNdcsAutocompleteSearch: Proptypes.func.isRequired,
  location: Proptypes.object,
  onSearchChange: Proptypes.func
};

export default withRouter(
  connect(mapStateToProps, actions)(NdcsAutocompleteSearchContainer)
);
