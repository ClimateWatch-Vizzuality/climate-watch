import { createAction } from 'redux-actions';
import { createThunkAction } from 'utils/redux';
import { CWAPI } from 'services/api';
import { LOGOUT_URL } from 'data/constants';

const getUserInit = createAction('getUserInit');
const getUserReady = createAction('getUserReady');
const getUserFail = createAction('getUserFail');
const profileUpdated = createAction('profileUpdated');
const profileUpdateError = createAction('profileUpdateError');
const updateUserData = createAction('updateUserData');
const deleteUserData = createAction('deleteUserData');

const getUser = createThunkAction('getUser', () => (dispatch, state) => {
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
  CWAPI.get(LOGOUT_URL)
    .then(dispatch(deleteUserData()))
    .catch(e => {
      console.warn(e);
    });
});

export default {
  getUserInit,
  getUserReady,
  getUserFail,
  profileUpdated,
  profileUpdateError,
  updateUserData,
  deleteUserData,
  getUser
};
