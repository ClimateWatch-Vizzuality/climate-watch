import { createAction } from 'redux-actions';
import { createThunkAction } from 'utils/redux';
import isEmpty from 'lodash/isEmpty';

// TODO: Fill the LSE API endpoint once it is ready
const LSE_BASE_API = '';

const generateApiEndpoint = iso => `${LSE_BASE_API}/${iso}`;

const fetchLawsAndPoliciesInit = createAction('fetchLawsAndPoliciesInit');
const fetchLawsAndPoliciesReady = createAction('fetchLawsAndPoliciesReady');

const fetchLawsAndPolicies = createThunkAction(
  'fetchLawsAndPolicies',
  ({ iso }) => (dispatch, state) => {
    const { lawsAndPolicies } = state();
    if (
      lawsAndPolicies &&
      isEmpty(lawsAndPolicies.data) &&
      !lawsAndPolicies.loading
    ) {
      dispatch(fetchLawsAndPoliciesInit());
      fetch(generateApiEndpoint(iso))
        .then(response => {
          if (response.ok) return response.json();
          throw Error(response.statusText);
        })
        .then(data => {
          dispatch(fetchLawsAndPoliciesReady(data));
        })
        .catch(error => {
          console.info(error);
          dispatch(fetchLawsAndPoliciesReady({}));
        });
    }
  }
);

export default {
  fetchLawsAndPolicies,
  fetchLawsAndPoliciesInit,
  fetchLawsAndPoliciesReady
};
