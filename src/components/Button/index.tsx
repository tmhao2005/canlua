import React, { useContext } from "react";
import {
 TouchableOpacity, ButtonProps, Text, ViewStyle, TouchableOpacityProps
} from "react-native";
import {
 Colors, Theme
} from "../Theme";

type Size = 'md' | 'lg';

interface Props extends TouchableOpacityProps {
  size?: Size,
  color?: keyof Colors;
}

const styles: Record<Size, ViewStyle> = {
  md: {
    height: 48,
  },
  lg: {
    height: 64,
  }
};

// const textColor = (color: keyof Colors, accentColor: boolean) => {
//   if (color === "background") {
//     return "subtle";
//   } else if (color === "accent") {
//     return accentColor ? "complementary" : "background";
//   } else {
//     return "contrast";
//   }
// };

export const Button: React.FunctionComponent<Props> = ({color = "background", size = 'md', style, children, ...rest}) => {
  const {colors} = useContext(Theme);

  return (
    <TouchableOpacity
      style={{
        padding: 4,
        borderWidth: 1,
        borderRadius: 4,
        justifyContent: "center",
        alignItems: "center",
        borderColor: `${
          color === "background" ? colors.faded : colors[color]
        }`,
        backgroundColor: `${colors[color]}`,
        ...styles[size],
        ...style as object,
      }}
      {...rest}
    >
      <Text style={{
        // color: textColor(color, !!colors.accent),
        color: '#fff',
        fontWeight: "bold",
      }}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};
