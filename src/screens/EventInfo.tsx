import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useEventContext } from "../context/EventContext";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import Button from "../components/button";
import Modal from "../components/modal";
import { Form } from "../components/form";
import { useModalContext } from "../context/ModalContext";

const EventInfo = () => {
  const { eventName } = useParams<{ eventName: string }>();
  const { eventsArr, setEventsArr } = useEventContext();
  const { isModalVisible, setIsModalVisible } = useModalContext();

  const handleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const [attendee, setAttendee] = useState<{ name: string; email: string }>({
    name: "",
    email: "",
  });
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  const event = eventsArr.find(
    (event) => event.title === decodeURIComponent(eventName!)
  );

  if (!event) {
    return <div className="text-red-500 font-bold">Event not found</div>;
  }

  const handleAddAttendee = () => {
    const newErrors: { name?: string; email?: string } = {};
    if (!attendee.name) newErrors.name = "Name is required.";
    if (!attendee.email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(attendee.email)) {
      newErrors.email = "Email is invalid.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (event.attendees.length < event.attendeeLimit) {
      const newAttendee = { name: attendee.name, email: attendee.email };
      const updatedEvent = {
        ...event,
        attendees: [...event.attendees, newAttendee],
      };

      setEventsArr(
        eventsArr.map((e) => (e.title === event.title ? updatedEvent : e))
      );
      setAttendee({ name: "", email: "" });
      setErrors({});
    } else {
      alert("Attendee limit reached!");
    }
  };

  const handleRemoveAttendee = (email: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to remove this attendee?"
    );
    if (confirmed) {
      const updatedEvent = {
        ...event,
        attendees: event.attendees.filter(
          (attendee) => attendee.email !== email
        ),
      };

      setEventsArr(
        eventsArr.map((e) => (e.title === event.title ? updatedEvent : e))
      );
    }
  };

  return (
    <div className="mt-4 mx-4 p-4 bg-white rounded-lg shadow-lg">
      <div className="flex gap-4">
        <h2 className="text-3xl font-semibold">{event.title}</h2>
        <div>
          <Button title={<FaEdit />} onClick={handleModal} />
        </div>
      </div>
      <div className="text-gray-600">
        <b>Date:</b>{" "}
        <div>{event.date ? event.date.toLocaleString() : "N/A"}</div>
      </div>
      <div className="text-gray-600 mt-2">
        <b>Description:</b> <div>{event.description}</div>
      </div>
      <div className="text-gray-600 mt-2">
        <b>Attendee Limit: </b>
        <div>{event.attendeeLimit}</div>
      </div>
      <div className="text-gray-600 mt-2">
        <b>Location:</b> <div>{event.location}</div>
      </div>
      <Modal title="Edit Event">
        <Form initialVal={event} />
      </Modal>

      <h4 className="mt-6 text-xl font-semibold">Add Attendee</h4>
      <div className="mt-4 flex gap-2">
        <div className="flex flex-col">
          <input
            type="text"
            placeholder="Name"
            value={attendee.name}
            onChange={(e) => setAttendee({ ...attendee, name: e.target.value })}
            className="border border-gray-300 rounded-lg p-2 flex-1"
          />
          {errors.name && (
            <p className="text-red-500 text-sm ml-1">{errors.name}</p>
          )}
        </div>
        <div className="flex flex-col ">
          <input
            type="email"
            placeholder="Email"
            value={attendee.email}
            onChange={(e) =>
              setAttendee({ ...attendee, email: e.target.value })
            }
            className="border border-gray-300 rounded-lg p-2 flex-1"
          />
          {errors.email && (
            <p className="text-red-500 text-sm ml-1">{errors.email}</p>
          )}
        </div>
      </div>
      <button
        onClick={handleAddAttendee}
        className="bg-blue-500 text-white rounded-lg mt-4 p-2 hover:bg-blue-600 transition duration-200 w-32"
      >
        Add Attendee
      </button>

      <h3 className="text-xl font-semibold mt-6">Attendees:</h3>
      <div>Total: {event.attendees.length} attendees</div>

      <table className=" min-w-[30%] mt-2 border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 border-b">S.no.</th>
            <th className="py-2 border-b">Name</th>
            <th className="py-2 border-b">Email</th>
            <th className="py-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {!event.attendees.length ? (
            <tr>
              <td colSpan={3} className="text-gray-500 text-center">
                No attendees found
              </td>
            </tr>
          ) : (
            event.attendees.map((attendee, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <th className="py-2 border-b">{index}</th>
                <th className="py-2 border-b">{attendee.name}</th>
                <th className="py-2 border-b">{attendee.email}</th>
                <th className="py-2 border-b">
                  <button
                    onClick={() => handleRemoveAttendee(attendee.email)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <MdDelete />
                  </button>
                </th>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EventInfo;
