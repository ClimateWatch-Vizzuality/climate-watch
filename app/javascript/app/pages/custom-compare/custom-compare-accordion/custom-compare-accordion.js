import React from 'react';
import CutomCompareAccrdionComponent from './custom-compare-accordion-component';

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

const CutomCompareAccrdion = () => (
  <CutomCompareAccrdionComponent data={placeholderData} />
);

export default CutomCompareAccrdion;
