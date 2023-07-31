import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";

const EmojiQuestionScreen = () => {
  const [emojis, setEmojis] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Define your emoji questions here
  const emojiQuestions = [
    {
      emojis: ["🐪", "🐟", "🕊️", "🐍"],
      answer: "Moses",
    },
    {
      emojis: ["🦁", "👑", "👧"],
      answer: "Daniel",
    },
    // Add more emoji questions here...
  ];

  useEffect(() => {
    // Load the first question when the component mounts
    loadQuestion(currentIndex);
  }, []);

  const loadQuestion = (index) => {
    if (index >= emojiQuestions.length) {
      // All questions answered, show completion message or navigate to another screen
      Alert.alert(
        "Congratulations!",
        "You have completed the Emoji questions."
      );
    } else {
      const question = emojiQuestions[index];
      setEmojis(question.emojis);
      setAnswers([...answers, question.answer.toLowerCase()]);
      setCurrentIndex(index + 1);
    }
  };

  const handleAnswer = (text) => {
    const answer = text.toLowerCase().trim();
    const correctAnswer = answers[currentIndex - 1];

    if (answer === correctAnswer) {
      // Show "Correct" message and load the next question
      Alert.alert("Correct!", "Great job!", [
        { text: "Next", onPress: () => loadQuestion(currentIndex) },
      ]);
    } else {
      // Show "Incorrect" message or handle incorrect answer
      Alert.alert("Incorrect", "Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>
        Type the Bible character associated with these emojis:
      </Text>
      <View style={styles.emojisContainer}>
        {emojis.map((emoji, index) => (
          <Text key={index} style={styles.emoji}>
            {emoji}
          </Text>
        ))}
      </View>
      <TextInput
        style={styles.input}
        placeholder="Type your answer here"
        onSubmitEditing={(event) => handleAnswer(event.nativeEvent.text)}
      />
      <TouchableOpacity
        style={styles.nextButton}
        onPress={() => loadQuestion(currentIndex)}
      >
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  questionText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  emojisContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  emoji: {
    fontSize: 30,
    marginHorizontal: 10,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  nextButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
  },
  nextButtonText: {
    color: "white",
    fontSize: 16,
  },
});

export default EmojiQuestionScreen;
