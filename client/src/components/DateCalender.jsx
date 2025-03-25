import * as React from "react";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

function DateSelector({ selectedDate, setSelectedDate }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        format="DD-MM-YYYY"
        value={selectedDate ? dayjs(selectedDate) : null}
        onChange={(newValue) =>
          setSelectedDate(newValue ? newValue.format("DD-MM-YYYY") : null)
        }
      />
    </LocalizationProvider>
  );
}

export default DateSelector;
