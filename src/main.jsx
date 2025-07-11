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
import ListDoc2 from "./pages/ListDoc2.jsx";
import OneDoc from "./pages/OneDoc.jsx";
import OneDoc2 from "./pages/OneDoc2.jsx";
import ListTrans from "./pages/ListTrans.jsx";
import ListTrans2 from "./pages/ListTrans2.jsx";
import MyDoc from "./pages/MyDoc.jsx";
import UsersList from "./components/admin/UsersList.jsx";
import Support from "./pages/Support.jsx";
import Message from "./components/admin/Message.jsx";
import SpStats from "./components/sp/SpStats.jsx";
import ProfilSp from "./pages/ProfilSp.jsx";
import ProfilAgent from "./pages/ProfilAgent.jsx";
import UpDoc from "./pages/UpDoc.jsx";
import ListTraite from "./pages/ListTraite.jsx";
import OneDoc3 from "./pages/OneDoc3.jsx";
import ListDeparts from "./components/admin/ListDeparts.jsx"  
import AdProfil from "./components/admin/AdProfil.jsx";
//react router pour gerer les route coté Front-end
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
        },

        {
          path:'/mydoc',
          element:<MyDoc/>
        },

        {
          path:'/support',
          element:<Support/>
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
        },

        {
          path:"/scc/upDoc/:id_doc",
          element:<UpDoc/>
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
          path: '/admin/usersList',
          element: <UsersList />,
        },
        {
          path:'/admin/sccservdirdg',
          element:<SccDirServDg/>
        },

        {
          path:'/admin/messages',
          element:<Message/>
        },

        {
          path:'/admin/listdeparts',
          element:<ListDeparts/>
        },
           {
          path:'/admin/profil',
          element:<AdProfil/>
        }
      ],
    },

    {
      path:'/sp',
      element:<Sp/>,
      children:[
        {
          index:true,
          element:<ListDoc/>
        },

        {
          path:'/sp/doc/:id_doc',
          element:<OneDoc/>
        },
        {
          path:'/sp/move/:id_doc',
          element:<OneDoc3/>
        },
        {
          path:'/sp/ListTrans',
          element:<ListTrans/>
        },
        {
          path:'/sp/ListTraite',
          element:<ListTraite/>
        },
        {
          path:'/sp/stats',
          element:<SpStats/>
        },

        {
          path:'/sp/profil',
          element:<ProfilSp/>
        }
      ]

    },

    {
      path:'/agent',
      element:<Agent/>,
      children:[
        {
          index:true,
          element:<ListDoc2/>
        },

        {
          path:'/agent/doc/:id_doc',
          element:<OneDoc2/>
        },
        {
          path:'/agent/ListTrans',
          element:<ListTrans2/>
        },

        {
          path:'/agent/profil',
          element:<ProfilAgent/>
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
