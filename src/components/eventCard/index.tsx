import { MdDelete } from "react-icons/md";
import Button from "../button";
import { Link } from "react-router-dom";
import { useEventContext } from "../../context/EventContext";

const EventCard = ({ event }: EventCardProps) => {
  const { title, date, description, location } = event;

  const formattedDateTime = date ? date.toLocaleString() : "Date not available";
  const { setEventsArr } = useEventContext();
  const handleDelete = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this event?"
    );
    
    if (confirmed) {
      setEventsArr((prevEvents) =>
        prevEvents.filter((item) => item.title !== event.title)
      );
    }
  };

  return (
    <>
      <div className="bg-white mx-2 p-2 rounded-lg text-gray-800">
        <div className="flex justify-between">
          <Link to={"/event/" + title} key={title}>
            <div>
              <u>
                <b>Title:</b> {title}
              </u>
            </div>
          </Link>
          <div className="flex gap-2">
            <Button title={<MdDelete />} onClick={handleDelete} />
          </div>
        </div>
        <div>
          <b>Description:</b> {description}
        </div>
        <div>
          <b>Date and Time:</b> {formattedDateTime}
        </div>
        <div>
          <b>Location:</b> {location}
        </div>
      </div>
    </>
  );
};
export default EventCard;
