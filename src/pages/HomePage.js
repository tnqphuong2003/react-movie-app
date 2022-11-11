import React, { useState, useEffect } from "react";
import { Alert, Box, Container, Stack } from "@mui/material";
import { FormProvider } from "../components/form";
import { useForm } from "react-hook-form";
import apiService from "../app/apiService";
import orderBy from "lodash/orderBy";
import LoadingScreen from "../components/LoadingScreen";
import TopRatedMovies from "../components/TopRatedMovies";
import PopularMovies from "../components/PopularMovies";

function HomePage() {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        mt: 3,
      }}
    >
      <TopRatedMovies />
      <PopularMovies />
    </Container>
  );
}

export default HomePage;
