import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./pages/Register";
import Welcome, { loader as peopleCountLoader } from "./pages/Welcome";
import "./axios/global.js";
import Error from "./pages/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Welcome />,
    loader: peopleCountLoader,
    errorElement: <Error />,
  },
  { path: "register", element: <Register />, errorElement: <Error /> },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
