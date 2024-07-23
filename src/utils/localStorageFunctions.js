export const setValuesLocalStorage = (key, token) => {
  return localStorage.setItem(key, token);
};
export const getValuesLocalStorage = (key) => {
  return localStorage.getItem(key);
};
