import React from "react";
import { Text } from "react-native";

const FontText = ({ children, style }) => {
  return (
    <Text style={[{ fontFamily: "ChangaOneRegular" }, style]}>{children}</Text>
  );
};

export default FontText;
