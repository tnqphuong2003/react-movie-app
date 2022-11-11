import { Box, Rating, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiService from "../app/apiService";
import { API_KEY, IMAGE_URL } from "../app/config";
import ScheduleIcon from "@mui/icons-material/Schedule";

function DetailPage() {
  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const params = useParams();

  // const classes = useStyles();

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
  return (
    <Stack direction="row" spacing={3} sx={{ margin: "auto", padding: "50px" }}>
      <Box>
        <img
          src={`${IMAGE_URL}${movie.poster_path}`}
          srcSet={`${IMAGE_URL}${movie.poster_path}`}
          alt={movie.title}
          loading="lazy"
        />
      </Box>
      <Stack spacing={1}>
        <Typography variant="h5" fontWeight="bold">
          {movie.title} -{" "}
          {new Date(Date.parse(movie.release_date)).getFullYear()}
        </Typography>
        <Stack direction="row">
          <ScheduleIcon color="error" size="small" />
          <Typography color="error"> {movie.runtime} minutes </Typography>
        </Stack>
        <Stack direction="row">
          <Rating value={movie.vote_average / 2} size="small" />
          <Typography fontSize={12}>
            {" "}
            - {"("}
            {movie.vote_count}
            {")"}
          </Typography>
        </Stack>
        <Typography fontWeight="bold">Overview:</Typography>
        <Typography>{movie.overview}</Typography>
      </Stack>
    </Stack>
  );
}

export default DetailPage;
