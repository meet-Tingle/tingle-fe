import { useNavigate } from "@tanstack/react-router";
import { Text } from "@tingle/ui";
import { createContext, useContext, useEffect, useState } from "react";

type User = {
  id: string;
};

const AuthContext = createContext<{
  user: Nullable<User>;
}>({
  user: null,
});

// TODO: RQ 도입 후 Suspense 처리
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<Nullable<User>>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const user = {
      id: "test",
    };
    setUser(user);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading && !user) {
      navigate({ to: "/login" });
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return (
      <Text size="md" weight="bold" color="gray_600" align="center">
        Loading...
      </Text>
    );
  }

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
