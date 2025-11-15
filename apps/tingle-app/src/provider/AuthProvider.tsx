import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import {
  createContext,
  type Dispatch,
  type SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { getProfile } from "@/api/profile/profile.api";
import { QueryKeys } from "@/api/QueryKeyFactory";

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

  const { data: profile } = useSuspenseQuery(
    queryOptions({
      queryKey: QueryKeys.profile.me(),
      queryFn: getProfile,
    }),
  );

  useEffect(() => {
    if (profile) {
      setUser({ id: profile.id.toString() });
      navigate({ to: "/main" });
      return;
    }
    navigate({ to: "/profile" });
  }, [profile, navigate]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
