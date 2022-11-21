import React, { useState, useEffect } from "react";
import { Alert, Box, Container, Stack } from "@mui/material";
import PopularMovies from "../components/PopularMovies";
import MovieLatest from "../components/MovieLatest";

function HomePage() {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <MovieLatest />
      <PopularMovies />
    </Container>
  );
}

export default HomePage;
