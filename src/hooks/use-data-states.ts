import { useState } from "react";

export const useDataStates = <T>() => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<null | string>(null);

  return {
    loading,
    setLoading,
    data,
    setData,
    error,
    setError,
  };
};
