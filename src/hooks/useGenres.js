import { useEffect, useState } from "react";
import apiService from "../app/apiService";
import { API_KEY } from "../app/config";

const useGenres = () => {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getGenresFilter = async () => {
      setLoading(true);
      try {
        const response = await apiService.get(
          `/genre/movie/list?api_key=${API_KEY}&language=en-US`
        );
        setGenres(response.data.genres);

        setError("");
      } catch (error) {
        console.log(error);
        setError(error.message);
      }
      setLoading(false);
    };
    getGenresFilter();
  }, []);
  return genres;
};

export default useGenres;
