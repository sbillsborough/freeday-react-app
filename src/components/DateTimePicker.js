import * as React from "react";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

function DateTimeSelector() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DesktopDateTimePicker"]}>
        <DemoItem label="Responsive variant">
          <DateTimePicker
            format="DD-MM-YYYY hh:mm a"
            defaultValue={dayjs(new Date())}
          />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
}

export default DateTimeSelector;
