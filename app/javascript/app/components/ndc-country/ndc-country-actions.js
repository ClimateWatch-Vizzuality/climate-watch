import { createAction } from 'redux-actions';
import { createThunkAction } from 'utils/redux';

const fetchCountryNDCInit = createAction('fetchCountryNDCInit');
const fetchCountryNDCReady = createAction('fetchCountryNDCReady');

const fetchCountryNDC = createThunkAction(
  'fetchCountryNDC',
  iso => (dispatch) => {
    dispatch(fetchCountryNDCInit());

    const exampleNDC = [
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

    setTimeout(() => {
      dispatch(
        fetchCountryNDCReady({
          [iso]: exampleNDC
        })
      );
    }, 1000);
  }
);

export default {
  fetchCountryNDC,
  fetchCountryNDCInit,
  fetchCountryNDCReady
};
