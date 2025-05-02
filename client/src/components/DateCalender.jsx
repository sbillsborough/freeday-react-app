import * as React from "react";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Button, List, ListItem, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function DateSelector({ selectedDates, setSelectedDates }) {
  const [currentDate, setCurrentDate] = React.useState(null);

  const handleAddDate = () => {
    if (currentDate) {
      const formattedDate = currentDate.format("DD-MM-YYYY");

      if (!selectedDates.includes(formattedDate)) {
        setSelectedDates([...selectedDates, formattedDate]);
      }

      setCurrentDate(null); // Clear picker after adding
    }
  };

  // filter() method will go through each date in selectedDates and create a new array with all the dates except dateToRemove. It filters out the dateToRemove and updates the state with the new list of dates.

  const handleRemoveDate = (dateToRemove) => {
    setSelectedDates(selectedDates.filter((date) => date !== dateToRemove));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <>
        <DatePicker
          label="Select a date"
          format="DD-MM-YYYY"
          value={currentDate}
          onChange={(newValue) => setCurrentDate(newValue)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddDate}
          style={{ marginLeft: 10 }}
        >
          Add Date
        </Button>

        {/* Display Selected Dates */}
        <List>
          {selectedDates.map((date, index) => (
            <ListItem key={index}>
              {date}
              <IconButton onClick={() => handleRemoveDate(date)} color="error">
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </>
    </LocalizationProvider>
  );
}

export default DateSelector;
