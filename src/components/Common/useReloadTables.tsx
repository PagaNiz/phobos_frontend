import api from "@/services/api";
import { useCallback, useEffect, useState } from "react";
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

export const triggerReloadTables = () => {
  window.dispatchEvent(new Event("reloadTables"));
};

export function useReloadTables<T>(url: string) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  const reloadTable = useCallback(() => {
    setReloadKey((prev) => prev + 1);
  }, []);

  useEffect(() => {
    const handleReload = () => reloadTable();
    window.addEventListener("reloadTables", handleReload);

    return () => {
      window.removeEventListener("reloadTables", handleReload);
    };
  }, [reloadTable]);

  useEffect(() => {
    const abortController = new AbortController();
    const loadData = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(url, { signal: abortController.signal });
        setData(data.data);
      } catch (error: any) {
        if (error.name !== "CanceledError" && error.code !== "ERR_CANCELED") {
          console.error(error);
          toast.error("Erro ao carregar a lista.");
        }
      } finally {
        if (!abortController.signal.aborted) {
          setLoading(false);
        }
      }
    };

    loadData();

    return () => {
      abortController.abort();
    };
  }, [url, reloadKey]);

  return {
    data,
    loading,
    reloadTable,
  };
}
