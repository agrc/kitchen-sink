import { describe, expect, it } from 'vitest';
import { toQueryString } from './url';

describe('toQueryString', () => {
  it('should not include null and undefined values in the query string', () => {
    const params = {
      name: 'John',
      age: null,
      city: undefined,
      country: 'USA',
    };
    const queryString = toQueryString(params);
    expect(queryString).toBe('name=John&country=USA');
  });
});
