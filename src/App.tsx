import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import HomePage from "./pages/HomePage";
import CircuitBuilder from "./pages/CircuitBuilder";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/circuit-builder",
    element: <CircuitBuilder />,
  },
]);

const App = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gray-100">
        <RouterProvider router={router} />
      </div>
    </DndProvider>
  );
};

export default App;
