import { createContext, useContext, useState, ReactNode } from "react";

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModalContext = () => {
  const context = useContext(ModalContext);
  
  if (!context) {
    throw new Error('useModalContext must be used within an ModalProvider');
  }
  return context;
};

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  return (
    <ModalContext.Provider value={{ isModalVisible, setIsModalVisible }}>
      {children}
    </ModalContext.Provider>
  );
};
