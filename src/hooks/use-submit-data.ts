import { useState } from "react";
import { BASE_URL } from "../utils/urls";

type Options = {
  method?: "POST" | "PUT";
};

export const useSubmitData = <T>(endpoint: string, options: Options = { method: "POST" }) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = (body: T) => {
    setLoading(true);
    setTimeout(() => {
      fetch(`${BASE_URL}${endpoint}`, {
        method: options.method,
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((data) => {
          setData(data);
          setError(null);
        })
        .catch((err) => {
          setError(err.message);
          setData(null);
        })
        .finally(() => setLoading(false));
    }, 1000);
  };

  return { data, loading, error, submit };
};
