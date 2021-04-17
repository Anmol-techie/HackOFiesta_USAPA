import { useState, useCallback, useEffect } from "react";

const useInput = (initialValue = "") => {
  const [value, setValue] = useState(initialValue);

  const onChange = useCallback((event) => {
    setValue(event.target.value);
  }, []);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return {
    value,
    setValue,
    bind: {
      value,
      onChange,
    },
  };
};

export default useInput;
