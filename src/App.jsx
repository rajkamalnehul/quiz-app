import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Instructions from "./pages/instructions";
import Quiz from "./pages/quiz";
import Result from "./pages/result";

function App() {
  const router = createBrowserRouter([
    {
      path: "/instructions",
      element: <Instructions />,
    },
    {
      path: "/quiz",
      element: <Quiz />,
    },
    {
      path: "/result",
      element: <Result />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
