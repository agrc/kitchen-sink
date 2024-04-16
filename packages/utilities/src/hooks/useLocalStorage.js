import { useState } from 'react';

export default function (key, initialValue, parseWithJSON = false) {
  const getValueFromLocalStorage = () => {
    const value = localStorage.getItem(key);

    return parseWithJSON ? JSON.parse(value) : value;
  };

  const [value, setValue] = useState(
    () => getValueFromLocalStorage() ?? initialValue,
  );

  const setNewValue = (newValue) => {
    setValue(newValue);
    localStorage.setItem(
      key,
      parseWithJSON ? JSON.stringify(newValue) : newValue,
    );
  };

  return [value, setNewValue];
}
