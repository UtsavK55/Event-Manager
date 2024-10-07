import { createBrowserRouter, Outlet } from "react-router-dom";
import "./App.css";
import Dashboard from "./screens/Dashboard";
import EventInfo from "./screens/EventInfo";
import { EventProvider } from "./context/EventContext";
import { ModalProvider } from "./context/ModalContext";

function App() {
  return (
    <>
      <EventProvider>
        <ModalProvider>
          <Outlet />
        </ModalProvider>
      </EventProvider>
    </>
  );
}

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/event/:eventName",
        element: <EventInfo />,
      },
    ],
  },
]);

export { App, appRouter };
