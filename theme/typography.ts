export const typography = {
  fontFamily: {
    heading: "Georgia",
    body: undefined,
  },
  fontSize: {
    xs: 12,
    sm: 14,
    body: 15,
    subheading: 16,
    heading: 28,
    display: 34,
  },
  fontWeight: {
    regular: "400" as const,
    medium: "500" as const,
    semibold: "600" as const,
    bold: "700" as const,
  },
  lineHeight: {
    tight: 20,
    normal: 22,
    relaxed: 26,
  },
  letterSpacing: {
    normal: 0,
    wide: 0.5,
    label: 1.2,
  },
};
