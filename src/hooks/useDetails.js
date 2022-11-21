import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiService from "../app/apiService";
import { API_KEY } from "../app/config";

const useDetails = () => {
  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const params = useParams();

  useEffect(() => {
    const getLatestMovies = async () => {
      setLoading(true);
      try {
        const response = await apiService.get(
          `/movie/${params.id}?api_key=${API_KEY}&language=en-US`
        );
        setMovie(response.data);
        console.log(movie);
        setError("");
      } catch (error) {
        console.log(error);
        setError(error.message);
      }
      setLoading(false);
    };
    getLatestMovies();
  }, []);
  return movie;
};
export default useDetails;
