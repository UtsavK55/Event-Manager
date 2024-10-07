import { useEffect, useRef } from "react";
import { useModalContext } from "../../context/ModalContext";

const Modal = ({ title, children }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const { isModalVisible, setIsModalVisible } = useModalContext();

  const handleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.style.display = isModalVisible ? "flex" : "none";
    }
  }, [isModalVisible]);

  return (
    <>
      <div
        className={`fixed inset-0 z-50 flex justify-center pt-[10%] bg-black bg-opacity-50 transition-opacity duration-300 ${
          isModalVisible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        ref={modalRef}
      >
        <div className="bg-white rounded-lg w-1/3 max-h-[50vh] overflow-auto">
          <div className=" flex justify-between items-center p-2 bg-gray-100 text-lg">
            <span className="ml-2">{title}</span>
            <span
              onClick={handleModal}
              className=" cursor-pointer rounded-sm hover:bg-gray-300 px-1.5 py-0.5"
            >
              &times;
            </span>
          </div>
          <div className="mt-4">{children}</div>
        </div>
      </div>
    </>
  );
};
export default Modal;
