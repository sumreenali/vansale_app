import { StyleSheet, Dimensions } from "react-native"
import { ApplicationStyles, Colors } from "../../Themes/"
const screenWidth = Math.round(Dimensions.get("window").width)

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  scene: {
    flex: 1,
    height: 700,
    backgroundColor: "#eee",
  },
  tabBar: {
    backgroundColor: Colors.rootsyOffOrange3,
  },
  indicator: {
    backgroundColor: Colors.rootsyPrimary,
  },
  labelStyle: {
    color: Colors.rootsyPrimary,
    fontWeight: "700",
  },
  cardContainer: {
    width: screenWidth,
    backgroundColor: Colors.snow,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
  },
})
