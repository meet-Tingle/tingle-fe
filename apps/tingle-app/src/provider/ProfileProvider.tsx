import { useNavigate } from "@tanstack/react-router";
import { createContext, useContext, useEffect, useRef, useState } from "react";

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
  const profileCheckRef = useRef<boolean>(false);
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Nullable<Profile>>(null);
  const [loadingPromise, setLoadingPromise] = useState<Promise<void> | null>(
    null,
  );

  useEffect(() => {
    const mockProfile = {
      id: "test",
    };
    const promise = new Promise<void>((resolve) => {
      setTimeout(() => {
        setProfile(mockProfile);
        setLoadingPromise(null);
        profileCheckRef.current = true;
        resolve();
      }, 3000);
    });
    setLoadingPromise(promise);
  }, []);

  useEffect(() => {
    if (!profileCheckRef.current) return;
    if (profile) {
      navigate({ to: "/main" });
    }
  }, [profile, navigate, profileCheckRef]);

  if (loadingPromise) {
    throw loadingPromise;
  }

  if (!profileCheckRef.current) return null;

  return (
    <ProfileContext.Provider value={{ profile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  return useContext(ProfileContext);
};
