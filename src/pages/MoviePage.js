import React, { useState, useEffect } from "react";
import {
  Alert,
  Box,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  InputAdornment,
  Pagination,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { FormProvider } from "../components/form";
import { useForm } from "react-hook-form";
import apiService from "../app/apiService";
import LoadingScreen from "../components/LoadingScreen";
import MovieList from "../components/MovieList";
import { API_KEY } from "../app/config";
import { useParams } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import useFilter from "../hooks/useFilter";
import useGenres from "../hooks/useGenres";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function MoviePage() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchQuery, setSearchQuery] = useState(
    localStorage.getItem("search") === null
      ? ""
      : localStorage.getItem("search")
  );
  const [genreIds, setGenreIds] = useState([]);

  const params = useParams();
  const genres = useGenres();

  const genresFilter = useFilter(genreIds, page);

  const defaultValues = {
    genres: [],
    searchQuery: "",
  };
  const methods = useForm({
    defaultValues,
  });

  useEffect(() => {
    const getMovies = async () => {
      setLoading(true);
      try {
        console.log("searchQuery", searchQuery);
        const res = await apiService.get(
          // typeof searchQuery === "undefined" || searchQuery === ""
          searchQuery === null ||
            searchQuery === "" ||
            typeof searchQuery === "undefined"
            ? `/movie/${params.type}?api_key=${API_KEY}&language=en-US&page=${page}`
            : `/search/movie?query=${searchQuery}&api_key=${API_KEY}&language=en-US&page=${page}&include_adult=false`
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
  }, [searchQuery, params.type, page]);

  return (
    <ThemeProvider theme={darkTheme}>
      <Container
        sx={{
          display: "flex",
          minHeight: "100vh",
          width: "100%",
          margin: "auto",
        }}
      >
        <Stack sx={{ width: "300px", margin: "24px 50px" }}>
          <FormProvider methods={methods}>
            <Stack>
              <FormControl
                component="fieldset"
                sx={{ width: 1, color: "whitesmoke" }}
                variant="standard"
              >
                <FormLabel>
                  <Stack spacing={1}>
                    <Typography variant="h5" sx={{ color: "#e4d804" }}>
                      Genres
                    </Typography>
                    {/* <Button
                      color="inherit"
                      variant="outlined"
                      onClick={() => {
                        localStorage.removeItem("search");
                        localStorage.removeItem("filter");
                        setSearchQuery("");
                        setGenreIds([]);
                      }}
                      startIcon={<ClearAllIcon />}
                    >
                      Clear All
                    </Button> */}
                  </Stack>
                </FormLabel>
                <FormGroup>
                  {genres.map((item) => (
                    <FormControlLabel
                      key={item.id}
                      control={
                        <Checkbox
                          value={item.id}
                          onChange={(e) => {
                            let val = e.target.value;
                            if (!genreIds.includes(val)) {
                              setGenreIds([...genreIds, val]);
                              localStorage.setItem("filter", [
                                ...genreIds,
                                val,
                              ]);
                              setMovies(genresFilter);
                            } else {
                              setGenreIds(
                                genreIds.filter((item) => val !== item)
                              );
                              if (genreIds.length === 1)
                                localStorage.removeItem("filter");

                              setMovies(genresFilter);
                            }
                          }}
                        />
                      }
                      label={item.name}
                    />
                  ))}
                </FormGroup>
              </FormControl>
            </Stack>
          </FormProvider>
        </Stack>
        <Stack sx={{ flexGrow: 1, margin: "0 50px" }}>
          <Stack
            spacing={2}
            direction={{ xs: "column", sm: "row" }}
            alignItems={{ sm: "center" }}
            justifyContent="space-between"
            mb={2}
          >
            <TextField
              value={searchQuery !== null ? searchQuery : ""}
              onChange={(e) => {
                let val = e.target.value;
                if (val !== "") {
                  localStorage.setItem("search", e.target.value);
                  setSearchQuery(e.target.value);
                } else {
                  localStorage.removeItem("search");
                  setSearchQuery("");
                }
              }}
              sx={{ m: 1, width: "50ch", bgcolor: "black" }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Stack>
          <Box sx={{ position: "relative", height: 1 }}>
            {loading ? (
              <LoadingScreen />
            ) : (
              <>
                {error ? (
                  <Alert severity="error">{error}</Alert>
                ) : (
                  <>
                    <MovieList movies={movies} />
                    <Box display="flex" justifyContent="right">
                      <Pagination
                        count={10}
                        page={page}
                        onChange={(event, val) => {
                          setPage(val);
                        }}
                        color="error"
                        sx={{ marginTop: 2, button: { color: "#fff" } }}
                      />
                    </Box>
                  </>
                )}
              </>
            )}
          </Box>
        </Stack>
      </Container>
    </ThemeProvider>
  );
}
export default MoviePage;
