import { createElement } from 'react';
import { withRouter } from 'react-router';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import qs from 'query-string';

import actions from './ndc-country-accordion-actions';
import reducers, { initialState } from './ndc-country-accordion-reducers';

import NDCCountryAccordionComponent from './ndc-country-accordion-component';
import { filterNDCs } from './ndc-country-accordion-selectors';

const mapStateToProps = (state, { location, match }) => {
  const search = qs.parse(location.search);
  const activeSection = search.activeSection ? search.activeSection : null;
  const ndcsData = {
    data: state.NDCCountryAccordion.data[match.params.iso],
    search: search.search,
    countries: [match.params.iso]
  };
  return {
    activeSection,
    data: filterNDCs(ndcsData)
  };
};

const NDCCountryAccordionContainer = props => {
  const { location, match, history, fetchNDCCountryAccordion, loading, fetched } = props;
  const { iso } = match.params;
  if (iso && !loading && !fetched) {
    // fetchNDCCountryAccordion(iso);
  }

  const handleOnClick = slug => {
    const search = qs.parse(location.search);
    const newSlug =
      search.activeSection === slug || !search.activeSection ? 'none' : slug;
    const newSearch = { ...search, activeSection: newSlug };

    history.replace({
      pathname: location.pathname,
      search: qs.stringify(newSearch)
    });
  };

  return createElement(NDCCountryAccordionComponent, {
    ...props,
    handleOnClick
  });
};

NDCCountryAccordionContainer.propTypes = {
  location: Proptypes.object,
  history: Proptypes.object
};

export { actions, reducers, initialState };

export default withRouter(connect(mapStateToProps, actions)(NDCCountryAccordionContainer));
