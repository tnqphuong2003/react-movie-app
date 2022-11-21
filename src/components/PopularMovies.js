import { Box, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiService from "../app/apiService";
import { API_KEY, IMAGE_URL } from "../app/config";
import MovieList from "./MovieList";

const page = 1;

function PopularMovies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getLatestMovies = async () => {
      setLoading(true);
      try {
        const response = await apiService.get(
          `/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`
        );
        setMovies(response.data.results);
        console.log(movies.slice(0, 3));
        setError("");
      } catch (error) {
        console.log(error);
        setError(error.message);
      }
      setLoading(false);
    };
    getLatestMovies();
  }, []);
  return (
    <>
      <Typography variant="h5">POPULAR </Typography>
      <Stack spacing={4} direction="row">
        <MovieList movies={movies.slice(2, 6)} />
      </Stack>
    </>
  );
}

export default PopularMovies;
