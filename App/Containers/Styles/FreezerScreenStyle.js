import { StyleSheet, Dimensions } from "react-native"
import { ApplicationStyles, Colors } from "../../Themes/"
const screenWidth = Math.round(Dimensions.get("window").width)

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  body: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  header: {
    height: 40,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eee",
  },
  headerText: {
    fontSize: 19,
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
