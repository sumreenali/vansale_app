import { StyleSheet } from "react-native"
import { Screen, Colors } from "../../Themes"

export default StyleSheet.create({
  container: {
    flex: 1,
    width: Screen.width * 0.96,
    height: 50,
    backgroundColor: Colors.rootsyOffOrange2,
    marginTop: 7.5,
    borderRadius: 2,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 10
  },
  text: {
    fontSize: 17
  }
})