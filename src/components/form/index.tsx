import { useState } from "react";
import { useForm } from "../../customHooks/useForm";
import DateTimePicker from "../datePicker";
import { useEventContext } from "../../context/EventContext";
import { useModalContext } from "../../context/ModalContext";

export const Form = ({ initialVal }: FormProps) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const { setEventsArr } = useEventContext();
  const { isModalVisible, setIsModalVisible } = useModalContext();
  const [isDate, setIsDate] = useState(true);

  const { handleSubmit, handleChange, data, errors, setData } =
    useForm<EventDetails>({
      validations: {
        title: {
          required: {
            value: true,
            message: "This field is required",
          },
        },
        description: {},
        attendeeLimit: {
          required: {
            value: true,
            message: "This field is required",
          },
        },
        location: {
          required: {
            value: true,
            message: "This field is required",
          },
        },
      },
      initialVal: initialVal,
      onSubmit: () => {
        if (startDate === null) {
          setIsDate(false);
        }

        if (initialVal) {
          setEventsArr((prevEvents) =>
            prevEvents.map((event) =>
              event.title === initialVal.title ? { ...event, ...data } : event
            )
          );
        } else {
          alert("Event submitted!");
          setEventsArr((prevEvents) => [...prevEvents, data]);
        }

        setIsModalVisible(!isModalVisible);
        setData({
          ...data,
          title: "",
          date: null,
          description: "",
          attendeeLimit: 0,
          location: "",
          attendees: [],
        });

        setStartDate(null);
        setIsDate(true);
      },
    });

  const handleDateTimeChange = (date: Date | null) => {
    setStartDate(date);
    setData({ ...data, date: date, attendees: [] });
  };
  return (
    <>
      <form className="max-w-lg mx-auto p-4" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title<sup className="text-red-500">*</sup>
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg p-2"
            value={data.title || ""}
            onChange={handleChange("title")}
          />
          {errors.title && (
            <p className="text-xs text-red-500 ml-1">{errors.title}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date & Time<sup className="text-red-500">*</sup>
          </label>
          <div>
            <DateTimePicker
              startDate={startDate}
              handleDateTimeChange={handleDateTimeChange}
            />
            {!isDate && (
              <p className="text-xs text-red-500 ml-1">
                This field is required
              </p>
            )}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            className="w-full border border-gray-300 rounded-lg p-2"
            rows={4}
            onChange={handleChange("description")}
            value={data.description || ""}
          />
          {errors.description && (
            <p className="text-xs text-red-500 ml-1">{errors.description}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Attendee Limit<sup className="text-red-500">*</sup>
          </label>
          <input
            type="number"
            className="w-full border border-gray-300 rounded-lg p-2"
            onChange={handleChange("attendeeLimit")}
            value={data.attendeeLimit || ""}
          />
          {errors.attendeeLimit && (
            <p className="text-xs text-red-500 ml-1">{errors.attendeeLimit}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location<sup className="text-red-500">*</sup>
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg p-2"
            onChange={handleChange("location")}
            value={data.location || ""}
          />
          {errors.location && (
            <p className="text-xs text-red-500 ml-1">{errors.location}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white rounded-lg p-2 hover:bg-blue-600 transition duration-200"
        >
          Add Event
        </button>
      </form>
    </>
  );
};
