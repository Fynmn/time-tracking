import { createContext, useContext, useState } from "react";
import { RenderRoutes } from "../components/structure/RenderNavigation";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();
export const AuthData = () => useContext(AuthContext);

export const AuthWrapper = () => {
  const [user, setUser] = useState({ email: "", isAuthenticated: false });
  const navigate = useNavigate();

  const login = (email, password) => {
    // Make a call to the authentication API to check the userEmail
    if (email === localStorage.getItem("email"))
      return new Promise((resolve, reject) => {
        if (password === localStorage.getItem("password")) {
          setUser({ email: email, isAuthenticated: true });
          sessionStorage.setItem("email", email);
          navigate("/dashboard");
          resolve("success");
        } else {
          reject("Incorrect password");
        }
      });
  };
  const logout = () => {
    sessionStorage.removeItem("email");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <>
        <RenderRoutes />
      </>
    </AuthContext.Provider>
  );
};
