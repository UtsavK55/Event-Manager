import { createContext, useState } from "react";
import Modal from "../components/modal/Modal";
import Button from "../components/button/Button";
import { MdOutlineAddCircle } from "react-icons/md";

const Dashboard = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const handleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  const EventContext = createContext<Events>([]);
  const [eventsArr, setEventsArr] = useState<Events>([]);
  return (
    <>
      <EventContext.Provider value={eventsArr}>
        <h1 className="m-4 text-4xl">Event Management Platform</h1>
        <div className="flex w-screen h-screen justify-between gap-4 p-4">
          <div className=" bg-gray-200 w-1/3 rounded-lg">
            <div className="flex gap-2">
              <div className="text-xl ml-3 mt-2">New / Upcoming Events </div>
              <Button
                title={<MdOutlineAddCircle />}
                handleButton={handleModal}
              />
            </div>
            <Modal
              isModalVisible={isModalVisible}
              handleModal={handleModal}
              title="Add Event"
            >
              Add Event
            </Modal>
          </div>
          <div className="bg-gray-200 w-1/3 rounded-lg">
            <div className="text-xl ml-3 mt-2">Ongoing Events</div>
          </div>
          <div className="bg-gray-200 w-1/3 rounded-lg">
            <div className="text-xl ml-3 mt-2">Events Completed</div>
          </div>
        </div>
      </EventContext.Provider>
    </>
  );
};

export default Dashboard;
