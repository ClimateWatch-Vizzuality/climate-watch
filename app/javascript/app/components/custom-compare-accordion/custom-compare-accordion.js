import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import qs from 'query-string';

import CustomCompareAccordionProvider from 'providers/custom-compare-accordion-provider';
import CustomCompareAccordionComponent from './custom-compare-accordion-component';

const mapStateToProps = (state, { location, category }) => {
  const search = qs.parse(location.search);

  return {
    loading:
      state.customCompareAccordion && state.customCompareAccordion.loading,
    compareData:
      state.customCompareAccordion && state.customCompareAccordion.data,
    search,
    category,
    locationsAndDocuments: search && search.targets
  };
};

const CustomCompareAccordion = props => {
  const isSectoralInformation = props.category === 'sectoral_information';

  return (
    <div>
      <CustomCompareAccordionComponent
        {...props}
        data={[]}
        isSectoralInformation={isSectoralInformation}
      />
      <CustomCompareAccordionProvider
        locationsDocuments={props.locationsAndDocuments}
        category={props.category}
      />
    </div>
  );
};

CustomCompareAccordion.propTypes = {
  category: PropTypes.string,
  locationsAndDocuments: PropTypes.string
};

export default withRouter(
  connect(mapStateToProps, null)(CustomCompareAccordion)
);

// export default CustomCompareAccordion;

// const placeholderData = [
//   {
//     slug: 'planning_and_implementation',
//     title: 'Planning and Implementation',
//     definitions: [
//       {
//         slug: 'finance_and_support',
//         title: 'Finance and Support',
//         descriptions: [
//           { iso: 'ALB', value: 'No' },
//           { iso: 'ATG', value: 'Yes' },
//           { iso: 'AND', value: 'No' }
//         ]
//       },
//       {
//         slug: 'indc_summary',
//         title: 'NDC summary',
//         descriptions: [
//           {
//             iso: 'ALB',
//             value:
//               'Reduce CO2 emissions compared to the baseline scen…708 kT carbon-dioxide emission reduction in 2030.'
//           },
//           { iso: 'ATG', value: '-' },
//           {
//             iso: 'AND',
//             value:
//               '37% (193.73 Gg CO2eq) reduction in 2030 compared to the BAU scenario'
//           }
//         ]
//       }
//     ]
//   },
//   {
//     slug: 'summary_information',
//     title: 'Summary Information'
//   }
// ];

// const sectoralInfoData = [
//   {
//     slug: 'planning_and_implementation',
//     title: 'Title 1',
//     sectors: [
//       {
//         ...placeholderData[0],
//         parent: { id: 1, name: 'Subtitle 1' }
//       },
//       {
//         ...placeholderData[1],
//         parent: { id: 2, name: 'Subtitle 2' }
//       }
//     ]
//   },
//   {
//     slug: 'summary_information',
//     title: 'Title 2'
//   }
// ];
