import Color from "color";
import React from "react";

export interface Colors {
  accent: string;
  contrast?: string | number;
  muted: string;
  statuses?: object;
  note: string;
  warning: string;
  danger: string;
  black?: string;
  faded?: string;
  success: string;
  default: string;
  subtle: string;
  divide: string;
  soft: string;
  faint: string;
  background: string;
  transparent: string;
  delicate?: string;
  thin?: string;
  successHighest?: string;
  successHigh?: string;
  successMid?: string;
  successLow?: string;
  successLowest?: string;
  noteHighest?: string;
  noteHigh?: string;
  noteMid?: string;
  noteLow?: string;
  noteLowest?: string;
  warningHighest?: string;
  warningHigh?: string;
  warningMid?: string;
  warningLow?: string;
  warningLowest?: string;
  dangerHighest?: string;
  dangerHigh?: string;
  dangerMid?: string;
  dangerLow?: string;
  dangerLowest?: string;
  vividHighest?: string;
  vividHigh?: string;
  vividMid?: string;
  vividLow?: string;
  vividLowest?: string;
}

export interface Theme {
  colors: Colors;
}

export interface GenerateThemeInput {
  accent?: string;
  mode?: "dark" | "light";
  theme?: Theme;
}

const options = {
  color: {
    light: {
      neutral: {
        N000: "#FFFFFF",
        N100: "#F7F8F8",
        N200: "#F1F3F3",
        N300: "#E6E9EA",
        N400: "#D3D8D9",
        N500: "#B5BEC0",
        N600: "#8C9597",
        N700: "#666F71",
        N800: "#394446",
        N900: "#22292A",
      },
      cyan: {
        C50: "#F4FAFB",
        C100: "#E9F4F7",
        C400: "#65CADF",
        C700: "#317481",
        C800: "#114954",
      },
      blue: {
        B50: "#F0F8FE",
        B100: "#EAF0F6",
        B500: "#5887B1",
        B700: "#315A81",
        B800: "#143452",
      },
      lime: {
        L50: "#F9FFF0",
        L100: "#F7FFE0",
        L400: "#D4FF26",
        L700: "#5F6F2A",
        L800: "#34400D",
      },
      red: {
        R50: "#FBF6F4",
        R100: "#FAF2ED",
        R200: "#FDAF8D",
        R700: "#B03603",
        R800: "#5E2108",
      },
      orange: {
        O50: "#FFF9F0",
        O100: "#FFF4E0",
        O300: "#EEB068",
        O700: "#815C31",
        O800: "#553611",
      },
    },
    dark: {
      neutral: {
        N000: "#FFFFFF",
        N100: "#F7F8F8",
        N200: "#F1F3F3",
        N300: "#E6E9EA",
        N400: "#D3D8D9",
        N500: "#B5BEC0",
        N600: "#8C9597",
        N700: "#666F71",
        N800: "#394446",
        N900: "#22292A",
      },
      cyan: {
        C50: "#F4FAFB",
        C100: "#E9F4F7",
        C400: "#65CADF",
        C700: "#317481",
        C800: "#114954",
      },
      blue: {
        B50: "#F0F8FE",
        B100: "#EAF0F6",
        B500: "#5887B1",
        B700: "#315A81",
        B800: "#143452",
      },
      lime: {
        L50: "#F9FFF0",
        L100: "#F7FFE0",
        L400: "#D4FF26",
        L700: "#5F6F2A",
        L800: "#34400D",
      },
      red: {
        R50: "#FBF6F4",
        R100: "#FAF2ED",
        R200: "#FDAF8D",
        R700: "#B03603",
        R800: "#5E2108",
      },
      orange: {
        O50: "#FFF9F0",
        O100: "#FFF4E0",
        O300: "#EEB068",
        O700: "#815C31",
        O800: "#553611",
      },
    },
  },
};

export const opacify = (hexColor: string, opaque = 1) =>
  Color(hexColor)
    .fade(1 - opaque)
    .string();

export const darken = (hexColor: string, ration = 1) =>
  Color(hexColor)
    .darken(ration)
    .rgb()
    .string();

export const tint = (hexColor: string, ration = 1) =>
  Color(hexColor)
    .lighten(1 - ration)
    .rgb()
    .string();

export const mix = (mixColor: string) => (baseColor: string, weight = 0.5) =>
  Color(baseColor)
    .mix(Color(mixColor), weight)
    .hex();

export const isDark = (color: string) => Color(color).isDark();

export const getContrastColor = (color: string) =>
  isDark(color) ? "lightest" : "darkest";


const brandAccent = options.color.light.cyan.C800;

const baseGreys = {
  grey0: options.color.light.neutral.N000,
  grey1: options.color.light.neutral.N100,
  grey2: options.color.light.neutral.N200,
  grey3: options.color.light.neutral.N300,
  grey4: options.color.light.neutral.N400,
  grey5: options.color.light.neutral.N500,
  grey6: options.color.light.neutral.N600,
  grey7: options.color.light.neutral.N700,
  grey8: options.color.light.neutral.N800,
  grey9: options.color.light.neutral.N900,
};

export interface ColorArguments {
  accent?: string;
  mode?: "light" | "dark";
}

export const generateColors = ({
  accent = brandAccent,
  mode = "light",
}: ColorArguments): Colors => {
  const accentMix = mix(accent);

  const isGo1Accent = accent === options.color.light.cyan.C800;

  const complementary = isGo1Accent
    ? options.color.light.lime.L400
    : options.color.light.neutral.N000;

  const accentGreys = {
    light: {
      contrast: isGo1Accent
        ? options.color.light.neutral.N900
        : accentMix(baseGreys.grey9, 0.05),
      default: isGo1Accent
        ? options.color.light.neutral.N800
        : accentMix(baseGreys.grey8, 0.25),
      subtle: isGo1Accent
        ? options.color.light.neutral.N700
        : accentMix(baseGreys.grey7, 0.2),
      thin: isGo1Accent
        ? options.color.light.neutral.N600
        : accentMix(baseGreys.grey6, 0.2),
      muted: isGo1Accent
        ? options.color.light.neutral.N500
        : accentMix(baseGreys.grey5, 0.25),
      faded: isGo1Accent
        ? options.color.light.neutral.N400
        : accentMix(baseGreys.grey4, 0.15),
      delicate: isGo1Accent
        ? options.color.light.neutral.N300
        : accentMix(baseGreys.grey3, 0.08),
      soft: isGo1Accent
        ? options.color.light.neutral.N200
        : accentMix(baseGreys.grey2, 0.07),
      divide: isGo1Accent
        ? options.color.light.neutral.N200
        : accentMix(baseGreys.grey2, 0.07),
      faint: isGo1Accent
        ? options.color.light.neutral.N100
        : accentMix(baseGreys.grey1, 0.02),
      background: isGo1Accent
        ? options.color.light.neutral.N000
        : baseGreys.grey0,
      transparent: "transparent",
    },
    dark: {
      contrast: baseGreys.grey0,
      default: isGo1Accent
        ? accentMix(options.color.dark.neutral.N200, 0.1)
        : accentMix(baseGreys.grey4, 0.15),
      subtle: isGo1Accent
        ? accentMix(options.color.dark.neutral.N300, 0.27)
        : accentMix(baseGreys.grey6, 0.2),
      thin: isGo1Accent
        ? accentMix(options.color.dark.neutral.N400, 0.35)
        : accentMix(baseGreys.grey7, 0.25),
      muted: isGo1Accent
        ? accentMix(options.color.dark.neutral.N500, 0.55)
        : accentMix(baseGreys.grey8, 0.35),
      faded: isGo1Accent
        ? accentMix(options.color.dark.neutral.N600, 0.55)
        : accentMix(baseGreys.grey8, 0.14),
      delicate: isGo1Accent
        ? accentMix(options.color.dark.neutral.N700, 0.45)
        : accentMix(baseGreys.grey8, 0.14),
      soft: isGo1Accent
        ? accentMix(options.color.dark.neutral.N800, 0.35)
        : accentMix(baseGreys.grey9, 0.17),
      divide: isGo1Accent
        ? accentMix(options.color.dark.neutral.N800, 0.35)
        : accentMix(baseGreys.grey9, 0.17),
      faint: isGo1Accent
        ? accentMix(options.color.dark.neutral.N900, 0.22)
        : accentMix(baseGreys.grey9, 0.12),
      background: isGo1Accent
        ? accentMix(options.color.dark.neutral.N900, 0.05)
        : accentMix(baseGreys.grey9, 0.05),
      transparent: "transparent",
    },
  };

  const statusColorsPerMode = {
    light: {
      success: options.color.light.cyan.C400,
      successHighest: options.color.light.cyan.C50,
      successHigh: options.color.light.cyan.C100,
      successMid: options.color.light.cyan.C400,
      successLow: options.color.light.cyan.C700,
      successLowest: options.color.light.cyan.C800,
      note: options.color.light.blue.B500,
      noteHighest: options.color.light.blue.B50,
      noteHigh: options.color.light.blue.B100,
      noteMid: options.color.light.blue.B500,
      noteLow: options.color.light.blue.B700,
      noteLowest: options.color.light.blue.B800,
      warning: options.color.light.orange.O300,
      warningHighest: options.color.light.orange.O50,
      warningHigh: options.color.light.orange.O100,
      warningMid: options.color.light.orange.O300,
      warningLow: options.color.light.orange.O700,
      warningLowest: options.color.light.orange.O800,
      danger: options.color.light.red.R700,
      dangerHighest: options.color.light.red.R50,
      dangerHigh: options.color.light.red.R100,
      dangerMid: options.color.light.red.R200,
      dangerLow: options.color.light.red.R700,
      dangerLowest: options.color.light.red.R800,
      vividHighest: options.color.light.lime.L50,
      vividHigh: options.color.light.lime.L100,
      vividMid: options.color.light.lime.L400,
      vividLow: options.color.light.lime.L700,
      vividLowest: options.color.light.lime.L800,
    },
    dark: {
      success: options.color.dark.cyan.C400,
      successHighest: options.color.dark.cyan.C800,
      successHigh: options.color.dark.cyan.C700,
      successMid: options.color.dark.cyan.C400,
      successLow: options.color.dark.cyan.C100,
      successLowest: options.color.dark.cyan.C50,
      note: options.color.dark.blue.B500,
      noteHighest: options.color.dark.blue.B800,
      noteHigh: options.color.dark.blue.B700,
      noteMid: options.color.dark.blue.B500,
      noteLow: options.color.dark.blue.B100,
      noteLowest: options.color.dark.blue.B50,
      warning: options.color.dark.orange.O300,
      warningHighest: options.color.dark.orange.O800,
      warningHigh: options.color.dark.orange.O700,
      warningMid: options.color.dark.orange.O300,
      warningLow: options.color.dark.orange.O100,
      warningLowest: options.color.dark.orange.O50,
      danger: options.color.dark.red.R700,
      dangerHighest: options.color.dark.red.R800,
      dangerHigh: options.color.dark.red.R700,
      dangerMid: options.color.dark.red.R200,
      dangerLow: options.color.dark.red.R100,
      dangerLowest: options.color.dark.red.R50,
      vividHighest: options.color.dark.lime.L50,
      vividHigh: options.color.dark.lime.L100,
      vividMid: options.color.dark.lime.L400,
      vividLow: options.color.dark.lime.L700,
      vividLowest: options.color.dark.lime.L800,
    },
  };

  const statusColors = statusColorsPerMode[mode];
  const themedGreys = accentGreys[mode];

  return {
    accent,
    ...themedGreys,
    ...statusColors,
  };
};

export const colors: Colors = generateColors({});

export const generateTheme = ({
  accent = brandAccent,
  mode = "light",
}: GenerateThemeInput = {}): Theme => ({
  colors: generateColors({
 accent, mode
}),
});

export const foundations: Theme = generateTheme();

export const Theme = React.createContext(foundations);
