export const toQueryString = (
  obj: Record<string, string | number | boolean | null | undefined>,
): string =>
  Object.keys(obj)
    .filter((key) => obj[key] !== null && obj[key] !== undefined)
    .map(
      (key) =>
        encodeURIComponent(key) +
        '=' +
        encodeURIComponent(obj[key] as string | number | boolean),
    )
    .join('&')
    .replace(/%20/g, '+');
