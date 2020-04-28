import React from 'react';
import PropTypes from 'prop-types';
import CustomCompareAccordionComponent from './custom-compare-accordion-component';

const placeholderData = [
  {
    slug: 'planning_and_implementation',
    title: 'Planning and Implementation',
    definitions: [
      {
        slug: 'finance_and_support',
        title: 'Finance and Support',
        descriptions: [
          { iso: 'ALB', value: 'No' },
          { iso: 'ATG', value: 'Yes' },
          { iso: 'AND', value: 'No' }
        ]
      },
      {
        slug: 'indc_summary',
        title: 'NDC summary',
        descriptions: [
          {
            iso: 'ALB',
            value:
              'Reduce CO2 emissions compared to the baseline scen…708 kT carbon-dioxide emission reduction in 2030.'
          },
          { iso: 'ATG', value: '-' },
          {
            iso: 'AND',
            value:
              '37% (193.73 Gg CO2eq) reduction in 2030 compared to the BAU scenario'
          }
        ]
      }
    ]
  },
  {
    slug: 'summary_information',
    title: 'Summary Information'
  }
];

const sectoralInfoData = [
  {
    slug: 'planning_and_implementation',
    title: 'Title 1',
    sectors: [
      {
        ...placeholderData[0],
        parent: { id: 1, name: 'Subtitle 1' }
      },
      {
        ...placeholderData[1],
        parent: { id: 2, name: 'Subtitle 2' }
      }
    ]
  },
  {
    slug: 'summary_information',
    title: 'Title 2'
  }
];

const CustomCompareAccordion = props => {
  const isSectoralInformation = props.category === 'sectoral_information';

  return (
    <CustomCompareAccordionComponent
      {...props}
      data={isSectoralInformation ? sectoralInfoData : placeholderData}
      isSectoralInformation={isSectoralInformation}
    />
  );
};

CustomCompareAccordion.propTypes = {
  category: PropTypes.string
};

export default CustomCompareAccordion;
