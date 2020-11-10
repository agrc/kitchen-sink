export const toQueryString = (obj) =>
  Object.keys(obj)
    .filter(key => obj[key] !== null)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]))
    .join('&')
    .replace(/%20/g, '+');
