import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    if (email === "admin@email.com" && password === "123qwe") {
      const userData = {
        id: 1,
        name: "Admin User",
        role: "admin",
      };
      setUser(userData);
      return true;
    } else if (email === "student@email.com" && password === "123qwe") {
      const userData = {
        id: 2,
        name: "Student User",
        role: "student",
      };
      setUser(userData);
      return true;
    } else {
      return false;
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
