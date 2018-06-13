import * as actions from './login-provider-actions';

export const initialState = {
  loading: false,
  loaded: false,
  logged: false,
  profileUpdated: false,
  user: {},
  error: false
};

function updateUserState(state, user, newUserData) {
  return {
    ...state,
    user: { ...user, user_id: { ...newUserData } },
    profileUpdated: false
  };
}

export default {
  [actions.getUserInit]: state => ({
    ...state,
    loading: true,
    profileUpdated: false
  }),
  [actions.getUserReady]: (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: true,
    user: payload,
    logged: true,
    profileUpdated: false
  }),
  [actions.getUserFail]: state => ({
    ...state,
    loading: false,
    loaded: true,
    logged: false,
    error: true,
    profileUpdated: false
  }),
  [actions.updateUserFirstName]: (state, { payload }) => {
    const user = state.user;
    const newUserData = state.user.user_id;
    newUserData.first_name = payload;
    return updateUserState(state, user, newUserData);
  },
  [actions.updateUserLastName]: (state, { payload }) => {
    const user = state.user;
    const newUserData = state.user.user_id;
    newUserData.last_name = payload;
    return updateUserState(state, user, newUserData);
  },
  [actions.updateUserOrganization]: (state, { payload }) => {
    const user = state.user;
    const newUserData = state.user.user_id;
    newUserData.organization = payload;
    return updateUserState(state, user, newUserData);
  },
  [actions.updateUserSector]: (state, { payload }) => {
    const user = state.user;
    const newUserData = state.user.user_id;
    newUserData.sector = payload.value;
    return updateUserState(state, user, newUserData);
  },
  [actions.updateUserCountry]: (state, { payload }) => {
    const user = state.user;
    const newUserData = state.user.user_id;
    newUserData.country = payload.value;
    return updateUserState(state, user, newUserData);
  },
  [actions.updateUserDataUsage]: (state, { payload }) => {
    const user = state.user;
    const newUserData = state.user.user_id;
    newUserData.data_usage = payload;
    return updateUserState(state, user, newUserData);
  },
  [actions.updateUserTester]: (state, { payload }) => {
    const user = state.user;
    const newUserData = state.user.user_id;
    newUserData.tester = payload;
    return updateUserState(state, user, newUserData);
  },
  [actions.profileUpdated]: state => ({ ...state, profileUpdated: true })
};
