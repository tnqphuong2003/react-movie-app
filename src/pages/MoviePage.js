import React, { useState, useEffect } from "react";
import { Alert, Box, Container, Pagination, Stack } from "@mui/material";
import { FormProvider } from "../components/form";
import { useForm } from "react-hook-form";
import apiService from "../app/apiService";
import orderBy from "lodash/orderBy";
import LoadingScreen from "../components/LoadingScreen";
import MovieSearch from "../components/MovieSearch";
import MovieList from "../components/MovieList";
import MovieFilter from "../components/MovieFilter";
import { API_KEY } from "../app/config";
import { filter } from "lodash";

function MoviePage() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const defaultValues = {
    genres: [],
    // category: "All",
    // priceRange: "",
    // sortBy: "featured",
    searchQuery: "",
  };
  const methods = useForm({
    defaultValues,
  });
  const { watch, reset } = methods;
  const filters = watch();
  const filterMovies = applyFilter(movies, filters);

  useEffect(() => {
    const getMovies = async () => {
      setLoading(true);
      try {
        const res = await apiService.get(
          `/movie/now_playing?api_key=${API_KEY}&language=en-US&page=${page}`
        );
        setMovies(res.data.results);
        setError("");
      } catch (error) {
        console.log(error);
        setError(error.message);
      }
      setLoading(false);
    };
    getMovies();
  }, [page]);

  return (
    <Container sx={{ display: "flex", minHeight: "100vh", mt: 3 }}>
      <Stack>
        <FormProvider methods={methods}>
          <MovieFilter resetFilter={reset} />
        </FormProvider>
      </Stack>
      <Stack sx={{ flexGrow: 1 }}>
        <FormProvider methods={methods}>
          <Stack
            spacing={2}
            direction={{ xs: "column", sm: "row" }}
            alignItems={{ sm: "center" }}
            justifyContent="space-between"
            mb={2}
          >
            <MovieSearch />
            {/* <MovieSort /> */}
          </Stack>
        </FormProvider>
        <Box sx={{ position: "relative", height: 1 }}>
          {loading ? (
            <LoadingScreen />
          ) : (
            <>
              {error ? (
                <Alert severity="error">{error}</Alert>
              ) : (
                <>
                  <Box display="flex" justifyContent="right">
                    <Pagination
                      count={10}
                      page={page}
                      onChange={(event, val) => {
                        setPage(val);
                      }}
                      color="error"
                      sx={{ button: { color: "#000" } }}
                    />
                  </Box>
                  <MovieList movies={filterMovies} />
                </>
              )}
            </>
          )}
        </Box>
      </Stack>
    </Container>
  );
}

function applyFilter(movies, filters) {
  const { sortBy } = filters;
  let filteredMovies = movies;

  // SORT BY
  if (sortBy === "featured") {
    filteredMovies = orderBy(movies, ["sold"], ["desc"]);
  }
  if (sortBy === "newest") {
    filteredMovies = orderBy(movies, ["createdAt"], ["desc"]);
  }
  if (sortBy === "priceDesc") {
    filteredMovies = orderBy(movies, ["price"], ["desc"]);
  }
  if (sortBy === "priceAsc") {
    filteredMovies = orderBy(movies, ["price"], ["asc"]);
  }

  // FILTER movieS
  if (typeof filters.genres !== "undefined") {
    if (filters.genres.length > 0) {
      filteredMovies = movies.filter((movie) =>
        movie.genre_ids.some((item) => filters.genres.includes(item))
      );
      console.log(filteredMovies);
    }
  }

  if (filters.searchQuery) {
    filteredMovies = movies.filter((movie) =>
      movie.title.toLowerCase().includes(filters.searchQuery.toLowerCase())
    );
  }
  return filteredMovies;
}

export default MoviePage;
