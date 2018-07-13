export const getCookie = name => {
  const v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)'); // eslint-disable-line
  return v ? v[2] : null;
};

export const deleteCookie = name => {
  document.cookie = document.cookie.replace(getCookie(name), '');
};
