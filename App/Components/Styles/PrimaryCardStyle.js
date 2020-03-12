import { StyleSheet } from "react-native";
import { Colors } from "../../Themes";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.snow,
    height: 180,
    width: 180,
    borderRadius: 10,
    shadowColor: Colors.rootsyOffDark,
    shadowOffset: {
      height: 2,
      width: 2
    },
    shadowOpacity: 0.25,
    margin: 6
  },
  imgContainer: {
    flex: 2,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10
  },
  textContaier: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: Colors.snow,
   borderRadius:10
  },
  img: {
    height: "100%",
    width: "100%",
    borderRadius: 10
  },
  textContaierLeft: {
    flex: 4,
    justifyContent: "center",
    alignItems: "center",
    borderBottomStartRadius: 10,
    padding:5,
    borderRightWidth: 0.2,
    borderColor: Colors.rootsyPrimary
  },

  bandName: {

  },
  eventDate: {

  },
  eventDateTxt: {
    fontSize: 12,
    color: Colors.rootsyOffDark,
    fontWeight: "600"
  },
  bandNameTxt: {
    fontSize: 12,
    color: Colors.rootsyOffDark,
    fontWeight: "600"
  },

  textContaierRight: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
    borderBottomEndRadius: 10,
    padding: 5,
    backgroundColor: Colors.rootsyOffOrange2
  },
  ticketIcon: {

  },
  buyTxt: {
    fontSize: 10,
    color: Colors.rootsyPrimary,
    fontWeight: "600"
  }
});
