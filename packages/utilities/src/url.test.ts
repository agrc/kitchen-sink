import { toQueryString } from './url';
import { describe, it, expect } from 'vitest';

describe('toQueryString', () => {
  it('should not include null and undefined values in the query string', () => {
    const params: Record<string, any> = {
      name: 'John',
      age: null,
      city: undefined,
      country: 'USA',
    };
    const queryString = toQueryString(params);
    expect(queryString).toBe('name=John&country=USA');
  });
});
