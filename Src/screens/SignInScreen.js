// SignInScreen.js
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  StatusBar,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { useSharedValue } from "react-native-reanimated";
import { auth } from "../config/firebase";
import ImageComponent from "../components/SignUpImage";
import Form from "../components/Form";
import styles from "../../styles/styles";

export default function SignInScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const imagePosition = useSharedValue(1);
  const formButtonScale = useSharedValue(1);

  const handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log(user.email, username);
      })
      .catch((error) => alert(error.message));
  };

  const loginHandler = () => {
    imagePosition.value = 0;
    if (isRegistering) {
      setIsRegistering(false);
    }
  };

  const registerHandler = () => {
    imagePosition.value = 0;
    if (!isRegistering) {
      setIsRegistering(true);
    }
    if (isRegistering) {
      handleSignUp();
    }
  };

  return (
    <LinearGradient
      colors={["#efe6dc", "#d3b58d", "#ffffff"]}
      style={[styles.background, styles.background]}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Animated.View style={styles.container}>
          <StatusBar barStyle="light-content" />
          <ImageComponent imagePosition={imagePosition} />
          <Form
            isRegistering={isRegistering}
            formButtonScale={formButtonScale}
            email={email}
            setEmail={setEmail}
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            loginHandler={loginHandler}
            registerHandler={registerHandler}
            imagePosition={imagePosition}
          />
        </Animated.View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}
