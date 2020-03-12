import { StyleSheet } from "react-native"
import { ApplicationStyles, Colors } from "../../Themes/"

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  body: {
    backgroundColor: "#eee",
    minHeight: 45,
    width: "98%",
    alignSelf: "center",
    borderBottomColor: Colors.rootsyPrimary,
    borderBottomWidth: 1,
    marginTop: 10,
    paddingHorizontal: "5%",
    flexDirection: "row",
  },
  text: {
    fontSize: 16,
  },
  C1: {
    flex: 3,
    justifyContent: "center",
  },
  C2: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  }
})
