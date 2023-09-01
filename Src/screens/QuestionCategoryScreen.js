import React,{useState} from "react";
import { StyleSheet, Text, View, TouchableOpacity, Button } from "react-native";
import FontText from "../assets/constants/fonts";
import QuestionCategoryScreen from "../components/QuestionCategoryScreen";
import { FIREBASE_AUTH } from "../config/firebase";
import { signOut } from "firebase/auth";
import QuizScreen from "../components/QuizScreen";

export default function QuestionScreen() {
  const [selectedCategory, setSelectedCategory] =useState(null);

  const handleCategoryPress = (category) => {
    setSelectedCategory(category);
  };

  if (selectedCategory) {
    return  <QuizScreen/>
    // <QuestionCategoryScreen category={selectedCategory}
    //  />;
  }

  return (
    <View style={styles.CategoryContainer}>
      <View
        style={{
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <FontText style={styles.logoText}>BibleQ</FontText>
        <Button
          onPress={() => FIREBASE_AUTH.signOut()}
          title="Log Out"
          color="#000"
        />
      </View>
      <Text>Choose Category</Text>

      <View style={styles.categories}>
        <TouchableOpacity
          style={[styles.category, { backgroundColor: "#cdb4db" }]}
          onPress={() => handleCategoryPress("oldTestament")}
        >
          <FontText style={styles.categoryText}>Old Testament</FontText>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.category, { backgroundColor: "#bde0fe" }]}
          onPress={() => handleCategoryPress("newTestament")}
        >
          <FontText style={styles.categoryText}>New Testament</FontText>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.category, { backgroundColor: "#ffafcc" }]}
          onPress={() => handleCategoryPress("wholeBible")}
        >
          <FontText style={styles.categoryText}>Whole Bible</FontText>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  CategoryContainer: {
    marginTop: 50,
    marginHorizontal: 20,
  },
  logoText: {
    fontFamily: "ChangaOneRegular",
    fontSize: 55,
  },
  categories: {},
  category: {
    marginVertical: 40,
    height: 150,
    borderRadius: 20,
    paddingHorizontal: 15,
  },
  categoryText: {
    position: "absolute",
    bottom: 20,
    left: 10,
    fontFamily: "ChangaOneRegular",
    fontSize: 25,
  },
});
