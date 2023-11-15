import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Home from "./pages/index.tsx";
import DetailPages from "./pages/detail/index.tsx";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/pokemon/:id", element: <DetailPages /> },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
