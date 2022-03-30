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
  props => (dispatch, state) => {
    const { ndcsPreviousComparison } = state();
    const { document } = props || {};

    if (ndcsPreviousComparison && !ndcsPreviousComparison.loading) {
      dispatch(fetchPreviousNDCComparisonInit());
      const params = [];
      if (document && document !== 'all') {
        params.push(`document=${document}`);
      }

      apiWithCache
        .get(
          `/api/v1/ndcs?subcategory=overall_comparison_with_previous_ndc${
            params.length ? `&${params.join('&')}` : ''
          }`
        )
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
