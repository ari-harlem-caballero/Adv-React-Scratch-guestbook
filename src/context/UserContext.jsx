import { createContext, useContext, useState } from "react";
import { getUser, signInUser } from "../services/user";

// UserContext = createContext
export const UserContext = createContext();

// UserProvider (children), getUser(service)/set user state, login
export const UserProvider = ({ children }) => {
  const currentUser = getUser();
  const [user, setUser] = useState(currentUser || { email: null });

  const login = async (email, password) => {
    const authUser = await signInUser({ email, password });

    if (authUser) {
      setUser(authUser);
    }
  };

  // logout
  const logout = () => {
    setUser({ email: null });
  };

  return (
    <UserContext.Provider value={{ user, login, logout }} >
      {children}
    </UserContext.Provider>
  );
};

// useUser = useContext
export const useUser = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }

  return context;
};