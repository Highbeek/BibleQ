import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { bibleQuestions } from "../../assets/constants";

const QuestionCategoryScreen = ({ category }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const questions =
    category === "oldTestament"
      ? bibleQuestions.oldTestament
      : category === "newTestament"
      ? bibleQuestions.newTestament
      : bibleQuestions.wholeBible;

  const handleAnswerSelection = (selectedAnswer) => {
    const correctAnswer = questions[currentQuestion].correctAnswer;

    if (selectedAnswer === correctAnswer) {
      // Show "Correct" message and move to the next question
      setCurrentQuestion((prev) => prev + 1);
    } else {
      // Show "Incorrect" message or handle incorrect answer
      // Here, we'll just move to the next question for simplicity
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  if (currentQuestion >= questions.length) {
    // All questions answered, show completion message or navigate to another screen
    return (
      <View style={styles.container}>
        <Text>
          Congratulations! You have completed the {category} questions.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text>{questions[currentQuestion].question}</Text>
      {questions[currentQuestion].answers.map((answer, index) => (
        <Text key={index} onPress={() => handleAnswerSelection(answer)}>
          {answer}
        </Text>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
  },
});

export default QuestionCategoryScreen;
