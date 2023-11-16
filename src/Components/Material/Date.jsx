import * as React from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

export default function DatePicker({
  handleOrderProcessingForm,
  label,
  color,
  name,
  disabled,
  disablePast,
  defaultDate,
}) {
  const [value, setValue] = React.useState(
    defaultDate ? defaultDate : new Date()
  );
  // const [value, setValue] = React.useState("2023-10-31");

  const handleChange = (newValue) => {
    // console.log(newValue);
    setValue(newValue);

    if (!label) {
      // console.log(name);
      handleOrderProcessingForm(newValue, name);
    } else {
      // console.log(label);
      handleOrderProcessingForm(newValue, label);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={3}>
        <DesktopDatePicker
          label={label}
          className=""
          disabled={disabled}
          // InputLabelProps={{ style: { color: "white" } }}
          // inputProps={{ style: { color: "white" } }}
          inputFormat="MM/dd/yyyy"
          value={value}
          onChange={handleChange}
          disablePast={disablePast ? disablePast : false}
          renderInput={(params) => (
            <TextField
              // disabled={true}
              {...params}
              sx={{
                svg: { color: color ? color : "white" },
                input: { color: color ? color : "white" },
              }}
            />
          )}
        />
      </Stack>
    </LocalizationProvider>
  );
}
