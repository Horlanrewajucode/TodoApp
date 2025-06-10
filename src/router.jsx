import { createBrowserRouter } from "react-router-dom";
import Todos from "./pages/todos";
import Home from "./pages/home";
import NotFound from "./pages/notfound";

export const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/todos", element: <Todos /> },
  { path: "*", element: <NotFound /> },
]);
