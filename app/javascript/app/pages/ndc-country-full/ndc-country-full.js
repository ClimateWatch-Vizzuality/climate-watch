import { createElement, PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Proptypes from 'prop-types';
import qs from 'query-string';
import { getLocationParamUpdated } from 'utils/navigation';

import NDCCountryFullComponent from './ndc-country-full-component';
import actions from './ndc-country-full-actions';
import {
  getCountry,
  getSelectedContent,
  getContentOptions,
  getContentOptionSelected
} from './ndc-country-full-selectors';

export { default as component } from './ndc-country-full-component';
export { initialState } from './ndc-country-full-reducers';
export { default as reducers } from './ndc-country-full-reducers';
export { default as actions } from './ndc-country-full-actions';

const mapStateToProps = (state, { match }) => {
  const search = qs.parse(location.search);
  const { iso } = match.params;
  const contentData = {
    content: state.countryNDCFull.data[iso],
    document: search.document,
    iso
  };
  return {
    loading: state.countryNDCFull.loading,
    loaded: state.countryNDCFull.loaded,
    country: getCountry(state, iso),
    content: getSelectedContent(contentData),
    contentOptions: getContentOptions(contentData),
    contentOptionSelected: getContentOptionSelected(contentData),
    idx: search.idx
  };
};

class NDCCountryFullContainer extends PureComponent {
  componentWillMount() {
    const { match, fetched, loading, fetchCountryNDCFull } = this.props;
    const { iso } = match.params;
    const search = qs.parse(location.search);
    if (iso && !loading && !fetched) {
      fetchCountryNDCFull(iso, search);
    }
  }

  onSearchChange = option => {
    const { match, fetchCountryNDCFull } = this.props;
    const { iso } = match.params;
    if (option.groupId) {
      const optionValues = {
        [option.groupId]: option.value
      };
      fetchCountryNDCFull(iso, optionValues);
    }
  };

  onSelectChange = selected => {
    this.updateUrlParam({ name: 'document', value: selected.value });
  };

  updateUrlParam = (params, clear) => {
    const { history, location } = this.props;
    history.replace(getLocationParamUpdated(location, params, clear));
  };

  render() {
    return createElement(NDCCountryFullComponent, {
      ...this.props,
      onSearchChange: this.onSearchChange,
      onSelectChange: this.onSelectChange
    });
  }
}

NDCCountryFullContainer.propTypes = {
  match: Proptypes.object.isRequired,
  history: Proptypes.object.isRequired,
  location: Proptypes.object.isRequired,
  fetched: Proptypes.array,
  loading: Proptypes.bool,
  fetchCountryNDCFull: Proptypes.func
};

export default withRouter(
  connect(mapStateToProps, actions)(NDCCountryFullContainer)
);
