import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { useFonts, ChangaOne_400Regular } from "@expo-google-fonts/changa-one";
import HomeScreen from "./Src/screens/HomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignInScreen from "./Src/screens/SignInScreen";
import QuestionScreen from "./Src/screens/QuestionScreen";
import { FIREBASE_AUTH } from "./Src/config/firebase";
import { onAuthStateChanged } from "firebase/auth";

const Stack = createNativeStackNavigator();
const InsideStack = createNativeStackNavigator();

const InsideLayout = () => {
  return (
    <InsideStack.Navigator>
      <InsideStack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <InsideStack.Screen
        name="Question"
        component={QuestionScreen}
        options={{ headerShown: false }}
      />
    </InsideStack.Navigator>
  );
};

export default function App() {
  const [fontsLoaded] = useFonts({
    ChangaOneRegular: ChangaOne_400Regular,
  });

  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log("user", user);
      setUser(user);
    });
  }, []);

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <NavigationContainer style={styles.container}>
      <Stack.Navigator initialRouteName="SignIn">
        {user ? (
          <Stack.Screen
            name="Inside"
            component={InsideLayout}
            options={{
              headerShown: false,
            }}
          />
        ) : (
          <Stack.Screen
            name="SignIn"
            component={SignInScreen}
            options={{
              headerShown: false,
            }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
});
