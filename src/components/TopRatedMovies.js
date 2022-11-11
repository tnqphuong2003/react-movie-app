import {
  Box,
  Button,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiService from "../app/apiService";
import { API_KEY, IMAGE_URL } from "../app/config";

const page = 1;
function srcSet(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

function TopRatedMovies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const getTopRateMovies = async () => {
      setLoading(true);
      try {
        const response = await apiService.get(
          `/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`
        );
        setMovies(response.data.results);
        console.log(movies);
        setError("");
      } catch (error) {
        console.log(error);
        setError(error.message);
      }
      setLoading(false);
    };
    getTopRateMovies();
  }, []);
  return (
    // <Stack
    //   sx={{
    //     width: "100%",
    //     position: "relative",
    //     margin: "0 auto",
    //   }}
    // >
    //   <Box
    //     sx={{
    //       width: 800,
    //       height: 60,
    //       backgroundColor: "#ffd564",
    //       margin: "auto",
    //       textAlign: "center",
    //     }}
    //   >
    //     <Typography sx={{ margin: "0 auto" }}> TODAY BEST CHOICE</Typography>
    //   </Box>
    //   <Box
    //     sx={{
    //       width: 900,
    //       margin: "auto",
    //       display: "flex",
    //       flexWrap: "wrap",
    //     }}
    //   >
    //     {movies.slice(0, 5).map((movie, index) => (
    //       <Stack
    //         key={index}
    //         sx={{
    //           position: "relative",
    //         }}
    //       >
    //         <img
    //           sx={{
    //             width: "180px",
    //             height: "270px",
    //             objectFit: "cover",
    //           }}
    //           src={`${IMAGE_URL}${movie.backdrop_path}`}
    //           srcSet={`${IMAGE_URL}${movie.backdrop_path}`}
    //           alt={movie.title}
    //           loading="lazy"
    //         />
    //         <Typography
    //           sx={{
    //             width: 70,
    //             height: 70,
    //             borderRadius: "50%",
    //             backgroundColor: "rgba(255, 255, 255, 0.6)",
    //             position: "absolute",
    //             top: "50%",
    //             left: "50%",
    //             transform: "translate(-50%, -50%)",
    //             zIndex: 8,
    //             transition: "0.5s",
    //             "&:hover": {
    //               filter: "brightness(150%)",
    //               backgroundColor: "#ffd564",
    //             },
    //           }}
    //         >
    //           <div
    //             style={{
    //               fontSize: "2rem",
    //               fontWeight: "bold",
    //               position: "absolute",
    //               left: "50%",
    //               top: "50%",
    //               transform: "translate(-50%, -50%)",
    //             }}
    //           >
    //             {movie.vote_average}
    //           </div>
    //         </Typography>
    //       </Stack>
    //     ))}
    //   </Box>
    //   <Box
    //     style={{
    //       width: 800,
    //       height: 60,
    //       backgroundColor: "#ffd564",
    //       margin: "auto",
    //       textAlign: "center",
    //     }}
    //   >
    //     <Button onClick={() => navigate(`/movie/`)}>
    //       CHECK ALL MOVIES NOW PLAYING
    //     </Button>
    //   </Box>
    // </Stack>
    <>
      <Box display="flex" justifyContent="right">
        <Button onClick={() => navigate(`/movie/`)}>
          CHECK ALL MOVIES NOW PLAYING
        </Button>
      </Box>
      <ImageList
        sx={{ width: "100%", height: 500 }}
        variant="quilted"
        cols={3}
        rowHeight={160}
      >
        {movies.slice(0, 9).map((item) => (
          <ImageListItem
            onClick={() => navigate(`/movie/${item.id}`)}
            key={item.id}
            cols={item.cols || 1}
            rows={item.rows || 1}
          >
            <img
              {...srcSet(
                `${IMAGE_URL}${item.backdrop_path}`,
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
    </>
  );
}

export default TopRatedMovies;
