import { useState } from 'react';

export default function useLocalStorage<T>(
  key: string,
  initialValue: T,
  parseWithJSON = false,
): [T, (newValue: T) => void] {
  const getValueFromLocalStorage = (): T => {
    const value = localStorage.getItem(key);
    return parseWithJSON ? JSON.parse(value || 'null') : value;
  };

  const [value, setValue] = useState<T>(
    () => getValueFromLocalStorage() ?? initialValue,
  );

  const setNewValue = (newValue: T) => {
    setValue(newValue);
    localStorage.setItem(
      key,
      parseWithJSON
        ? JSON.stringify(newValue)
        : (newValue as unknown as string),
    );
  };

  return [value, setNewValue];
}
