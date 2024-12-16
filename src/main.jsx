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
import SccDirServDg from "./components/admin/SccDirServDg.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Profil from "./pages/Profil.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import Sp from "./pages/Sp.jsx";
import Agent from "./pages/Agent.jsx";
import ListDoc from "./pages/ListDoc.jsx";
import OneDoc from "./pages/OneDoc.jsx";
import ListTrans from "./pages/ListTrans.jsx";
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
        {
          path:"/forgotPassword",
          element:<ForgotPassword/>
        }
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

        {
          path:"/scc/profil",
          element:<Profil/>
        }
      ],
    },

    {
      path: "/admin",
      element: <Admin />,
      children: [
        {
          index: true,
          element: <Dashboard />,
        },
        {
          path: '/admin/userregister',
          element: <UserRegister />,
        },
        {
          path:'/admin/sccservdirdg',
          element:<SccDirServDg/>
        }
      ],
    },

    {
      path:'/sp',
      element:<Sp/>
    },

    {
      path:'/agent',
      element:<Agent/>,
      children:[
        {
          index:true,
          element:<ListDoc/>
        },

        {
          path:'/agent/doc/:id_doc',
          element:<OneDoc/>
        },
        {
          path:'/agent/ListTrans',
          element:<ListTrans/>
        }
      ]
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
