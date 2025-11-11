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
  const [profile, setProfile] = useState<Nullable<Profile>>(null);
  const [loadingPromise, setLoadingPromise] = useState<Promise<void> | null>(
    null,
  );

  useEffect(() => {
    const profile = {
      id: "test",
    };
    const promise = new Promise<void>((resolve) => {
      setTimeout(() => {
        setProfile(profile);
        setLoadingPromise(null);
        resolve();
      }, 3000);
    });
    setLoadingPromise(promise);
  }, []);

  if (loadingPromise) {
    throw loadingPromise;
  }

  if (!profile) {
    return null;
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
