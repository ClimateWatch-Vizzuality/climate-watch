import * as actions from './esp-scenarios-provider-actions';

export const initialState = {
  loading: false,
  error: false,
  loaded: false,
  data: {}
};

const setLoading = (loading, state) => ({ ...state, loading });
const setLoaded = (loaded, state) => ({ ...state, loaded });
const setError = (error, state) => ({ ...state, error });

export default {
  [actions.fetchEspScenariosInit]: state => setLoading(true, state),
  [actions.fetchEspScenariosReady]: (state, { payload }) =>
    setError(
      false,
      setLoaded(true, setLoading(false, { ...state, data: payload }))
    ),
  [actions.fetchEspScenariosFail]: state =>
    setError(true, setLoading(false, setLoaded(true, { ...state })))
};
