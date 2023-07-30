// home.js
import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import FontText from "../../assets/constants/fonts";
import trophy from "../../assets/trophy.png";
import Carousel from "react-native-snap-carousel";
import preview from "../../assets/preview.png";
import CarImage from "../components/CarImage";
import { carouselData } from "../../assets/constants/index";

export default function HomeScreen() {
  const renderItem = ({ item }) => {
    return (
      <View>
        <Image source={item.img} style={styles.carImage} />
      </View>
    );
  };

  return (
    <View style={styles.homeContainer}>
      <View style={styles.header}>
        <FontText style={styles.headerText}>BibleQ</FontText>
        <Image source={trophy} style={styles.headerImg} />
      </View>
      <View style={styles.carouselContainer}>
        <CarImage renderItem={renderItem} />
      </View>
      <View style={styles.intro}>
        <FontText style={styles.introTitle}>
          How well do you know the Bible ?
        </FontText>
        <FontText style={styles.subtitle}>
          Play to Test Your Knowledge!
        </FontText>
      </View>
      <TouchableOpacity style={styles.btn}>
        <Text style={styles.btnText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  homeContainer: {
    marginTop: 50,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontSize: 84,
    fontWeight: "700",
    marginLeft: "auto",
  },
  headerImg: {
    width: 150,
    height: 150,
    marginLeft: "auto",
  },
  carouselContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    borderRadius: 200,
    overflow: "hidden", 
  },
  carImage: {
    width: 400,
    height: 400,
   
  },
  intro: {
    alignItems: "center",
  },
  introTitle: {
    fontSize: 26,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "300",
  },
  btn: {
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#000",
    marginHorizontal: 50,
    marginVertical: 20,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 30,
  },
  btnText: {
    fontSize: 22,
    fontWeight: "600",
    color: "#fff",
  },
});