import keyBy from 'lodash/keyBy';
import mergeWith from 'lodash/mergeWith';
import union from 'lodash/union';

export const initialState = {
  loading: false,
  loaded: false,
  data: {},
  error: false
};

const setLoading = (loading, state) => ({ ...state, loading });
const setLoaded = (loaded, state) => ({ ...state, loaded });
const setError = (state, error) => ({ ...state, error });

export default {
  fetchIndicatorsInit: state => setLoading(true, state),
  fetchIndicatorsReady: (state, { payload }) => {
    const byIndicator = keyBy(payload, 'slug');
    const newData = mergeWith(
      state.data,
      byIndicator,
      (oldValues, newValues, key) => {
        if (key === 'values') {
          return union(oldValues, newValues);
        }
        return undefined;
      }
    );
    const newState = {
      ...state,
      data: { ...newData }
    };
    return setLoaded(true, setLoading(false, newState));
  },
  fetchIndicatorsFail: state => setLoading(setError(state, true), false)
};
