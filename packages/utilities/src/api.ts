import ky from 'ky';

const SPACE = ' ';
const SPACES = / +/;
const INVALID_CHARS = /[^a-zA-Z0-9]/g;
const client = ky.create({
  prefixUrl: 'https://api.mapserv.utah.gov/api/v1/',
});

const removeInvalidChars = (data: string): string =>
  data.toString().replace(INVALID_CHARS, SPACE);
const trimSpaces = (data: string): string => data.replace(SPACES, SPACE).trim();

const cleanseStreet = (data: string): string => {
  // & -> and
  let street = trimSpaces(removeInvalidChars(data)).replace(/&/g, 'and');

  return street.trim();
};

const cleanseZone = (data: string): string => {
  let zone = trimSpaces(removeInvalidChars(data));

  if (zone.length > 0 && zone[0] == '8') {
    zone = zone.slice(0, 5);
  }

  return zone;
};

type GeocodeOptions = {
  spatialReference?: string;
  format?: string;
  callback?: string;
  acceptScore?: number;
  suggest?: boolean;
  locators?: string;
  poBox?: boolean;
  scoreDifference?: number;
};

type SearchOptions = {
  predicate?: string;
  geometry?: string;
  spatialReference?: number;
  buffer?: number;
  attributeStyle?: string;
};

export type ApiErrorResponse = {
  status?: number;
  message: string;
};

export type ApiGeocodeResponse = {
  status: number;
  result: {
    location: {
      x: number;
      y: number;
    };
    score: number;
    locator: string;
    matchAddress: string;
    inputAddress: string;
    standardizedAddress: string;
    addressGrid: string;
  };
};

export const geocode = async (
  apiKey: string,
  street: string,
  zone: string,
  options: GeocodeOptions = {},
  signal?: AbortSignal,
): Promise<ApiGeocodeResponse['result'] | ApiErrorResponse> => {
  street = cleanseStreet(street);
  zone = cleanseZone(zone);

  if (!street.length || !zone.length) {
    return {
      message: 'Invalid street or zone',
    };
  }

  let response;

  try {
    response = (await client
      .get(`geocode/${street}/${zone}/`, {
        searchParams: {
          ...options,
          apiKey,
        },
        signal,
      })
      .json()) as ApiGeocodeResponse;
  } catch (error: any) {
    try {
      response = await error.response.json();
    } catch {
      response = { error: error.message };
    }

    return {
      status: error.response?.status,
      message: response?.error ?? response?.message,
    };
  }

  return response.result;
};

export type SearchResponse = {
  status: number;
  result: {
    attributes: Record<string, any>;
    geometry?: __esri.GeometryProperties & {
      type: 'point' | 'multipoint' | 'polyline' | 'polygon' | 'extent' | 'mesh';
    };
  }[];
};

export const search = async (
  apiKey: string,
  table: string,
  fields: string[],
  options: SearchOptions = {},
  signal?: AbortSignal,
): Promise<SearchResponse['result'] | ApiErrorResponse> => {
  // validate table and fields
  if (!table || !fields || !fields.length) {
    return {
      message: 'Invalid table or fields',
    };
  }

  let response;

  try {
    response = (await client
      .get(`search/${table}/${fields.join(',')}/`, {
        searchParams: {
          ...options,
          apiKey,
        },
        signal,
      })
      .json()) as SearchResponse;
  } catch (error: any) {
    try {
      response = await error.response.json();
    } catch {
      response = { error: error.message };
    }

    return {
      status: error.response?.status,
      message: response?.error ?? response?.message,
    };
  }

  return response.result;
};
