import { useEventContext } from "../../context/EventContext";
import EventCard from "../eventCard";

const EventList = () => {
  const { eventsArr } = useEventContext();

  return (
    <div className="mt-2 flex flex-col gap-2">
      {eventsArr.map((event) => (
        <EventCard key={event.title} event={event} />
      ))}
    </div>
  );
};
export default EventList;
