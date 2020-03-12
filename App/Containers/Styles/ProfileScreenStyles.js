import { StyleSheet } from "react-native"
import { ApplicationStyles, Colors } from "../../Themes/"

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  body: {
    flex: 1,
    backgroundColor: Colors.snow,
    padding: 8,
  },
  imageContainer: {
    width: "100%",
  },
  profileDetailContainer: {
    width: "100%",
    marginTop: 12.5,
    justifyContent: "center",
    alignItems: "center",
  },
  C1: {
    width: "100%",
    justifyContent: "flex-start",
    marginTop: 12.5,
    flexDirection: "row",
    backgroundColor: "#eee",
    minHeight: 45,
    alignItems: "center",
    paddingHorizontal: 25,
    borderWidth: 0.5,
    borderColor: Colors.rootsyPrimary,
  },
  C2: {
    width: "100%",
    justifyContent: "space-around",
    marginTop: 12.5,
    alignItems: "flex-start",
    backgroundColor: "#eee",
    minHeight: 100,
    paddingHorizontal: 25,
    borderWidth: 0.5,
    borderColor: Colors.rootsyPrimary,
  },
  image: {
    resizeMode: "contain",
    height: 175,
  },
  titleText: {
    flex: 3,
    fontSize: 16,
    fontWeight: "400",
    textAlign: "auto",
  },
  labelText: {
    flex: 4,
    fontSize: 16,
  },
  header: {
    width: "100%",
    height: 55,
    marginTop: 10,
  },
  headerText: {
    fontWeight: "bold",
    color: Colors.rootsyPrimary,
    fontSize: 25,
    textAlign: "center",
    letterSpacing: 3.5,
  },
  btnTx: { textAlign: "center", width: "96%", fontSize: 16, color: Colors.snow },
  btnCont: {
    backgroundColor: Colors.rootsyPrimary,
    minWidth: 100,
    minHeight: 37,
    borderRadius: 4,
    justifyContent: "space-around",
    alignItems: "center",
    justifyContent: 'center'
  },
  inputText: {
    width: "70%",
    minHeight: 45,
    //borderBottomColor: Colors.rootsyPrimary,
   // borderBottomWidth: 1.5,
   // backgroundColor: Colors.rootsyOffOrange4,
    paddingHorizontal: 10,
    borderWidth: 0.5,
    borderColor: Colors.rootsyPrimary,
  },
  shadowStyle: {
    elevation: 10,
    shadowOffset: { width: 0, height: 7 }, 
    shadowOpacity: 0.2,
    //shadowColor: Colors.rootsyOffOrange3,
    //backgroundColor: "#f1f8fd",
  }
})
