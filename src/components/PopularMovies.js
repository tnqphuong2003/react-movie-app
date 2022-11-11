import { Box, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiService from "../app/apiService";
import { API_KEY, IMAGE_URL } from "../app/config";

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
        {movies.slice(0, 3).map((movie, index) => (
          <Stack
            direction="row"
            key={index}
            style={{
              width: "400px",
              display: "flex",
              flexDirection: "row",
              mr: "20px",
              marginBottom: "5px",
            }}
          >
            <Box
              style={{
                width: "50%",
                height: "180px",
              }}
            >
              <img
                style={{
                  width: "180px",
                  objectFit: "cover",
                }}
                src={`${IMAGE_URL}${movie.backdrop_path}`}
                srcSet={`${IMAGE_URL}${movie.backdrop_path}`}
                alt={movie.title}
                loading="lazy"
                onClick={() => navigate(`/movie/${movie.id}`)}
              />
            </Box>
            <Box
              style={{
                width: "50%",
                height: "170px",
                padding: "0 2 0px",
                position: "relative",
              }}
            >
              <Typography variant="h5" gutterBottom component="div" noWrap>
                {movie.title}
              </Typography>
              <Typography fontSize={12}>{movie.release_date}</Typography>
            </Box>
          </Stack>
        ))}
      </Stack>
    </>
  );
}

export default PopularMovies;
