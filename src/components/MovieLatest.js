import {
  Box,
  Button,
  Chip,
  ImageList,
  ImageListItem,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import ScheduleIcon from "@mui/icons-material/Schedule";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { IMAGE_URL } from "../app/config";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import useLatest from "../hooks/useLatest";
import { useNavigate } from "react-router-dom";

function srcSet(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}
function MovieLatest() {
  const movie = useLatest();
  console.log(movie);
  const navigate = useNavigate();

  return (
    <Stack
      direction="row"
      spacing={3}
      sx={{
        width: "100%",
        height: "100vh",
        margin: "auto",
        padding: "50px",
        bgcolor: "#000",
        backgroundImage: `url(${IMAGE_URL}${movie.backdrop_path})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <Stack spacing={3} sx={{ paddingLeft: "50px" }}>
        <Typography variant="h3" fontWeight="bold" sx={{ color: "whitesmoke" }}>
          {movie.title}
        </Typography>
        <Stack direction="row" spacing={4} sx={{ color: "whitesmoke" }}>
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
              sx={{ bgcolor: "gray", color: "whitesmoke" }}
            ></Chip>
          ))}
        </Stack>
        <Stack>
          <Button
            sx={{
              width: "150px",
              height: "50px",
              border: "2px solid #E4D804",

              fontWeight: "bold",
              color: "whitesmoke",
              borderRadius: "30px",
              "&:hover": { bgcolor: "#E4D804", color: "black" },
            }}
            onClick={() => navigate(`/movie/${movie.id}`)}
          >
            Watch now
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default MovieLatest;
