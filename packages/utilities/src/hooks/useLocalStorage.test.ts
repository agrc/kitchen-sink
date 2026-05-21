import { act, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import useLocalStorage from './useLocalStorage';

describe('useLocalStorage', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it('can parse using JSON', () => {
    const localStorageMock = {
      getItem: vi.fn().mockReturnValue('{"a":1}'),
      setItem: vi.fn(),
    };
    vi.stubGlobal('localStorage', localStorageMock);

    const { result } = renderHook(() => useLocalStorage<{ a: number }>('key', { a: 1 }, true));

    expect(localStorageMock.getItem).toHaveBeenCalledWith('key');
    expect(result.current[0]).toEqual({ a: 1 });

    act(() => {
      result.current[1]({ a: 2 });
    });

    expect(localStorageMock.setItem).toHaveBeenCalledWith('key', '{"a":2}');
  });

  it('returns the initial value if none is in storage', () => {
    const localStorageMock = {
      getItem: vi.fn().mockReturnValue(undefined),
      setItem: vi.fn(),
    };
    vi.stubGlobal('localStorage', localStorageMock);

    const initialValue = 'test value';

    const { result } = renderHook(() => useLocalStorage<string>('key', initialValue));

    expect(result.current[0]).toEqual(initialValue);
  });

  it('returns the value from storage if it exists', () => {
    const localStorageValue = 'changed value';
    const localStorageMock = {
      getItem: vi.fn().mockReturnValue(localStorageValue),
      setItem: vi.fn(),
    };
    vi.stubGlobal('localStorage', localStorageMock);

    const initialValue = 'test value';

    const { result } = renderHook(() => useLocalStorage<string>('key', initialValue));

    expect(result.current[0]).toEqual(localStorageValue);
  });
});
