import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function useFetch(url, query = "") {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);

        const endpoint = query ? `${url}?${query}` : url;
        const { data } = await axios.get(endpoint);

        setData(data);
      } catch (err) {
        setData([]);
        toast.error(err?.message || "Failed to fetch data");
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [query, url]);

  return { isLoading, data };
}
