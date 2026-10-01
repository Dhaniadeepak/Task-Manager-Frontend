import { createContext, useContext, useState } from "react";
import { authApi } from "../api/authApi";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("user") || "null")
  );

  const saveSession = ({ user, token }) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  };

  const login = async (credentials) => saveSession(await authApi.login(credentials));
  const signup = async (data) => saveSession(await authApi.signup(data));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
