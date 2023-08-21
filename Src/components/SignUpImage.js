import React from "react";
import {StyleSheet, Dimensions } from "react-native";
import Svg, { Image, Ellipse, ClipPath } from "react-native-svg";
import Animated, {
  interpolate,
  withTiming,
  useAnimatedStyle,
} from "react-native-reanimated";
import { AntDesign } from "@expo/vector-icons";
import styles from "../../styles/styles";

export default function ImageComponent({ imagePosition }) {
  const { height, width } = Dimensions.get("window");

  const imageAnimatedStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(
      imagePosition.value,
      [0, 1],
      [-height / 1.3, 0]
    );
    return {
      transform: [
        { translateY: withTiming(interpolation, { duration: 1000 }) },
      ],
    };
  });

  const closeButtonContainerStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(imagePosition.value, [0, 1], [180, 360]);
    return {
      opacity: withTiming(imagePosition.value === 1 ? 0 : 1, { duration: 800 }),
      transform: [
        { rotate: withTiming(interpolation + "deg", { duration: 1000 }) },
      ],
    };
  });

  return (
    <Animated.View style={[StyleSheet.absoluteFill, imageAnimatedStyle]}>
      <Svg height={height + 100} width={width}>
        <ClipPath id="clipPathId">
          <Ellipse cx={width / 2} rx={height} ry={height + 100} />
        </ClipPath>
        <Image
          href={require("../../assets/abram2.jpeg")}
          width={width + 100}
          height={height + 100}
          preserveAspectRatio="xMidYMid slice"
          clipPath="url(#clipPathId)"
        />
      </Svg>
      <Animated.View
        style={[styles.closeButtonContainer, closeButtonContainerStyle]}
      >
        <AntDesign
          name="closecircle"
          size={35}
          color="black"
          onPress={() => (imagePosition.value = 1)}
        />
      </Animated.View>
    </Animated.View>
  );
}
