import ky from 'ky';

const SPACE = ' ';
const SPACES = / +/;
const INVALID_CHARS = /[^a-zA-Z0-9]/g;
const client = ky.create({
  prefixUrl: 'https://api.mapserv.utah.gov/api/v1/',
});

const removeInvalidChars = (data) =>
  data.toString().replace(INVALID_CHARS, SPACE);
const trimSpaces = (data) => data.replace(SPACES, SPACE).trim();

const cleanseStreet = (data) => {
  // & -> and
  let street = trimSpaces(removeInvalidChars(data)).replace('&', 'and');

  return street.trim();
};

const cleanseZone = (data) => {
  let zone = trimSpaces(removeInvalidChars(data));

  if (zone.length > 0 && zone[0] == '8') {
    zone = zone.slice(0, 5);
  }

  return zone;
};

export const geocode = async (
  apiKey,
  street,
  zone,
  options = {
    spatialReference: undefined,
    format: undefined,
    callback: undefined,
    acceptScore: undefined,
    suggest: undefined,
    locators: undefined,
    poBox: undefined,
    scoreDifference: undefined,
  },
  signal,
) => {
  street = cleanseStreet(street);
  zone = cleanseZone(zone);

  if (!street.length || !zone.length) {
    return {
      message: 'Invalid street or zone',
    };
  }

  options.apiKey = apiKey;

  let response;

  try {
    response = await client
      .get(`geocode/${street}/${zone}/`, {
        searchParams: options,
        signal,
      })
      .json();
  } catch (error) {
    try {
      response = await error.response.json();
    } catch {
      response = { error: error.message };
    }

    return {
      status: error.response?.status, // response is undefined when got throws
      message: response?.error ?? response?.message,
    };
  }

  return response.result;
};

export const search = async (
  apiKey,
  table,
  fields,
  options = {
    predicate: undefined,
    geometry: undefined,
    spatialReference: undefined,
    buffer: undefined,
    attributeStyle: 'identical',
  },
  signal,
) => {
  // validate table and fields
  if (!table || !fields || !fields.length) {
    return {
      message: 'Invalid table or fields',
    };
  }

  options.apiKey = apiKey;

  let response;

  try {
    response = await client
      .get(`search/${table}/${fields.join(',')}/`, {
        searchParams: options,
        signal,
      })
      .json();
  } catch (error) {
    try {
      response = await error.response.json();
    } catch {
      response = { error: error.message };
    }

    return {
      status: error.response?.status, // response is undefined when got throws
      message: response?.error ?? response?.message,
    };
  }

  return response.result;
};
