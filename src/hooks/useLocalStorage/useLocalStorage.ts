import { useState } from "react";

type HookReturnValue<D> = [D, (value: D) => void];

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

const useLocalStorage = <T>(
  key: string,
  initialValue: T
): HookReturnValue<T> => {
  const [storedValue, setStoredValue] = useState(() =>
    getValueFromLocalStorage(key, initialValue)
  );

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

  return [storedValue, setValue];
};

export default useLocalStorage;
