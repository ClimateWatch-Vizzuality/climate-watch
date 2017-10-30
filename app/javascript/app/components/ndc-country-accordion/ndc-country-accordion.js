import { createElement } from 'react';
import { withRouter } from 'react-router';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import qs from 'query-string';
import AccordionComponent from './ndc-country-accordion-component';

const mapStateToProps = (state, { location, match }) => {
  const search = qs.parse(location.search);
  const activeSection = search.activeSection ? search.activeSection : null;
  const ndcsData = {
    data: state.countryNDC.data[match.params.iso],
    search: search.search,
    countries: [match.params.iso]
  };
  return {
    activeSection,
    ndcsData: filterNDCs(ndcsData)
  };
};

const AccordionContainer = props => {
  const handleOnClick = slug => {
    const { location, history } = props;
    const search = qs.parse(location.search);
    const newSlug =
      search.activeSection === slug || !search.activeSection ? 'none' : slug;
    const newSearch = { ...search, activeSection: newSlug };

    history.replace({
      pathname: location.pathname,
      search: qs.stringify(newSearch)
    });
  };

  return createElement(AccordionComponent, {
    ...props,
    handleOnClick
  });
};

AccordionContainer.propTypes = {
  location: Proptypes.object,
  history: Proptypes.object
};

export default withRouter(connect(mapStateToProps, null)(AccordionContainer));
