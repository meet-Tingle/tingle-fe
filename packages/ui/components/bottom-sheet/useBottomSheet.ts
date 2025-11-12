import { useCallback, useState } from "react";

export const useBottomSheet = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openBottomSheet = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeBottomSheet = useCallback(() => {
    setIsOpen(false);
  }, []);

  return {
    isOpen,
    openBottomSheet,
    closeBottomSheet,
  };
};
