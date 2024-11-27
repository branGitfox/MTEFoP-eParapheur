import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Scc from "./pages/Scc.jsx";
import Tracker from "./pages/Tracker.jsx";
import Register from "./pages/Register.jsx";
import Stats from "./pages/Stats.jsx";
import Admin from "./pages/Admin.jsx";
import UserRegister from "./pages/UserRegister.jsx";
import ContextWrapper from "./components/ContextWrapper.jsx";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        {
          index: true,
          element: <Home />,
        },

        {
          path: "/login",
          element: <Login />,
        },
      ],
    },

    {
      path: "/scc",
      element: <Scc />,
      children: [
        {
          index: true,
          element: <Tracker />,
        },

        {
          path: "/scc/register",
          element: <Register />,
        },

        {
          path: "/scc/stats",
          element: <Stats />,
        },
      ],
    },

    {
      path: "/admin",
      element: <Admin />,
      children: [
        {
          index: true,
          element: <UserRegister />,
        },
      ],
    },
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
      v7_skipActionStatusRevalidation: true,
      v7_partialHydration: true,
      v7_fetcherPersist: true

    },
  }
);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ContextWrapper>
      <RouterProvider router={router} />
    </ContextWrapper>
  </StrictMode>
);
