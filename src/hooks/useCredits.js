import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiService from "../app/apiService";
import { API_KEY } from "../app/config";
import { AuthContext } from "../contexts/AuthContext";

const useCredits = () => {
  const [credits, setCredits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const params = useParams();

  useEffect(() => {
    const getCast = async () => {
      setLoading(true);
      try {
        const response = await apiService.get(
          `/movie/${params.id}/credits?api_key=${API_KEY}&language=en-US`
        );
        setCredits(response.data);

        setError("");
      } catch (error) {
        console.log(error);
        setError(error.message);
      }
      setLoading(false);
    };
    getCast();
  }, []);
  return credits;
};

export default useCredits;
