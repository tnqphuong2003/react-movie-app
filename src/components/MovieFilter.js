import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Stack,
  Typography,
} from "@mui/material";
import { FMultiCheckbox, FRadioGroup } from "./form";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import { useEffect, useState } from "react";
import apiService from "../app/apiService";
import { API_KEY } from "../app/config";

export const SORT_BY_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "priceDesc", label: "Price: High-Low" },
  { value: "priceAsc", label: "Price: Low-High" },
];

export const FILTER_GENDER_OPTIONS = ["Men", "Women", "Kids"];

export const FILTER_CATEGORY_OPTIONS = [
  "All",
  "Shose",
  "Apparel",
  "Accessories",
];

export const FILTER_PRICE_OPTIONS = [
  { value: "below", label: "Below $25" },
  { value: "between", label: "Between $25 - $75" },
  { value: "above", label: "Above $75" },
];
function MovieFilter({ resetFilter }) {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getGenresFilter = async () => {
      setLoading(true);
      try {
        const response = await apiService.get(
          `/genre/movie/list?api_key=${API_KEY}&language=en-US`
        );
        setGenres(response.data.genres);

        setError("");
      } catch (error) {
        console.log(error);
        setError(error.message);
      }
      setLoading(false);
    };
    getGenresFilter();
  }, []);
  return (
    <Stack spacing={3} sx={{ p: 3, width: 250 }}>
      <Stack spacing={1}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Genres
        </Typography>
        <FMultiCheckbox name="genres" options={genres} sx={{ width: 1 }} />
      </Stack>

      {/* <Stack spacing={1}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Category
        </Typography>
        <FRadioGroup
          name="category"
          options={FILTER_CATEGORY_OPTIONS}
          row={false}
        />
      </Stack>

      <Stack spacing={1}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Price
        </Typography>
        <FRadioGroup
          name="priceRange"
          options={FILTER_PRICE_OPTIONS.map((item) => item.value)}
          getOptionLabel={FILTER_PRICE_OPTIONS.map((item) => item.label)}
        />
      </Stack> */}

      <Box>
        <Button
          size="large"
          type="submit"
          color="inherit"
          variant="outlined"
          onClick={resetFilter}
          startIcon={<ClearAllIcon />}
        >
          Clear All
        </Button>
      </Box>
    </Stack>
  );
}

export default MovieFilter;
