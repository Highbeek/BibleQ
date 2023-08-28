// SignInScreen.js
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  StatusBar,
  ActivityIndicator,
  Button,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { useSharedValue } from "react-native-reanimated";
import { auth } from "../config/firebase";
import ImageComponent from "../components/SignUpImage";
import Form from "../components/Form";
import styles from "../../styles/styles";
import { FIREBASE_AUTH } from "../config/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

export default function SignInScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [loading, setLoading] = useState(false);
  const imagePosition = useSharedValue(1);
  const formButtonScale = useSharedValue(1);

  const auth = FIREBASE_AUTH;

  const handleSignUp = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(response);
      Alert.alert("Success", "User created and registered successfully", [
        {
          text: "OK",
        },
      ]);
    } catch (err) {
      console.log(err);
      Alert.alert("Error", "Sign Up and Registration Failed!" + err.message);
    } finally {
      setLoading(false);
    }
  };

 

  const handleSignIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(
        auth,
        user.email,
        user.password
      );
      console.log(response);
      // Alert.alert("Sign In Success");
    } catch (err) {
      console.log(err);
      Alert.alert("Sign In Failed!" + err.message);
    } finally {
      setLoading(false);
    }
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
            handleSignUp={handleSignUp}
            handlesignIn={handleSignIn}
          />
        </Animated.View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}
