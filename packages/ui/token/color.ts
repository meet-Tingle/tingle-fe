export const primitiveColors = {
  blue: {
    50: "#E6F2FF",
    100: "#CCE5FF",
    200: "#99CCFF",
    300: "#66B2FF",
    400: "#3399FF",
    500: "#0080FF",
    600: "#0066CC",
    700: "#004D99",
    800: "#003366",
    900: "#001A33",
  },
  pink: {
    50: "#FFE6F5",
    100: "#FFCCEB",
    200: "#FF99D7",
    300: "#FF66C3",
    400: "#FF33AF",
    500: "#FF6DD3",
    600: "#FF00A8",
    700: "#CC0086",
    800: "#990064",
    900: "#660042",
  },
  magenta: {
    50: "#FDEAF7",
    100: "#FBD5EF",
    200: "#F7ABDF",
    300: "#F381CF",
    400: "#EF57BF",
    500: "#F26BCE",
    600: "#E91BA8",
    700: "#B91585",
    800: "#8A1063",
    900: "#5C0B42",
  },

  white: "#FFFFFF",
  black: "#000000",

  gray: {
    50: "#F9FAFB",
    100: "#F3F4F6",
    200: "#E5E7EB",
    300: "#D1D5DB",
    400: "#9CA3AF",
    500: "#6B7280",
    600: "#4B5563",
    700: "#374151",
    800: "#1F2937",
    900: "#111827",
  },
} as const;

export const semanticColors = {
  primary: primitiveColors.blue[500],
  primaryLight: primitiveColors.blue[100],
  primaryDark: primitiveColors.blue[700],

  secondary: primitiveColors.pink[500],
  secondaryLight: primitiveColors.pink[100],
  secondaryDark: primitiveColors.pink[700],

  accent: primitiveColors.magenta[500],
  accentLight: primitiveColors.magenta[100],
  accentDark: primitiveColors.magenta[700],

  textPrimary: primitiveColors.gray[900],
  textSecondary: primitiveColors.gray[600],
  textTertiary: primitiveColors.gray[400],
  textDisabled: primitiveColors.gray[300],
  textOnPrimary: primitiveColors.white,
  textOnSecondary: primitiveColors.white,

  bgPrimary: primitiveColors.white,
  bgSecondary: primitiveColors.gray[50],
  bgTertiary: primitiveColors.gray[100],

  borderLight: primitiveColors.gray[200],
  borderMedium: primitiveColors.gray[300],
  borderStrong: primitiveColors.gray[400],

  success: "#10B981",
  successLight: "#D1FAE5",
  warning: "#F59E0B",
  warningLight: "#FEF3C7",
  error: "#EF4444",
  errorLight: "#FEE2E2",
  info: primitiveColors.blue[500],
  infoLight: primitiveColors.blue[50],

  hover: primitiveColors.gray[100],
  pressed: primitiveColors.gray[200],
  focus: primitiveColors.blue[500],
  disabled: primitiveColors.gray[100],
} as const;

export type PrimitiveColor = keyof typeof primitiveColors;
export type SemanticColor = keyof typeof semanticColors;

export const colors = {
  ...primitiveColors,
  ...semanticColors,
} as const;

export default colors;
