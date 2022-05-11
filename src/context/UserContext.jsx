import { createContext, useContext, useState } from "react";
import { getUser, signInUser, signUpUser } from "../services/user";

// UserContext = createContext
export const UserContext = createContext();

// UserProvider (children), getUser(service)/set user state, login
export const UserProvider = ({ children }) => {
  const currentUser = getUser();
  const [user, setUser] = useState(currentUser || { email: null });

  async function login(email, password) {
    const authUser = await signInUser({ email, password });

    if (authUser) {
      setUser(authUser);
    }
  };

  async function signUp(email, password) {
    const newUser = await signUpUser({ email, password });

    if (newUser) {
      setUser(newUser);
    }
  };

  // logout
  async function logout() {
    setUser({ email: null });
  };

  return (
    <UserContext.Provider value={{ user, login, logout, signUp }} >
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