import {
  Box,
  Chip,
  ImageList,
  ImageListItem,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ScheduleIcon from "@mui/icons-material/Schedule";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import useCredits from "../hooks/useCredits";
import useDetails from "../hooks/useDetails";
import { IMAGE_URL } from "../app/config";
import StarBorderIcon from "@mui/icons-material/StarBorder";

function srcSet(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

function DetailPage() {
  const movie = useDetails();
  const cast = useCredits();

  return (
    <Stack
      direction="row"
      spacing={3}
      sx={{ margin: "auto", padding: "50px", bgcolor: "#000" }}
    >
      <Box sx={{ border: "5px solid #E4D804", borderRadius: "5px" }}>
        <img
          width={372}
          src={`${IMAGE_URL}${movie.poster_path}`}
          srcSet={`${IMAGE_URL}${movie.poster_path}`}
          alt={movie.title}
          loading="lazy"
        />
      </Box>
      <Stack spacing={2} sx={{ paddingLeft: "50px" }}>
        <Typography variant="h3" fontWeight="bold" sx={{ color: "whitesmoke" }}>
          {movie.title}
        </Typography>
        <Stack direction="row" spacing={4} sx={{ color: "whitesmoke" }}>
          <Stack direction="row">
            <Rating
              value={movie.vote_average / 2}
              size="small"
              emptyIcon={
                <StarBorderIcon style={{ color: "white" }} fontSize="inherit" />
              }
            />
            <Typography fontSize={14}>
              {" "}
              - {"("}
              {movie.vote_count}
              {")"}
            </Typography>
          </Stack>
          <Stack direction="row">
            <ScheduleIcon sx={{ color: "#E4D804" }} fontSize="small" />
            <Typography fontSize={14}> {movie.runtime} minutes </Typography>
          </Stack>
          <Stack direction="row">
            <CalendarMonthIcon sx={{ color: "#E4D804" }} fontSize="small" />
            <Typography fontSize={14}>
              {new Date(Date.parse(movie.release_date)).getFullYear()}
            </Typography>
          </Stack>
        </Stack>
        <Stack direction="row" spacing={1}>
          {movie.genres?.map((item) => (
            <Chip
              key={item.id}
              label={item.name}
              variant="outline"
              color="primary"
            ></Chip>
          ))}
        </Stack>
        <Typography fontWeight="bold" sx={{ color: "#E4D804" }}>
          Overview:
        </Typography>
        <Typography sx={{ color: "whitesmoke" }}>{movie.overview}</Typography>
        <Stack>
          <Typography fontWeight="bold" sx={{ color: "#E4D804" }}>
            Cast:{console.log(cast)}
          </Typography>
          <Box>
            <ImageList sx={{ width: "100%" }} cols={6}>
              {cast.cast?.slice(0, 6).map((item) => (
                <ImageListItem
                  key={item.id}
                  cols={item.cols || 1}
                  rows={item.rows || 1}
                >
                  <img
                    {...srcSet(
                      `${IMAGE_URL}${item.profile_path}`,
                      121,
                      item.rows,
                      item.cols
                    )}
                    alt={item.title}
                    loading="lazy"
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </Box>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default DetailPage;
