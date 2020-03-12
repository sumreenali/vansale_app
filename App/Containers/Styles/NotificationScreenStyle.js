import { StyleSheet } from "react-native"
import { ApplicationStyles, Colors } from "../../Themes/"

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  body: {
    width: "96%",
    minHeight: 70,
    backgroundColor: "#eee",
    alignSelf: "center",
    marginTop: 7.5,
    padding: 8,
    flexDirection: "row",
    borderBottomColor: Colors.rootsyPrimary,
    //borderBottomWidth: 1
    marginBottom:-4,
    borderWidth: 0.5,
    borderColor: Colors.rootsyPrimary,
  },
  C1: {
    flex: 5,
    justifyContent: "center",
  },
  C2: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    width: "96%",
    maxHeight: "70%",
  },
  titleText: {
    width: "96%",
    textAlign: "auto",
    fontSize: 16,
  },
  bottomView: {
    height: 70,
  },
})
