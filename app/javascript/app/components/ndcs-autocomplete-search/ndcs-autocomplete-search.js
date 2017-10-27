import { PureComponent, createElement } from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getLocationParamUpdated } from 'utils/navigation';
import qs from 'query-string';

import NdcsAutocompleteSearchComponent from './ndcs-autocomplete-search-component';
import {
  getSearchList,
  getOptionSelected
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
  const { location, match } = props;
  const searchListData = {
    sdgs: state.ndcsSdgsData.data[match.params.iso]
      ? state.ndcsSdgsData.data[match.params.iso].sdgs
      : {},
    search: qs.parse(location.search)
  };
  return {
    searchList: getSearchList(searchListData),
    optionSelected: getOptionSelected(searchListData),
    groups
  };
};

class NdcsAutocompleteSearchContainer extends PureComponent {
  componentWillMount() {
    const search = qs.parse(this.props.location.search).search || '';
    this.props.setNdcsAutocompleteSearch(search);
  }

  handleValueClick = option => {
    this.props.onSearchChange(option);
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
  connect(mapStateToProps, null)(NdcsAutocompleteSearchContainer)
);
