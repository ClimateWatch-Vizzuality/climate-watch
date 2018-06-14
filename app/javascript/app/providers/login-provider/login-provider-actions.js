import { createAction, createThunkAction } from 'redux-tools';
import { CWAPI } from 'services/api';

export const getUserInit = createAction('getUserInit');
export const getUserReady = createAction('getUserReady');
export const getUserFail = createAction('getUserFail');
export const updateUserFirstName = createAction('updateUserFirstName');
export const updateUserLastName = createAction('updateUserLastName');
export const updateUserOrganization = createAction('updateUserOrganization');
export const updateUserSector = createAction('updateUserSector');
export const updateUserCountry = createAction('updateUserCountry');
export const updateUserDataUsage = createAction('updateUserDataUsage');
export const updateUserTester = createAction('updateUserTester');
export const profileUpdated = createAction('profileUpdated');
export const profileUpdateError = createAction('profileUpdateError');

export const getUser = createThunkAction('getUser', () => (dispatch, state) => {
  const { login } = state();
  if (!login.loading) {
    dispatch(getUserInit());
    CWAPI.get('my_cw/user')
      .then(user => dispatch(getUserReady(user)))
      .catch(e => {
        console.warn(e);
        dispatch(getUserFail());
      });
  }
});

export const saveUserData = createThunkAction(
  'saveUserData',
  () => (dispatch, getState) => {
    const { login } = getState();
    CWAPI.patch(`my_cw/users/${login.user.user_id.id}`, login.user.user_id)
      .then(dispatch(profileUpdated()))
      .catch(e => {
        console.warn(e);
        dispatch(profileUpdateError());
      });
  }
);
