import { LOGIN_URL, LOGIN_PARAMS } from 'data/constants';

export const getLoginUrlBySocial = social =>
  `${LOGIN_URL}${social}${LOGIN_PARAMS}`;
