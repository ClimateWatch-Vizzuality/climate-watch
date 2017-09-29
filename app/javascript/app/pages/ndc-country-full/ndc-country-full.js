import { createElement, PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Proptypes from 'prop-types';
import qs from 'query-string';

import NDCCountryFullComponent from './ndc-country-full-component';
import actions from './ndc-country-full-actions';
import {
  getCountry,
  getContent,
  getSelectedContent,
  getContentOptions
} from './ndc-country-full-selectors';

export { default as component } from './ndc-country-full-component';
export { initialState } from './ndc-country-full-reducers';
export { default as reducers } from './ndc-country-full-reducers';
export { default as actions } from './ndc-country-full-actions';

const mapStateToProps = (state, { match }) => {
  const search = qs.parse(location.search);
  const { iso } = match.params;

  return {
    fetched: getContent(state, iso),
    loading: state.countryNDCFull.loading,
    country: getCountry(state, iso),
    content: getSelectedContent(state, iso),
    contentOptions: getContentOptions(state, iso),
    search: search.search
  };
};

class NDCCountryFullContainer extends PureComponent {
  componentWillMount() {
    const { match, fetched, loading, fetchCountryNDCFull } = this.props;
    const { iso } = match.params;
    const search = qs.parse(location.search);
    if (iso && !loading && !fetched) {
      fetchCountryNDCFull(iso, search.search);
    }
  }

  onSearchChange = query => {
    const { match, history, location, fetchCountryNDCFull } = this.props;
    const { iso } = match.params;
    const search = qs.parse(location.search);
    const newSearch = { ...search, search: query };

    history.replace({
      pathname: location.pathname,
      search: qs.stringify(newSearch)
    });
    fetchCountryNDCFull(iso, query);
  };

  onSelectChange = args => {
    const { changeSelectedCountryNDCFull } = this.props;
    changeSelectedCountryNDCFull(args.value);
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
  fetchCountryNDCFull: Proptypes.func,
  changeSelectedCountryNDCFull: Proptypes.func
};

export default withRouter(
  connect(mapStateToProps, actions)(NDCCountryFullContainer)
);
