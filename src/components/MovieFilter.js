import * as React from "react";
import Box from "@mui/material/Box";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import useGenres from "../hooks/useGenres";
import { Button } from "@mui/material";
import ClearAllIcon from "@mui/icons-material/ClearAll";

export default function MovieFilter({ handleOnChange, resetFilter }) {
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
        <FormLabel component="legend">
          Genres
          <Box>
            <Button
              type="submit"
              color="inherit"
              variant="outlined"
              onClick={resetFilter}
              startIcon={<ClearAllIcon />}
            >
              Clear All
            </Button>
          </Box>
        </FormLabel>
        <FormGroup>
          {genres.map((item) => (
            <FormControlLabel
              key={item.id}
              control={
                <Checkbox value={item.id} onChange={console.log("checked")} />
              }
              label={item.name}
            />
          ))}
        </FormGroup>
      </FormControl>
    </Box>
  );
}
