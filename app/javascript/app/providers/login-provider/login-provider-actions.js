import { createAction, createThunkAction } from 'redux-tools';
import { CWAPI } from 'services/api';

export const getUserInit = createAction('getUserInit');
export const getUserReady = createAction('getUserReady');
export const getUserFail = createAction('getUserFail');

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
