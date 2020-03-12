import { StyleSheet } from "react-native";
import { Colors } from "../../Themes";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.rootsyOffOrange,
    height: 135,
    width: 150,
    borderRadius: 10,
    margin: 5,
    shadowColor: Colors.rootsyOffDark,
    shadowOpacity: 0.35,
    shadowOffset: {
      height: 1, width: 1
    }
  },
  imgView: {
    flex: 2
  },
  bottomTxt: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center"
  },
  img: {
    height: 90,
    width: 150,
    borderRadius: 10
  },
  nameTxt: {
    color: Colors.rootsyOffDark,
    fontSize: 14,
    width: "100%",
    height: 20,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    letterSpacing: 1.2
  },
  linkTxt: {
    color: Colors.rootsyPrimary,
    fontWeight: "700"
  }
});
