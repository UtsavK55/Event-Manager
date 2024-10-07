import Modal from "../components/modal";
import { Form } from "../components/form";
import Button from "../components/button";
import { MdOutlineAddCircle } from "react-icons/md";
import EventList from "../components/eventList";
import { useModalContext } from "../context/ModalContext";

const Dashboard = () => {

  const { isModalVisible, setIsModalVisible } = useModalContext();
  
  const handleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  return (
    <>
      <h1 className="m-4 text-4xl">Event Management Platform</h1>
      <div className="flex w-screen h-screen justify-between gap-4 p-4">
        <div className=" bg-gray-200 w-1/3 rounded-lg">
          <div className="flex gap-2">
            <div className="text-xl ml-3 mt-2">New / Upcoming Events </div>
            <Button title={<MdOutlineAddCircle />} onClick={handleModal} />
          </div>
          <Modal title="Add Event">
            <Form />
          </Modal>
          <EventList />
        </div>
        <div className="bg-gray-200 w-1/3 rounded-lg">
          <div className="text-xl ml-3 mt-2">Ongoing Events</div>
        </div>
        <div className="bg-gray-200 w-1/3 rounded-lg">
          <div className="text-xl ml-3 mt-2">Events Completed</div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
