import React, { useState, useEffect } from "react";
import {
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  Text,
  View,
  Alert,
  ActivityIndicator,
  Keyboard,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
  interpolate,
} from "react-native-reanimated";
import FontText from "../assets/constants/fonts";
import styles from "../../styles/styles";

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
  handleSignUp,
  handleSignIn,
}) {
  const [loading, setLoading] = useState(false);
  const [isKeyboardActive, setIsKeyboardActive] = useState(false);

  const formAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(imagePosition.value === 0 ? 1 : 0, {
        duration: 300,
      }),
      height: interpolate(imagePosition.value, [0, 1], [500, 0]),
      overflow: "hidden",
    };
  });

  const handleCloseButton = () => {
    imagePosition.value = 1;
  };

  const textInputTextColorAnimatedStyle = useAnimatedStyle(() => {
    const textColorOpacity =
      imagePosition.value === 0
        ? interpolate(imagePosition.value, [0, 1], [1, 0])
        : 1;

    const textColor = `rgba(255, 255, 255, ${textColorOpacity})`;

    return {
      color: textColor,
    };
  });

  useEffect(() => {
    // Listen to keyboard events and update isKeyboardActive state
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setIsKeyboardActive(true);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setIsKeyboardActive(false);
      }
    );

    // Clean up the listeners when the component unmounts
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

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
      <Animated.View style={[styles.formInputContainer, formAnimatedStyle]}>
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
          <Animated.View
            style={[
              styles.formButton,
              formButtonAnimatedStyle,
              isKeyboardActive && textInputTextColorAnimatedStyle,
            ]}
          >
            <Pressable
              onPress={async () => {
                if (loading) return;
                setLoading(true);

                if (isRegistering) {
                  try {
                    await handleSignUp();
                  } catch (error) {
                    // Handle error
                  } finally {
                    setLoading(false);
                  }
                } else {
                  try {
                    await handleSignIn();
                  } catch (error) {
                    // Handle error
                  } finally {
                    setLoading(false);
                  }
                }
              }}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator size="large" color="#000" />
              ) : (
                <FontText style={styles.buttonText}>
                  {isRegistering ? "REGISTER" : "LOG IN"}
                </FontText>
              )}
            </Pressable>
          </Animated.View>
        </KeyboardAvoidingView>
      </Animated.View>
    </View>
  );
}
