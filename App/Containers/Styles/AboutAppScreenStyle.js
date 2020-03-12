import { StyleSheet, Dimensions } from "react-native"
import { ApplicationStyles, Colors } from "../../Themes/"
const screenHeight = Math.round(Dimensions.get("window").height)
const screenWidth = Math.round(Dimensions.get("window").width)

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    height: 70,
    backgroundColor: Colors.rootsyOffOrange3,
    borderBottomColor: Colors.rootsyPrimary,
    borderWidth: 0.25,
  },
  headerTxt: {
    fontSize: 21,
    fontStyle: "italic",
    fontWeight: "300",
    color: Colors.rootsyPrimary,
  },
  contentView: {
    position: "relative",

    justifyContent: "center",
    alignItems: "center",
  },
  logoHead: {
    width: 200,
    height: 200,
  },
  version: {
    height: 75,
  },
  versionTxt: {
    fontSize: 22,
    color: "black",
  },
  description: {},
  descriptionTxt: {
    fontSize: 14,
    width: screenWidth * 0.9,
    textAlign: "justify",
  },
})
