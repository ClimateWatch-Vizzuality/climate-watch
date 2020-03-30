import { PureComponent, createElement } from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getLocationParamUpdated } from 'utils/navigation';
import qs from 'query-string';
import { handleAnalytics } from 'utils/analytics';
import actions from './ndcs-autocomplete-search-actions';
import NdcsAutocompleteSearchComponent from './ndcs-autocomplete-search-component';
import reducers, { initialState } from './ndcs-autocomplete-search-reducers';

import {
  getSearchListMeta,
  getSearchListData,
  getOptionSelectedMeta,
  getOptionSelectedData,
  getDocumentSelected,
  getDocumentOptions
} from './ndcs-autocomplete-search-selectors';

const groups = [
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
  const { location, match, global } = props;
  const search = qs.parse(location.search);
  const searchListMeta = {
    data: state.ndcsSdgsMeta.data
  };
  const searchListData = {
    sdgs: state.ndcsSdgsData.data[match.params.iso]
      ? state.ndcsSdgsData.data[match.params.iso].sdgs
      : {}
  };
  return {
    search,
    iso: match.params.iso,
    documentOptions: getDocumentOptions(state, search),
    documentSelected: getDocumentSelected(state, search),
    searchList: global
      ? getSearchListMeta(searchListMeta, search)
      : getSearchListData(searchListData, search),
    optionSelected: global
      ? getOptionSelectedMeta(searchListMeta, search)
      : getOptionSelectedData(searchListData, search),
    groups
  };
};

class NdcsAutocompleteSearchContainer extends PureComponent {
  componentDidMount() {
    this.props.fetchNDCSDocuments();
  }

  onSearchChange = option => {
    if (option) {
      this.updateUrlParam([
        { name: 'searchBy', value: option.groupId },
        { name: 'query', value: option.value }
      ]);
      this.handleFetchContent(option);
      handleAnalytics('NDC Search', 'Searches within an NDC', option.label);
    }
  };

  onDocumentChange = option => {
    if (option) {
      this.updateUrlParam([{ name: 'document', value: option.value }]);
    }
  };

  handleKeyUp = e => {
    if (e.key === 'Enter') {
      this.onSearchChange({
        label: e.target.value,
        value: e.target.value,
        groupId: 'query'
      });
      handleAnalytics('NDC Search', 'Used the main search bar', e.target.value);
    }
  };

  handleFetchContent = option => {
    const { fetchSearchResults, iso } = this.props;
    if (option && option.groupId) {
      const search = {
        searchBy: option.groupId,
        query: option.value
      };
      fetchSearchResults({ search, iso });
    }
  };

  updateUrlParam(params, clear) {
    const { history, location } = this.props;
    history.replace(getLocationParamUpdated(location, params, clear));
  }

  render() {
    return createElement(NdcsAutocompleteSearchComponent, {
      ...this.props,
      handleKeyUp: this.handleKeyUp,
      onSearchChange: this.onSearchChange,
      onDocumentChange: this.onDocumentChange
    });
  }
}

NdcsAutocompleteSearchContainer.propTypes = {
  history: Proptypes.object.isRequired,
  location: Proptypes.object,
  fetchSearchResults: Proptypes.func,
  fetchNDCSDocuments: Proptypes.func,
  iso: Proptypes.string
};

export { actions, reducers, initialState };

export default withRouter(
  connect(mapStateToProps, actions)(NdcsAutocompleteSearchContainer)
);
