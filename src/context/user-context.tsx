import { User } from "../types/user";
import { ReactNode, useState } from "react";
import { useContext, createContext } from "react";

interface ContextValuesType {
  loading: boolean;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UserContext = createContext({} as ContextValuesType);
export const useUserContext = () => useContext(UserContext);

const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser, loading, setLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
