import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import ConfettiCannon from "react-native-confetti-cannon";
import { Ionicons } from "@expo/vector-icons";
import { qbg } from "../assets/images";
import FontText from "../assets/constants/fonts";

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export default function QuizScreen() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showNextQuestion, setShowNextQuestion] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [message, setMessage] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const [questionsData, setQuestionsData] = useState([]);

  const loadQuestions = () => {
    try {
      const data = require("../assets/constants/questions.json").slice(0, 5);
      // console.log("Loaded data:", data);

      const shuffledQuestions = data.map((question) => {
        const options = shuffleArray([...question.options]); // Create a copy of options before shuffling
        const correctAnswerIndex = options.indexOf(question.options[0]); // Set the correct answer based on the original order
        return {
          question: question.question,
          options,
          correctAnswerIndex,
        };
      });
      setQuestionsData(shuffledQuestions);
    } catch (error) {
      console.error("Error loading questions:", error);
      setQuestionsData([]);
    }
  };

  useEffect(() => {
    console.log("Fetching questions...");
    loadQuestions();
  }, []);

  const handleAnswer = (answerIndex) => {
    const currentQuestion = questionsData[currentQuestionIndex];

    if (currentQuestion.correctAnswerIndex === answerIndex) {
      setMessage("Oh Yeah! That's Correct!");
      setScore(score + 1);
      setShowConfetti(true);

      setTimeout(() => {
        handleNextQuestion();
      }, 2000);
    } else {
      setMessage("Oops! That's Wrong.");
    }

    setSelectedAnswer(answerIndex);
    setShowNextQuestion(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questionsData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowNextQuestion(false);
      setSelectedAnswer(null);
      setMessage("");
    } else {
      setCurrentQuestionIndex(0);
      setScore(0);
      setShowNextQuestion(false);
      setSelectedAnswer(null);
      setMessage("");
      setShowConfetti(false);
      shuffleArray(questionsData);
    }
  };

  return (
    <ImageBackground source={qbg} style={styles.container}>
      <FontText style={styles.headerTxt}>Question {currentQuestionIndex + 1}</FontText>
      <View style={styles.questionContainer}>
        <View style={styles.question}>
          <FontText style={styles.questionTxt}>
            {questionsData[currentQuestionIndex]?.question || "Loading..."}
          </FontText>
        </View>
      </View>
      <View style={styles.multichoiceContainer}>
        {questionsData[currentQuestionIndex]?.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleAnswer(index)} // Pass the index of the selected answer
            style={[
              styles.multichoice,
              selectedAnswer === index && { backgroundColor: "#00FF00" },
            ]}
            disabled={showNextQuestion}
          >
            <FontText style={styles.text}>{option}</FontText>
            {selectedAnswer === index && (
              <Ionicons
                name={
                  message === "Oh Yeah! That's Correct!"
                    ? "ios-checkmark-circle-sharp"
                    : "ios-close-circle-sharp"
                }
                size={24}
                color={
                  message === "Oh Yeah! That's Correct!" ? "#00FF00" : "red"
                }
                style={styles.icons}
              />
            )}
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
    backgroundColor: "skyblue",
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
    fontSize: 24,
    fontStyle: "italic",
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff",
    fontFamily: "Helvetica",
    letterSpacing: 1.5,
  },
});
