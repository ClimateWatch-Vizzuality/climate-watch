import * as actions from './login-provider-actions';

export const initialState = {
  loading: false,
  loaded: false,
  logged: false,
  profileUpdated: false,
  profileUpdateError: false,
  user: {}
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
  [actions.updateUserData]: (state, { payload }) => {
    const user = state.user;
    const newUserData = state.user.user_id;
    newUserData.first_name = payload.firstName;
    newUserData.last_name = payload.lastName;
    newUserData.organization = payload.organization;
    newUserData.sector = payload.sector.value;
    newUserData.country = payload.country.value;
    newUserData.data_usage = payload.dataUsage;
    newUserData.tester = payload.tester;
    return updateUserState(state, user, newUserData);
  },
  [actions.deleteUserData]: state => ({
    ...state,
    logged: false,
    user: {}
  }),
  [actions.profileUpdated]: state => ({
    ...state,
    profileUpdated: true,
    profileUpdateError: false
  }),
  [actions.profileUpdateError]: state => ({
    ...state,
    profileUpdated: false,
    profileUpdateError: true
  })
};
