import { User } from "../types/user";
import { ReactNode, useState } from "react";
import { useContext, createContext } from "react";

interface ContextValuesType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const UserContext = createContext({} as ContextValuesType);
export const useUserContext = () => useContext(UserContext);

const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

export default UserContextProvider;
