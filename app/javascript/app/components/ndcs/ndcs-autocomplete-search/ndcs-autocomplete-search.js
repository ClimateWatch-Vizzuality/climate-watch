import { PureComponent, createElement } from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getLocationParamUpdated } from 'utils/navigation';
import qs from 'query-string';
import ReactGA from 'react-ga';

import NdcsAutocompleteSearchComponent from './ndcs-autocomplete-search-component';
import {
  getSearchListMeta,
  getSearchListData,
  getOptionSelectedMeta,
  getOptionSelectedData,
  getDocumentSelected,
  documentOptions
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
    data: state.ndcsSdgsMeta.data,
    search
  };
  const searchListData = {
    sdgs: state.ndcsSdgsData.data[match.params.iso]
      ? state.ndcsSdgsData.data[match.params.iso].sdgs
      : {},
    search
  };
  return {
    search,
    iso: match.params.iso,
    searchList: global
      ? getSearchListMeta(searchListMeta)
      : getSearchListData(searchListData),
    optionSelected: global
      ? getOptionSelectedMeta(searchListMeta)
      : getOptionSelectedData(searchListData),
    groups,
    documentOptions,
    documentSelected: getDocumentSelected(searchListData)
  };
};

class NdcsAutocompleteSearchContainer extends PureComponent {
  onSearchChange = option => {
    if (option) {
      this.updateUrlParam([
        { name: 'searchBy', value: option.groupId },
        { name: 'query', value: option.value }
      ]);
      this.handleFetchContent(option);
      ReactGA.event({
        category: 'NDC Search',
        action: 'Searches within an NDC',
        label: option.label
      });
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
      ReactGA.event({
        category: 'NDC Search',
        action: 'Used the main search bar',
        label: e.target.value
      });
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
  iso: Proptypes.string
};

export default withRouter(
  connect(mapStateToProps, null)(NdcsAutocompleteSearchContainer)
);
