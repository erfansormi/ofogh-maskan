import axiosInstance from "../lib/axios";
import { useEffect, useState } from "react";
import { useDataStates } from "./use-data-states";

export const useFetch = <T>(endpoint: string) => {
  const { data, error, loading, setData, setError, setLoading } = useDataStates<T>();

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      axiosInstance
        .get(endpoint)
        .then((res) => {
          setData(res.data);
          setError(null);
        })
        .catch((err) => {
          setError(err.message);
          setData(null);
        })
        .finally(() => setLoading(false));
    }, 1000);
  }, [endpoint]);

  return { data, loading, error };
};
