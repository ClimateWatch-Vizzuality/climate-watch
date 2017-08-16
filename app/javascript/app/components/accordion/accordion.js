import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import Component from './accordion-component';

const data = [
  {
    title: 'Climate change mitigation',
    slug: 'climate-change-mitigation',
    definitions: [
      {
        title: 'Type of targets',
        description:
          'Absolute target: 36% GHG emissions reduction compared to 2005 by 2025, 43% by 2030 (indicative)'
      },
      {
        title: 'Costs of mitigation / investment needs',
        description: 'no (partial) costs mentioned'
      },
      {
        title: 'Focus on renewable energy',
        description:
          'Focus area: increase RE share to 45% by 2030 (Solar power, wind power, biomass, hydropower)'
      }
    ]
  },
  {
    title: 'Climate Change Adaptation',
    slug: 'climate-change-adaption',
    definitions: [
      {
        title: 'Type of targets',
        description:
          'Absolute target: 36% GHG emissions reduction compared to 2005 by 2025, 43% by 2030 (indicative)'
      },
      {
        title: 'Costs of mitigation / investment needs',
        description: 'no (partial) costs mentioned'
      },
      {
        title: 'Focus on renewable energy',
        description:
          'Focus area: increase RE share to 45% by 2030 (Solar power, wind power, biomass, hydropower)'
      }
    ]
  }
];

const mapStateToProps = (state, { location }) => ({
  location,
  data
});

export default withRouter(connect(mapStateToProps, null)(Component));
