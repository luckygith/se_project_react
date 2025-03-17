const TOKEN_KEY = "jwt";

export const setToken = (token) => {
  // setToken acccepts token as arg and adds it to localStorage with made key TOKEN_KEY
  localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = () => {
  // retrieve token named TOKEN_KEY
  return localStorage.getItem(TOKEN_KEY);
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};
