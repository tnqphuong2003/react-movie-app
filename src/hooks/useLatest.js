import { useEffect, useState } from "react";
import apiService from "../app/apiService";
import { API_KEY } from "../app/config";

const useLatest = () => {
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getResults = async () => {
      setLoading(true);
      try {
        const response = await apiService.get(
          `/movie/436270?api_key=${API_KEY}&language=en-US`
        );
        setResult(response.data);

        setError("");
      } catch (error) {
        console.log(error);
        setError(error.message);
      }
      setLoading(false);
    };
    getResults();
  }, []);
  return result;
};

export default useLatest;
