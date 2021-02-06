import { useState } from "react";
import {
  DateRangePicker,
  DateRangePickerShape,
  FocusedInputShape,
} from "react-dates";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";

import { DateRange } from "types";

interface Props {
  dateRangeInitial: DateRange;
  handleChange: (value: DateRange) => void;
}

const DateRangeInput = ({ handleChange, dateRangeInitial }: Props) => {
  const [dateRange, setDateRange] = useState<DateRange>(dateRangeInitial);
  const [focused, setFocused] = useState<FocusedInputShape | null>(null);

  const handleRangeChange = (value: DateRange) => {
    setDateRange(value);
    handleChange(value);
  };

  return (
    <DateRangePicker
      startDate={dateRange.startDate}
      endDate={dateRange.endDate}
      onDatesChange={handleRangeChange}
      startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
      endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
      focusedInput={focused} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
      onFocusChange={(focusedInput) => setFocused(focusedInput)} // PropTypes.func.isRequired,
      isOutsideRange={() => false}
    />
  );
};

export default DateRangeInput;
