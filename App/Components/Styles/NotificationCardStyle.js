import { StyleSheet, Dimensions } from "react-native";
import { Colors } from "../../Themes";
const screenWidth = Math.round(Dimensions.get("window").width);

export default StyleSheet.create({
  container: {
    flex: 1,
    width: screenWidth * 0.99,
    left: screenWidth * 0.005,
    minHeight: 90,
    backgroundColor: Colors.rootsyOffOrange3,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 3
  },
  leftView: {
    flex: 1,
    borderRadius: 5,
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  rightView: {
    flex: 3,
    borderTopEndRadius: 5,
    borderBottomEndRadius: 5,
    backgroundColor: Colors.rootsyOffOrange2,
    height: "100%",
    justifyContent: "space-evenly",
    padding: 10
  },
  leftViewDate: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  leftViewDateTxt: {
    width: "75%",
    textAlign: "center",
    color: Colors.snow,
    fontSize: 15,
    fontWeight: "700",
    fontStyle: "italic"
  },
  rightViewTopTxt: {
    fontWeight: "500"
  },
  rightViewMiddleTxt: {
    fontStyle: "italic"
  }
});
