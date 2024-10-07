interface Attendee {
  name: string;
  email: string;
}

interface EventDetails {
  title: string;
  date: Date | null;
  description: string;
  attendeeLimit: number;
  location: string;
  attendees: Attendee[];
}
interface ModalProps {
  title: string;
  children: React.ReactNode;
}

interface FormProps {
  initialVal?: EventDetails;
}
type Events = EventDetails[];

interface Validation {
  required?: {
    value: boolean;
    message: string;
  };
  pattern?: {
    value: string;
    message: string;
  };
  custom?: {
    isValid: (value: string) => boolean;
    message: string;
  };
}

type ErrorRecord<T> = Partial<Record<keyof T, string>>;

type Validations<T extends {}> = Partial<Record<keyof T, Validation>>;

interface EventCardProps {
  event: EventDetails;
}

interface ButtonProps {
  title: React.ReactNode;
  onClick: () => void;
}

interface DatePickerProps {
  startDate: Date | null;
  handleDateTimeChange: (date: Date | null) => void;
}

interface EventContextType {
  eventsArr: Events;
  setEventsArr: React.Dispatch<React.SetStateAction<Events>>;
}
interface ModalContextType {
  isModalVisible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
