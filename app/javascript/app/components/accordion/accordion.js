import { createElement, useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import qs from 'query-string';
import { getLocationParamUpdated } from 'utils/navigation';

import AccordionComponent from './accordion-component';

const mapStateToProps = (state, { location, param }) => {
  const search = qs.parse(location.search);
  const openSlug = search[param] || null;
  return {
    openSlug
  };
};

const AccordionContainer = props => {
  const { data, param, history, location } = props;
  const { openSlug } = props;
  const [updatedOpenSlug, setOpenSlug] = useState(openSlug);
  useEffect(() => {
    if (data.length === 1) setOpenSlug(data[0].slug);
  }, []);

  const updateUrlParam = (params, clear) => {
    history.replace(getLocationParamUpdated(location, params, clear));
  };

  const handleOnClick = (slug, open) => {
    const newSlug = !open ? slug : 'none';
    updateUrlParam({ name: param, value: newSlug });
  };

  return createElement(AccordionComponent, {
    ...props,
    handleOnClick,
    openSlug: openSlug || updatedOpenSlug
  });
};

AccordionContainer.propTypes = {
  location: Proptypes.object,
  history: Proptypes.object,
  param: Proptypes.string
};

export default withRouter(connect(mapStateToProps, null)(AccordionContainer));
