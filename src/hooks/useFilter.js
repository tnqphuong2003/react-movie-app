import { useEffect, useState } from "react";
import apiService from "../app/apiService";
import { API_KEY } from "../app/config";

function useFilter(genreIds, page) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  console.log("useFilter", genreIds.join(","));
  useEffect(() => {
    const getResults = async () => {
      setLoading(true);
      try {
        const response = await apiService.get(
          // `/discover/movie?api_key=${API_KEY}&language=en-US&include_adult=false&page=${page}&with_genres=28,35`
          `/discover/movie?api_key=${API_KEY}&language=en-US&include_adult=false&page=${page}&with_genres=${genreIds.join(
            ","
          )}`
        );
        setResults(response.data.results);

        setError("");
      } catch (error) {
        console.log(error);
        setError(error.message);
      }
      setLoading(false);
    };
    getResults();
  }, [genreIds, page]);
  return results;
}
export default useFilter;
