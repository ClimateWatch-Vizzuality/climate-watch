import { createAction } from 'redux-actions';
import { createThunkAction } from 'utils/redux';
import isEmpty from 'lodash/isEmpty';

const BASE_URL = '/api/v1/lse_laws_and_policies';

const generateApiEndpoint = iso => `${BASE_URL}/${iso}`;

const fetchLawsAndPoliciesInit = createAction('fetchLawsAndPoliciesInit');
const fetchLawsAndPoliciesReady = createAction('fetchLawsAndPoliciesReady');

const fetchLawsAndPolicies = createThunkAction(
  'fetchLawsAndPolicies',
  ({ iso }) => (dispatch, state) => {
    const { lawsAndPolicies } = state();
    if (
      lawsAndPolicies &&
      isEmpty(lawsAndPolicies.data[iso]) &&
      !lawsAndPolicies.loading
    ) {
      dispatch(fetchLawsAndPoliciesInit());
      fetch(generateApiEndpoint(iso))
        .then(response => {
          if (response.ok) return response.json();
          throw Error(response.statusText);
        })
        .then(data => {
          if (data) {
            const dataEnhanced = { iso_code3: iso, payload: data };
            dispatch(fetchLawsAndPoliciesReady(dataEnhanced));
          } else dispatch(fetchLawsAndPoliciesReady({}));
        })
        .catch(error => {
          console.info(error);
          dispatch(
            fetchLawsAndPoliciesReady({
              iso_code3: iso,
              payload: { payload: null }
            })
          );
        });
    }
  }
);

export default {
  fetchLawsAndPolicies,
  fetchLawsAndPoliciesInit,
  fetchLawsAndPoliciesReady
};
