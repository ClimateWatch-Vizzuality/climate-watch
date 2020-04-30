import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import qs from 'query-string';
import CustomCompareAccordionProvider from 'providers/custom-compare-accordion-provider';

import {
  getData,
  getSectoralInformationData
} from './custom-compare-accordion-selectors';
import CustomCompareAccordionComponent from './custom-compare-accordion-component';

const mapStateToProps = (state, { location, category }) => {
  const search = qs.parse(location.search);
  const isSectoralInformation = category === 'sectoral_information';
  return {
    data: isSectoralInformation
      ? getSectoralInformationData(state, { search, category })
      : getData(state, { search, category }),
    loading:
      state.customCompareAccordion && state.customCompareAccordion.loading,
    category,
    locationsAndDocuments: search && search.targets,
    isSectoralInformation
  };
};

const CustomCompareAccordion = props => (
  <React.Fragment>
    <CustomCompareAccordionComponent {...props} />
    <CustomCompareAccordionProvider
      locationsDocuments={props.locationsAndDocuments}
      category={props.category}
    />
  </React.Fragment>
);

CustomCompareAccordion.propTypes = {
  category: PropTypes.string,
  locationsAndDocuments: PropTypes.string
};

export default withRouter(
  connect(mapStateToProps, null)(CustomCompareAccordion)
);
