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
