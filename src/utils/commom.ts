export const jsonParse = (str: string): any | null => {
  let v = null;
  try {
    v = JSON.parse(str);
  } catch (e) {}

  return v;
};

export const getQuery = () => {
  const items = location.hash.split('?')[1];
  const urlSearch = new URLSearchParams(items);
  return Object.fromEntries(urlSearch.entries());
};

export const isBase64 = (str: string): boolean => {
  if (!str || !str.trim()) {
    return false;
  }
  try {
    return btoa(atob(str)) == str;
  } catch (err) {
    return false;
  }
};

export const isDataURL = (dataurl: string): boolean => {
  const arr = dataurl.split(',');
  if (!arr[0].startsWith('data:image/')) {
    return false;
  }
  if (!isBase64(arr[1])) {
    return false;
  }

  return true;
};