import { StyleSheet } from "react-native"
import { Colors, Screen } from "../../Themes"

export default StyleSheet.create({
  container: {
    width: Screen.width * 0.92,
    height: 70,
    marginTop: 14,
    borderColor: Colors.rootsyPrimary,
    backgroundColor: Colors.rootsyOffOrange3,
    borderWidth: 1,
    borderRadius: 2.5,
    padding: 5,
  },
  text1: {
    fontSize: 15,
    width: "96%",
    height: "99%",
    marginLeft: 7.5,
    textAlignVertical: "center"
  },
  R1: {
    flex: 1,
  },
  R2: {
    flex: 1,
  },
  R3: {
    flex: 1,
  },
  R4: {
    flex: 1,
  },
  R5: {
    flex: 1,
  },
})
