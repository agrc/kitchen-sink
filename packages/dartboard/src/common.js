export const toQueryString = (obj) =>
  Object.keys(obj)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]))
    .join('&')
    .replace(/%20/g, '+');
