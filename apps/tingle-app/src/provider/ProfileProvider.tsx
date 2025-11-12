import { useNavigate } from "@tanstack/react-router";
import { createContext, useContext, useEffect, useState } from "react";

type Profile = {
  id: string;
  name?: string;
};

const ProfileContext = createContext<{
  profile: Nullable<Profile>;
}>({
  profile: null,
});

export const ProfileProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const navigate = useNavigate();
  const [profile, _setProfile] = useState<Nullable<Profile>>(null);
  const [loadingPromise, setLoadingPromise] = useState<Promise<void> | null>(
    null,
  );

  useEffect(() => {
    const _mockProfile = {
      id: "test",
    };
    const promise = new Promise<void>((resolve) => {
      setTimeout(() => {
        // setProfile(mockProfile);
        setLoadingPromise(null);
        setIsInitialized(true);
        resolve();
      }, 3000);
    });
    setLoadingPromise(promise);
  }, []);

  useEffect(() => {
    if (!isInitialized) return;
    if (profile) {
      navigate({ to: "/main" });
    }
  }, [profile, navigate]);

  if (loadingPromise) {
    throw loadingPromise;
  }

  if (!isInitialized) return null;

  return (
    <ProfileContext.Provider value={{ profile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  return useContext(ProfileContext);
};
