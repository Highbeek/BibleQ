import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");
import colors from "../Src/assets/constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  button: {
    backgroundColor: "#d3b58d",
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 35,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "600",
    color: "black",
    letterSpacing: 0.5,
  },
  bottomContainer: {
    justifyContent: "center",
    height: height / 3,
  },
  textInput: {
    height: 50,
    fontWeight: "500",
    fontSize: 22,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.2)",
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 25,
    paddingLeft: 10,
  },
  formButton: {
    backgroundColor: "#d3b58d",
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 35,
    marginHorizontal: 20,
    marginVertical: 10,
    shadowColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  formInputContainer: {
    marginBottom: 50,
  },

  closeButtonContainer: {
    height: 40,
    width: 40,
    alignSelf: "center",
    shadowColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 1,
  },
  background: {
    flex: 1,
    justifyContent: "center",
  },
  //Home
});

export default styles;
