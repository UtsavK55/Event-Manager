import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateTimePicker = ({
  startDate,
  handleDateTimeChange,
}: DatePickerProps) => {
  return (
    <DatePicker
      placeholderText="Select date and time"
      selected={startDate}
      onChange={handleDateTimeChange}
      dateFormat={"dd/MM/yyyy;   hh:mm aa"}
      minDate={new Date()}
      showMonthDropdown
      showYearDropdown
      showIcon
      showTimeSelect
      timeIntervals={30}
      toggleCalendarOnIconClick
      className="w-full border border-gray-300 rounded-lg"
    />
  );
};
export default DateTimePicker;
