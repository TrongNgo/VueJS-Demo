const ID_TOKEN_KEY = "loginInfo";

export const getToken = () => {
  //return window.localStorage.getItem(ID_TOKEN_KEY);

  let loginInfo = window.localStorage.getItem(ID_TOKEN_KEY);
  let token = '';
  if (loginInfo && loginInfo.token) {
    token = loginInfo.token;
  }
  return token;
};

export const saveToken = token => {
  window.localStorage.setItem(ID_TOKEN_KEY, token);
};

export const destroyToken = () => {
  window.localStorage.removeItem(ID_TOKEN_KEY);
};

export default { getToken, saveToken, destroyToken };
