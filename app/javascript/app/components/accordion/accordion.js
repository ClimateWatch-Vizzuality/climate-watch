import { createElement } from 'react';
import { withRouter } from 'react-router';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import qs from 'query-string';
import AccordionComponent from './accordion-component';

const mapStateToProps = (state, { location }) => {
  const search = qs.parse(location.search);
  const activeSection = search.activeSection ? search.activeSection : null;
  return {
    activeSection
  };
};

const AccordionContainer = props => {
  const handleOnClick = slug => {
    const { location, history } = props;
    const search = qs.parse(location.search);
    const newSlug = search.activeSection === slug ? 'none' : slug;
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
