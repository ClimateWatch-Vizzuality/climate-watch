import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import CustomCompareAccordionProvider from 'providers/custom-compare-accordion-provider';

import {
  getData,
  getSectoralInformationData
} from './custom-compare-accordion-selectors';
import CustomCompareAccordionComponent from './custom-compare-accordion-component';

const targetsToURLParams = targets => {
  const parsedTargets =
    targets &&
    targets.map(({ country, document }) => `${country}-${document}`).join(',');
  return parsedTargets;
};

const mapStateToProps = (state, { category, targets }) => {
  const isSectoralInformation = category === 'sectoral_information';
  const data = isSectoralInformation
    ? getSectoralInformationData(state, {
      category,
      targets
    })
    : getData(state, {
      category,
      targets
    });
  return {
    data,
    loading:
      (state.customCompareAccordion && state.customCompareAccordion.loading) ||
      !data, // data should be an array when loaded
    category,
    targets,
    isSectoralInformation
  };
};

const CustomCompareAccordion = props => {
  const targetsURLParams = targetsToURLParams(props.targets);
  return (
    <React.Fragment>
      <CustomCompareAccordionComponent
        locationsDocuments={targetsURLParams}
        {...props}
      />
      <CustomCompareAccordionProvider
        locationsDocuments={targetsURLParams}
        category={props.category}
      />
    </React.Fragment>
  );
};

CustomCompareAccordion.propTypes = {
  category: PropTypes.string,
  locationsAndDocuments: PropTypes.string,
  targets: PropTypes.array
};

export default withRouter(
  connect(mapStateToProps, null)(CustomCompareAccordion)
);
