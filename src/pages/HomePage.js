import React from "react";
import { Container } from "@mui/material";
import PopularMovies from "../components/PopularMovies";
import MovieLatest from "../components/MovieLatest";

function HomePage() {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        width: "100%",
        margin: "10px auto",
      }}
    >
      <MovieLatest />
      <PopularMovies />
    </Container>
  );
}

export default HomePage;
