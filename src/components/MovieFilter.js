// import {
//   Box,
//   Button,
//   Checkbox,
//   FormControlLabel,
//   FormGroup,
//   Stack,
//   Typography,
// } from "@mui/material";
// import { FMultiCheckbox, FRadioGroup } from "./form";
// import ClearAllIcon from "@mui/icons-material/ClearAll";
// import useGenres from "../hooks/useGenres";
// function MovieFilter({ resetFilter }) {
//   const genres = useGenres();

//   return (
//     <Stack spacing={3} sx={{ p: 3, width: 250 }}>
//       <Stack spacing={1}>
//         <Typography variant="h6" sx={{ fontWeight: 600, color: "#E4D804" }}>
//           Genres
//         </Typography>
//         <FMultiCheckbox
//           name="genres"
//           options={genres}
//           sx={{ width: 1, color: "whitesmoke" }}
//         />
//       </Stack>

//       <Box>
//         <Button
//           size="large"
//           type="submit"
//           color="inherit"
//           variant="outlined"
//           onClick={resetFilter}
//           startIcon={<ClearAllIcon />}
//         >
//           Clear All
//         </Button>
//       </Box>
//     </Stack>
//   );
// }

// export default MovieFilter;

import * as React from "react";
import Box from "@mui/material/Box";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import useGenres from "../hooks/useGenres";

export default function MovieFilter({ handleOnChange }) {
  const genres = useGenres();

  // const handleChange = (event) => {
  //   setState({
  //     ...state,
  //     [event.target.name]: event.target.checked,
  //   });
  // };

  return (
    <Box sx={{ display: "flex" }}>
      <FormControl
        component="fieldset"
        sx={{ width: 1, color: "whitesmoke" }}
        variant="standard"
      >
        <FormLabel component="legend">Genres</FormLabel>
        <FormGroup>
          {genres.map((item) => (
            <FormControlLabel
              key={item.id}
              control={
                <Checkbox value={item.id} onChange={(e) => handleOnChange} />
              }
              label={item.name}
            />
          ))}
        </FormGroup>
      </FormControl>
    </Box>
  );
}
