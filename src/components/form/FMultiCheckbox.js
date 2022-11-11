import { useFormContext, Controller } from "react-hook-form";
import { Checkbox, FormGroup, FormControlLabel } from "@mui/material";

function FMultiCheckbox({ name, options, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const onSelected = (option) =>
          field.value.includes(option.id)
            ? field.value.filter((value) => value !== option.id)
            : [...field.value, option.id];

        return (
          <FormGroup>
            {options.map((option) => (
              <FormControlLabel
                key={option.id}
                control={
                  <Checkbox
                    checked={field.value.includes(option.id)}
                    onChange={() => field.onChange(onSelected(option))}
                  />
                }
                label={option.name}
                {...other}
              />
            ))}
          </FormGroup>
        );
      }}
    />
  );
}

export default FMultiCheckbox;
