import type { ReactNode } from "react";
import {
  Children,
  createContext,
  isValidElement,
  useContext,
  useEffect,
} from "react";
import * as styles from "./BottomContainer.css";

interface BottomContainerProps {
  children: ReactNode;
}

interface BottomProps {
  children: ReactNode;
}

const BottomContainerContext = createContext<boolean>(false);

function BottomContainerRoot({ children }: BottomContainerProps) {
  const childrenArray = Children.toArray(children);
  const bottomElement = childrenArray.find(
    (child) => isValidElement(child) && child.type === Bottom,
  );
  const contentChildren = childrenArray.filter(
    (child) => !(isValidElement(child) && child.type === Bottom),
  );

  return (
    <BottomContainerContext.Provider value={true}>
      <div className={styles.root}>
        <div className={styles.contentWrapper}>{contentChildren}</div>
        {bottomElement}
      </div>
    </BottomContainerContext.Provider>
  );
}

function Bottom({ children }: BottomProps) {
  const isInsideBottomContainer = useContext(BottomContainerContext);

  useEffect(() => {
    if (!isInsideBottomContainer) {
      throw new Error(
        "Bottom component는 BottomContainer 내부에서만 사용할 수 있습니다.",
      );
    }
  }, [isInsideBottomContainer]);

  return <div className={styles.bottomContainer}>{children}</div>;
}

export const BottomContainer = Object.assign(BottomContainerRoot, {
  Bottom,
});

export default BottomContainer;
