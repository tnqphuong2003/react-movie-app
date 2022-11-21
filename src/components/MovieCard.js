import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { IMAGE_URL } from "../app/config";

function MovieCard({ movie }) {
  const navigate = useNavigate();

  return (
    <Card onClick={() => navigate(`/movie/${movie.id}`)}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="350"
          image={`${IMAGE_URL}${movie.poster_path}`}
          alt={movie.title}
        />
        <CardContent>
          <Typography gutterBottom variant="body1" component="div" noWrap>
            {movie.title}
          </Typography>
          <Stack spacing={0.5} justifyContent="flex-end">
            <Typography fontSize={12}>{movie.release_date}</Typography>
            <Rating value={3} size="small" />
            <Box
              style={{
                border: "5px solid white",
                borderRadius: "50%",
                backgroundColor: "yellow",
                width: "40px",
                height: "40px",
                position: "absolute",
                right: "10px",
                bottom: "10px",
              }}
            >
              <div
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                {movie.vote_average}
              </div>
            </Box>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default MovieCard;
