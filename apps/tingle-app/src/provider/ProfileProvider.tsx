import { useNavigate } from "@tanstack/react-router";
import { Text } from "@tingle/ui";
import { createContext, useContext, useEffect, useState } from "react";

type Profile = {
  id: string;
};

const ProfileContext = createContext<{
  profile: Nullable<Profile>;
}>({
  profile: null,
});

// TODO: RQ 도입 후 Suspense 처리
export const ProfileProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Nullable<Profile>>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const profile = {
      id: "test",
    };
    setProfile(profile);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading && !profile) {
      navigate({ to: "/profile" });
    }
  }, [profile, isLoading, navigate]);

  if (isLoading) {
    return (
      <Text size="md" weight="bold" color="gray_600" align="center">
        Loading...
      </Text>
    );
  }

  return (
    <ProfileContext.Provider value={{ profile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  return useContext(ProfileContext);
};
