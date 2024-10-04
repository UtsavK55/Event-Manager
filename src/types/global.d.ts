
interface EventDetails {
  title: string;
  date: Date | null;
  description: string;
  attendeeLimit: number;
  location: string;
}

interface ModalProps {
  isModalVisible: boolean;
  handleModal: () => void;
  title: string;
  children: React.ReactNode;
}

interface FormProps {
  handleModal: () => void;
  eventsArr: EventDetails[];
  setEventsArr: React.Dispatch<React.SetStateAction<EventDetails[]>>;
  initialVal?:{};
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
  isModalVisible: boolean;
  handleModal: ()=>void;
  eventsArr: EventDetails[];
  setEventsArr: React.Dispatch<React.SetStateAction<EventDetails[]>>;
}

interface ButtonProps {
  title: React.ReactNode;
  handleButton: ()=>void;
}

interface DatePickerProps{
  startDate: Date | null;
  handleDateTimeChange:(date:Date|null)=>void;
}