import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";
import { qbg } from "../assets/images";
import FontText from "../assets/constants/fonts";
import { emoji } from "../assets/images";
import { Ionicons } from "@expo/vector-icons";
import ConfettiCannon from "react-native-confetti-cannon";

const answerOptions = [
  {
    answer: "Adam",
    backgroundColor: "#01D473",
    correct: true,
    message: "Oh Yeah!",
  },
  {
    answer: "Peter",
    backgroundColor: "red",
    correct: false,
    message: "Oops😟",
  },
  {
    answer: "James",
    backgroundColor: "red",
    correct: false,
    message: "Oops😟",
  },
  { answer: "Ope", backgroundColor: "red", correct: false, message: "Oops😟" },
];

export default function QuizScreen() {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [message, setMessage] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);

  const handleAnswer = (answer, backgroundColor, correct, message) => {
    setSelectedAnswer(answer);
    setMessage(correct ? "Oh Yeah!" : message);
    if (correct) {
      setShowConfetti(true); // Show confetti when answer is correct
    }
  };

  return (
    <ImageBackground source={qbg} style={styles.container}>
      <FontText style={styles.headerTxt}>Question 1</FontText>
      <View style={styles.questionContainer}>
        <View style={styles.question}>
          <FontText style={styles.questionTxt}>
            Who was the first man God created?
            <Image source={emoji} style={styles.questionEmoji} />
          </FontText>
        </View>
      </View>
      <View style={styles.multichoiceContainer}>
        {answerOptions.map(({ answer, backgroundColor, correct, message }) => (
          <TouchableOpacity
            key={answer}
            onPress={() =>
              handleAnswer(answer, backgroundColor, correct, message)
            }
            style={[
              styles.multichoice,
              selectedAnswer === answer && { backgroundColor },
            ]}
          >
            {selectedAnswer === answer && (
              <Ionicons
                name={
                  correct
                    ? "ios-checkmark-circle-sharp"
                    : "ios-close-circle-sharp"
                }
                size={24}
                color="black"
                style={styles.icons}
              />
            )}
            <Text style={styles.text}>{answer}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.message}>
        <Text style={styles.messageText}>{message}</Text>
      </View>
      {showConfetti && <ConfettiCannon count={200} origin={{ x: -10, y: 0 }} />}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 50,
    paddingHorizontal: 20,
  },
  headerTxt: {
    color: "#fff",
    fontSize: 32,
    textAlign: "center",
    marginVertical: 10,
  },
  questionContainer: {
    backgroundColor: "lightblue",
    padding: 10,
    borderRadius: 10,
    height: 300,
  },
  question: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    height: 280,
    alignItems: "center",
    justifyContent: "center",
  },
  questionTxt: {
    fontSize: 28,
    textAlign: "center",
  },
  questionEmoji: {
    width: 100,
    height: 100,
    position: "absolute",
    top: 10,
    right: 10,
  },
  multichoiceContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },
  multichoice: {
    width: "100%",
    height: 50,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 25,
    fontWeight: "400",
  },
  icons: {
    marginRight: 10,
  },
  message: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  messageText: {
    fontSize: 32,
    fontStyle: "italic",
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff",
    fontFamily: "Helvetica",
    letterSpacing: 1.5,
  },
});
