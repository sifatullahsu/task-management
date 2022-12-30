export const getLocalStorage = () => {
  const data = localStorage.getItem('task-data');

  if (data) {
    return JSON.parse(data);
  }

  return null;
}

export const setLocalStorage = (key, value) => {
  const dataLS = getLocalStorage();
  const data = dataLS === null ? {} : dataLS;

  data[key] = value;

  return localStorage.setItem('task-data', JSON.stringify(data));;
}