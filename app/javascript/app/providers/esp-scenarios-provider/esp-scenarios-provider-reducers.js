import * as actions from './esp-scenadios-provider-actions';

export const initialState = {
  loading: false,
  loaded: false,
  data: {}
};

const setLoading = (loading, state) => ({ ...state, loading });
const setLoaded = (loaded, state) => ({ ...state, loaded });

export default {
  [actions.fetchEspScenariosInit]: state => setLoading(true, state),
  [actions.fetchEspScenariosReady]: (state, { payload }) =>
    setLoaded(true, setLoading(false, { ...state, data: payload })),
  [actions.fetchEspScenariosFail]: state => setLoading(false, { ...state })
};
