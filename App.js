import React from "react";
import { StyleSheet, View, Text } from "react-native";
import SignIn from "./Src/components/signIn";
import HomeScreen from "./Src/screens/HomeScreen";
import { useFonts } from "expo-font";
import { ChangaOne_400Regular } from "@expo-google-fonts/changa-one";

export default function App() {
  let [fontsLoaded] = useFonts({
    ChangaOneRegular: ChangaOne_400Regular,
  });

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }
  return (
    <View style={styles.container}>
      {/* <SignIn /> */}
      <HomeScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:
      "linear-gradient(180deg, hsla(32, 36%, 90%, 1) 0%, hsla(34, 44%, 69%, 1) 30%, hsla(0, 0%, 100%, 1) 100%)",
  },
});
