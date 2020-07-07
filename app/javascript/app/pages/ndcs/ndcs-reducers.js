import uniqBy from 'lodash/uniqBy';

export const initialState = {
  loading: false,
  loaded: false,
  error: false,
  data: {}
};

const setLoading = (state, loading) => ({ ...state, loading });
const setError = (state, error) => ({ ...state, error });
const setLoaded = (state, loaded) => ({ ...state, loaded });

export default {
  fetchNDCSInit: state => setLoading(state, true),
  fetchNDCSReady: (state, { payload }) =>
    (!state.data || !payload
      ? null
      : setLoaded(
        setLoading(
          {
            ...state,
            data: {
              categories: {
                ...state.data.categories,
                ...payload.categories
              },
              sectors: {
                ...state.data.sectors,
                ...payload.sectors
              },
              indicators: uniqBy(
                (state.data.indicators || []).concat(payload.indicators),
                'id'
              )
            }
          },
          false
        ),
        true
      )),
  fetchNDCSFail: state => setError(state, true)
};
