import { useEffect, useState } from "react";

export function useQuery<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [status, setStatus] = useState<"idle"|"loading"|"error"|"success">("idle");
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    let alive = true;
    setStatus("loading");
    fetch(url)
      .then(response => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
      })
      .then(data => { if (alive) { setData(data); setStatus("success"); }})
      .catch(error => { if (alive) { setError(error); setStatus("error"); }});
    return () => { alive = false };
  }, [url]);

  return { data, status, error };
}
