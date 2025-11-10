import { ToastProvider } from "@tingle/ui";

const DesignProvider = ({ children }: { children: React.ReactNode }) => {
  return <ToastProvider>{children}</ToastProvider>;
};

export default DesignProvider;
