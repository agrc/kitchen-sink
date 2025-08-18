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

const LIST_SEPARATOR = '_';

type ParameterNames = 'scale' | 'center' | 'basemap';
type UrlParameterTypes = string | boolean | number[] | number;

export function setUrlParameter<T extends UrlParameterTypes>(
  name: ParameterNames,
  value: T | null,
) {
  const url = new URL(window.location.href);
  if (Array.isArray(value)) {
    if (value.length === 0) {
      url.searchParams.delete(name);
    } else {
      url.searchParams.set(name, value.join(LIST_SEPARATOR));
    }
  } else {
    if (value === null) {
      url.searchParams.delete(name);
    } else {
      url.searchParams.set(name, value.toString());
    }
  }

  window.history.replaceState({}, '', url.toString());
}

export function getUrlParameter<T extends UrlParameterTypes>(
  name: ParameterNames,
  type: 'string' | 'boolean' | 'number[]' | 'number',
  defaultValue?: T,
): T | null {
  const url = new URL(window.location.href);
  const value = url.searchParams.get(name);

  if (value === null || value.trim() === '') {
    if (defaultValue !== undefined) {
      return defaultValue;
    }

    return null;
  }

  if (type === 'boolean') {
    return (value === 'true') as T;
  }

  if (type === 'number[]') {
    return value.split(LIST_SEPARATOR).map(Number) as T;
  }

  if (type === 'number') {
    return Number(value) as T;
  }

  if (type === 'string') {
    return value as T;
  }

  throw new Error(`Unsupported type: ${type}`);
}
