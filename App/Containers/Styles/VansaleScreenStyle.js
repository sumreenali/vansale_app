import { StyleSheet } from "react-native"
import { ApplicationStyles } from "../../Themes/"

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
})
