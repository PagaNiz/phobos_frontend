import api from "@/services/api";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

type Data<T> = {
  meta: {
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
    first_page: number;
    first_page_url: string;
    last_page_url: string;
    next_page_url: string | null;
    previous_page_url: string | null;
  };
  data: T[];
};

export function useReloadTables<T>(url: string) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);

  const effectRun = useRef(false);

  useEffect(() => {
    const abortController = new AbortController();
    const loadData = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(url, { signal: abortController.signal });
        setData(data.data);
      } catch (error) {
        console.error(error);
        toast.error("Erro ao carregar a lista.");
      } finally {
        setLoading(false);
      }
    };
    if (effectRun.current) {
      loadData();
    }

    return () => {
      abortController.abort();
      setData([]);
      setLoading(false);
      effectRun.current = true;
    };
  }, [url]);

  return {
    data,
    loading,
  };
}
