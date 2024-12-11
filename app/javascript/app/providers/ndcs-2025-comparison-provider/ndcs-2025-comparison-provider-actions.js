import { createAction } from 'redux-actions';
import { createThunkAction } from 'utils/redux';
import { apiWithCache } from 'services/api';
import { getValueWithLabelId } from 'utils/indctransform';

const fetch2025NDCComparisonInit = createAction(
  'fetch2025NDCComparisonInit'
);
const fetch2025NDCComparisonReady = createAction(
  'fetch2025NDCComparisonReady'
);
const fetch2025NDCComparisonFail = createAction(
  'fetch2025NDCComparisonFail'
);

const fetch2025NDCComparison = createThunkAction(
  'fetch2025NDCComparison',
  () => (dispatch, state) => {
    const { ndcs2025Comparison } = state();

    if (ndcs2025Comparison && !ndcs2025Comparison.loading) {
      dispatch(fetch2025NDCComparisonInit());

      apiWithCache
        .get(
          '/api/v1/ndcs?indicators=2025_compare_1,2025_compare_2,2025_compare_3,2025_compare_4,2025_compare_5'
        )
        .then(data => getValueWithLabelId(data.data))
        .then(data => {
          dispatch(fetch2025NDCComparisonReady(data));
        })
        .catch(error => {
          console.info(error);
          dispatch(fetch2025NDCComparisonFail());
        });
    }
  }
);

export default {
  fetch2025NDCComparison,
  fetch2025NDCComparisonInit,
  fetch2025NDCComparisonReady,
  fetch2025NDCComparisonFail
};
