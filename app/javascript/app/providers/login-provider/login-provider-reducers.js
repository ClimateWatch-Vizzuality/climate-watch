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
  getUserInit: state => ({
    ...state,
    loading: true,
    profileUpdated: false
  }),
  getUserReady: (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: true,
    user: payload,
    logged: true,
    profileUpdated: false
  }),
  getUserFail: state => ({
    ...state,
    loading: false,
    loaded: true,
    logged: false,
    error: true,
    profileUpdated: false
  }),
  updateUserData: (state, { payload }) => {
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
  deleteUserData: state => ({
    ...state,
    logged: false,
    user: {}
  }),
  profileUpdated: state => ({
    ...state,
    profileUpdated: true,
    profileUpdateError: false
  }),
  profileUpdateError: state => ({
    ...state,
    profileUpdated: false,
    profileUpdateError: true
  })
};
