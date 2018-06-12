import * as actions from './login-provider-actions';

export const initialState = {
  loading: false,
  loaded: false,
  logged: false,
  user: {},
  error: false
};

export default {
  [actions.getUserInit]: state => ({ ...state, loading: true }),
  [actions.getUserReady]: (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: true,
    user: payload,
    logged: true
  }),
  [actions.getUserFail]: state => ({
    ...state,
    loading: false,
    loaded: true,
    logged: false,
    error: true
  }),
  [actions.updateUserName]: (state, { payload }) => {
    const user = state.user.user_id;
    user.name = payload;
    return { ...state, ...user };
  },
  [actions.updateUserOrganization]: (state, { payload }) => {
    const user = state.user.user_id;
    user.organization = payload;
    return { ...state, ...user };
  },
  [actions.updateUserAreaOfWork]: (state, { payload }) => {
    const user = state.user.user_id;
    user.areaOfWork = payload;
    return { ...state, ...user };
  }
};
