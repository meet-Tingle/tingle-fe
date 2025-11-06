import type { SVGProps } from "react";
import * as styles from "./Icon.css";
import { AddIcon } from "./icons/AddIcon";
import { ArrowBottomIcon } from "./icons/ArrowBottomIcon";
import { ArrowTopIcon } from "./icons/ArrowTopIcon";
import { CrossIcon } from "./icons/CrossIcon";
import { HeartEmptyIcon } from "./icons/HeartEmptyIcon";
import { HeartFilledIcon } from "./icons/HeartFilledIcon";
import { RadioActiveIcon } from "./icons/RadioActiveIcon";
import { RadioDeactiveIcon } from "./icons/RadioDeactiveIcon";
import { SearchIcon } from "./icons/SearchIcon";

const iconMap = {
  add: <AddIcon />,
  arrowbottom: <ArrowBottomIcon />,
  arrowtop: <ArrowTopIcon />,
  cross: <CrossIcon />,
  heart_empty: <HeartEmptyIcon />,
  heart_filled: <HeartFilledIcon />,
  radio_active: <RadioActiveIcon />,
  radio_deactive: <RadioDeactiveIcon />,
  search: <SearchIcon />,
} as const;

export type IconName = keyof typeof iconMap;

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, "name"> {
  name: IconName;
  size?: number | { width: number; height: number };
  color?: string;
}

export const Icon = ({
  name,
  size = 24,
  color = "currentColor",
  className,
  ...props
}: IconProps) => {
  const width = typeof size === "number" ? size : size.width;
  const height = typeof size === "number" ? size : size.height;

  // Original viewBox dimensions based on the SVG files
  const viewBoxMap: Record<IconName, string> = {
    add: "0 0 20 20",
    arrowbottom: "0 0 20 20",
    arrowtop: "0 0 20 20",
    cross: "0 0 20 20",
    heart_empty: "0 0 24 24",
    heart_filled: "0 0 24 24",
    radio_active: "0 0 18 18",
    radio_deactive: "0 0 18 18",
    search: "0 0 20 20",
  };

  return (
    <span className={`${styles.iconWrapper} ${className || ""}`.trim()}>
      <svg
        width={width}
        height={height}
        viewBox={viewBoxMap[name]}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        color={color}
        role="img"
        aria-hidden="true"
        {...props}
      >
        {iconMap[name]}
      </svg>
    </span>
  );
};
