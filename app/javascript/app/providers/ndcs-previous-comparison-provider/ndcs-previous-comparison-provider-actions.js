import { createAction } from 'redux-actions';
import { createThunkAction } from 'utils/redux';
import { apiWithCache } from 'services/api';
import { getValueWithLabelId } from 'utils/indctransform';

const fetchPreviousNDCComparisonInit = createAction(
  'fetchPreviousNDCComparisonInit'
);
const fetchPreviousNDCComparisonReady = createAction(
  'fetchPreviousNDCComparisonReady'
);
const fetchPreviousNDCComparisonFail = createAction(
  'fetchPreviousNDCComparisonFail'
);

const fetchPreviousNDCComparison = createThunkAction(
  'fetchPreviousNDCComparison',
  () => (dispatch, state) => {
    const { ndcsPreviousComparison } = state();

    if (ndcsPreviousComparison && !ndcsPreviousComparison.loading) {
      dispatch(fetchPreviousNDCComparisonInit());

      apiWithCache
        .get('/api/v1/ndcs?subcategory=overall_comparison_with_previous_ndc')
        .then(data => getValueWithLabelId(data.data))
        .then(data => {
          dispatch(fetchPreviousNDCComparisonReady(data));
        })
        .catch(error => {
          console.info(error);
          dispatch(fetchPreviousNDCComparisonFail());
        });
    }
  }
);

export default {
  fetchPreviousNDCComparison,
  fetchPreviousNDCComparisonInit,
  fetchPreviousNDCComparisonReady,
  fetchPreviousNDCComparisonFail
};
