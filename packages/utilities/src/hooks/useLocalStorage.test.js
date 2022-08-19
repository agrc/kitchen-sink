import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import useLocalStorage from './useLocalStorage';

describe('useLocalStorage', () => {
  beforeEach(() => {
    vi.mock('react', () => {
      return {
        useState: (initialValue) => [initialValue(), () => {}],
      };
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('can parse using JSON', () => {
    const localStorageMock = {
      getItem: vi.fn().mockReturnValue('{"a":1}'),
      setItem: vi.fn(),
    };
    vi.stubGlobal('localStorage', localStorageMock);

    const [value, setValue] = useLocalStorage('key', { a: 1 }, true);

    expect(localStorageMock.getItem).toHaveBeenCalledWith('key');
    expect(value).toEqual({ a: 1 });

    setValue({ a: 2 });

    expect(localStorageMock.setItem).toHaveBeenCalledWith('key', '{"a":2}');
  });

  it('returns the initial value if none is in storage', () => {
    const localStorageMock = {
      getItem: vi.fn().mockReturnValue(undefined),
      setItem: vi.fn(),
    };
    vi.stubGlobal('localStorage', localStorageMock);

    const initialValue = 'test value';

    const [value] = useLocalStorage('key', initialValue);

    expect(value).toEqual(initialValue);
  });

  it('returns the value from storage if it exists', () => {
    const localStorageValue = 'changed value';
    const localStorageMock = {
      getItem: vi.fn().mockReturnValue(localStorageValue),
      setItem: vi.fn(),
    };
    vi.stubGlobal('localStorage', localStorageMock);

    const initialValue = 'test value';

    const [value] = useLocalStorage('key', initialValue);

    expect(value).toEqual(localStorageValue);
  });
});
