import React from "react";
import {
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  Text,
  View,
  Alert,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
  interpolate,
} from "react-native-reanimated";
import FontText from "../../assets/constants/fonts";
import styles from "../../styles/styles";
import { registerWithEmailAndPassword, signIn } from "../config/firebase";
import { useNavigation } from "@react-navigation/native";

export default function Form({
  isRegistering,
  formButtonScale,
  imagePosition,
  email,
  setEmail,
  username,
  setUsername,
  password,
  setPassword,
  loginHandler,
  registerHandler,
}) {
  const formAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(imagePosition.value === 0 ? 1 : 0, {
        duration: 300,
      }),
      height: interpolate(imagePosition.value, [0, 1], [500, 0]),
      overflow: "hidden",
    };
  });

  const navigation = useNavigation();
  const handleCloseButton = () => {
    imagePosition.value = 1;
  };

  const buttonsAnimatedStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(imagePosition.value, [0, 1], [250, 0]);
    return {
      opacity: withTiming(imagePosition.value, { duration: 500 }),
      transform: [
        { translateY: withTiming(interpolation, { duration: 1000 }) },
      ],
    };
  });

  const formButtonAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: formButtonScale.value }],
    };
  });

  return (
    <View style={styles.bottomContainer}>
      <Animated.View style={buttonsAnimatedStyle}>
        <Pressable style={styles.button} onPress={loginHandler}>
          <FontText style={styles.buttonText}>LOG IN</FontText>
        </Pressable>
      </Animated.View>
      <Animated.View style={buttonsAnimatedStyle}>
        <Pressable style={styles.button} onPress={registerHandler}>
          <FontText style={styles.buttonText}>REGISTER</FontText>
        </Pressable>
      </Animated.View>
      <Animated.View style={[styles.formContainer, formAnimatedStyle]}>
        <KeyboardAvoidingView behavior="position">
          <TextInput
            placeholder="Email"
            placeholderTextColor="black"
            style={styles.textInput}
            value={email}
            onChangeText={setEmail}
          />
          {isRegistering && (
            <TextInput
              placeholder="Username"
              placeholderTextColor="black"
              style={styles.textInput}
              value={username}
              onChangeText={setUsername}
            />
          )}
          <TextInput
            placeholder="Password"
            placeholderTextColor="black"
            style={styles.textInput}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <Animated.View style={[styles.formButton, formButtonAnimatedStyle]}>
            <Pressable
              onPress={async () => {
                if (isRegistering) {
                  try {
                    const userCredential = await registerWithEmailAndPassword(
                      email,
                      password
                    );
                    const user = userCredential.user;
                    console.log(
                      "User registered:",
                      user.uid,
                      user.email,
                      user.username
                    );
                    Alert.alert(
                      "Success",
                      "Account created",
                      [{ text: "OK", onPress: () => handleCloseButton() }],
                      { cancelable: false }
                    );

                    handleCloseButton();
                  } catch (error) {}
                } else {
                  try {
                   const userCredential = await signIn(email, password);
                    const user = userCredential.user;
                    console.log("User logged in:", user.uid, user.email);
                    navigation.navigate("Home");
                  } catch (error) {}
                }
              }}
            >
              <FontText style={styles.buttonText}>
                {isRegistering ? "REGISTER" : "LOG IN"}
              </FontText>
            </Pressable>
          </Animated.View>
        </KeyboardAvoidingView>
      </Animated.View>
    </View>
  );
}
