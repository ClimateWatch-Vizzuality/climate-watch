import { createAction, createThunkAction } from 'redux-tools';
import { CWAPI } from 'services/api';
import { deleteCookie } from 'utils/cookies';

export const getUserInit = createAction('getUserInit');
export const getUserReady = createAction('getUserReady');
export const getUserFail = createAction('getUserFail');
export const profileUpdated = createAction('profileUpdated');
export const profileUpdateError = createAction('profileUpdateError');
export const updateUserData = createAction('updateUserData');
export const deleteUserData = createAction('deleteUserData');

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
  formData => (dispatch, getState) => {
    dispatch(updateUserData(formData));
    const { login } = getState();
    CWAPI.patch(`my_cw/users/${login.user.user_id.id}`, formData)
      .then(dispatch(profileUpdated()))
      .catch(e => {
        console.warn(e);
        dispatch(profileUpdateError());
      });
  }
);

export const logout = createThunkAction('logout', () => dispatch => {
  deleteCookie('user_token');
  dispatch(deleteUserData());
});
