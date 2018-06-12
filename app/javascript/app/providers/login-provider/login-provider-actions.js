import { createAction, createThunkAction } from 'redux-tools';
import { CWAPI } from 'services/api';

export const getUserInit = createAction('getUserInit');
export const getUserReady = createAction('getUserReady');
export const getUserFail = createAction('getUserFail');
export const updateUserName = createAction('updateUserName');
export const updateUserOrganization = createAction('updateUserOrganization');
export const updateUserAreaOfWork = createAction('updateUserAreaOfWork');

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
    CWAPI.patch(
      `my_cw/users/${login.user.user_id.id}`,
      login.user.user_id
    ).catch(e => {
      console.warn(e);
    });
  }
);
