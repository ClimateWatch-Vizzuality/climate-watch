import { createElement, PureComponent } from 'react';
import { withRouter } from 'react-router';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import qs from 'query-string';
import isEmpty from 'lodash/isEmpty';

import actions from './ndc-country-accordion-actions';
import reducers, { initialState } from './ndc-country-accordion-reducers';

import NDCCountryAccordionComponent from './ndc-country-accordion-component';
import { filterNDCs } from './ndc-country-accordion-selectors';

const mapStateToProps = (state, { location, match }) => {
  const search = qs.parse(location.search);
  const activeSection = search.activeSection ? search.activeSection : null;
  const data = state.NDCCountryAccordion.data;
  const ndcsData = {
    data,
    search: search.search,
    countries: match.params.iso ? [match.params.iso] : search.locations.split(',')
  };
  return {
    activeSection,
    data: filterNDCs(ndcsData),
    sectors: data ? data.sectors : null
  };
};

class NDCCountryAccordionContainer extends PureComponent {
  componentWillMount() {
    const { location, match, fetchNDCCountryAccordion, category } = this.props;
    const { iso } = match.params;
    const locations = iso || qs.parse(location.search).locations;
    fetchNDCCountryAccordion(locations, category);
  }

  handleOnClick = slug => {
    const { history, location } = this.props;
    const search = qs.parse(location.search);
    const newSlug =
      search.activeSection === slug || !search.activeSection ? 'none' : slug;
    const newSearch = { ...search, activeSection: newSlug };

    history.replace({
      pathname: location.pathname,
      search: qs.stringify(newSearch)
    });
  };

  render() {
    return createElement(NDCCountryAccordionComponent, {
      ...this.props,
      handleOnClick: this.handleOnClick
    });
  }
}

NDCCountryAccordionContainer.propTypes = {
  location: Proptypes.object,
  history: Proptypes.object,
  match: Proptypes.object,
  loading: Proptypes.bool,
  fetched: Proptypes.bool,
  category: Proptypes.string,
  fetchNDCCountryAccordion: Proptypes.func
};

export { actions, reducers, initialState };

export default withRouter(connect(mapStateToProps, actions)(NDCCountryAccordionContainer));
