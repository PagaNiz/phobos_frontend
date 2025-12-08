// import api from "@/services/api";
// import { useCallback, useEffect, useRef, useState } from "react";
// import { toast } from "react-toastify";

// type Data<T> = {
//   meta: {
//     total: number;
//     per_page: number;
//     current_page: number;
//     last_page: number;
//     first_page: number;
//     first_page_url: string;
//     last_page_url: string;
//     next_page_url: string | null;
//     previous_page_url: string | null;
//   };
//   data: T[];
// };

// export function useReloadTables<T>(url: string) {
//   const [data, setData] = useState<T[]>([]);
//   const [loading, setLoading] = useState(false);

//   const abortControllerRef = useRef<AbortController | null>(null);

//   const loadData = useCallback(async () => {
//     if (abortControllerRef.current) {
//       abortControllerRef.current.abort();
//     }

//     const abortController = new AbortController();
//     abortControllerRef.current = abortController;

//     setLoading(true);
//     try {
//       const response = await api.get(url, { signal: abortController.signal });
//       setData(response.data.data);
//     } catch (error: unknown) {
//       if (error instanceof Error && error.name !== "CanceledError") {
//         console.error(error);
//         toast.error("Erro ao carregar a lista.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   }, [url]);

//   useEffect(() => {
//     loadData();
//     return () => {
//       abortControllerRef.current?.abort();
//     };
//   }, [loadData]);

//   return {
//     data,
//     loading,
//     reload: loadData,
//   };
// }
