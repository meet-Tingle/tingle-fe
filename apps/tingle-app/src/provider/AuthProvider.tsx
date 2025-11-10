import { useNavigate } from "@tanstack/react-router";
import {
  createContext,
  type Dispatch,
  type SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

type User = {
  id: string;
};

const AuthContext = createContext<{
  user: Nullable<User>;
  setUser: Dispatch<SetStateAction<Nullable<User>>>;
}>({
  user: null,
  setUser: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<Nullable<User>>(null);

  useEffect(() => {
    if (user) {
      navigate({ to: "/profile" });
    } else {
      navigate({ to: "/login" });
    }
  }, [user, navigate]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
