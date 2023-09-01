// carImage.js
import React from "react";
import { View, Text, Dimensions } from "react-native";
import Carousel from "react-native-snap-carousel";
import { carouselData } from "../assets/constants";

export default function CarImage({ renderItem }) {
  const screenWidth = Dimensions.get("window").width;
  return (
    <Carousel
      data={carouselData}
      renderItem={renderItem}
      sliderWidth={screenWidth}
      itemWidth={screenWidth}
      autoplay={true}
      autoplayInterval={3000}
      windowSize={1}
      loop={true}
    />
  );
}
