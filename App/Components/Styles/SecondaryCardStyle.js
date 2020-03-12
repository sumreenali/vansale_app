import { StyleSheet, Dimensions } from "react-native";
import { Colors } from "../../Themes";
const screenWidth = Math.round(Dimensions.get("window").width);

export default StyleSheet.create({
  container: {
    height: 150,
    width: screenWidth * 0.98,
    backgroundColor: Colors.snow,
    justifyContent: "center",
    alignItems: "center"
  },
  img: {
    width: "100%",
    height: "100%",
    borderRadius: 7.5
  },
  bottomTag: {
    position: "absolute",
    flexDirection: "row",
    backgroundColor: "rgba(0, 0, 0, 0.36)",
    width: "30%",
    height: "15%",
    bottom: "3%",
    right: "1.25%",
    borderRadius: 12.5,
    justifyContent: "space-evenly",
    alignItems: "center"
  },
  bottomTagTxt: {
    color: Colors.snow
  }
});
