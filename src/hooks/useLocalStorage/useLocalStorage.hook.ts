import { useState, useEffect } from "react";

type HookReturnValue<D> = [D | null, (value: D) => void];

const getValueFromLocalStorage = <P>(key: string, initialValue: P): P => {
  if (typeof window === "undefined") {
    return initialValue;
  }
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  } catch (error) {
    console.log(error);
    return initialValue;
  }
};

export const useLocalStorage = <T>(
  key: string,
  initialValue: T
): HookReturnValue<T> => {
  const [storedValue, setStoredValue] = useState<T | null>(null);

  const setValue = (value: T) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);

      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const value = getValueFromLocalStorage(key, initialValue);
    setStoredValue(value);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [storedValue, setValue];
};
