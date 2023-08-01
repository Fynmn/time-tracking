import Dashboard from "../../pages/Dashboard";
import Login from "../../pages/Login";
import Signup from "../../pages/Signup";

export const nav = [
  {
    path: "/",
    name: "Login",
    element: <Login />,
    isPrivate: false,
  },
  {
    path: "/login",
    name: "Login",
    element: <Login />,
    isPrivate: false,
  },
  {
    path: "/signup",
    name: "Signup",
    element: <Signup />,
    isPrivate: false,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    element: <Dashboard />,
    isPrivate: false,
  },
];
