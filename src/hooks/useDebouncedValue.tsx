import React, {useState, useEffect} from 'react';

export const useDebouncedValue = (valueInput: string, time: number = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(valueInput);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(valueInput);
    }, time);

    return () => {
      clearTimeout(timeout);
    };
  }, [valueInput]);

  return debouncedValue;
};
