import { createContext, useContext, useState, ReactNode } from "react";

const EventContext = createContext<EventContextType | undefined>(undefined);

export const useEventContext = () => {
    const context = useContext(EventContext);
    if (!context) {
      throw new Error('useEventContext must be used within an EventProvider');
    }
    return context;
  };

export const EventProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [eventsArr, setEventsArr] = useState<Events>([]);

  return (
    <EventContext.Provider value={{ eventsArr, setEventsArr }}>
      {children}
    </EventContext.Provider>
  );
};
