import { StyleSheet } from "react-native"

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
    alignItems: "center"
  },
  header: {
    width: "96%",
    backgroundColor: "#188bea",
    minHeight: 45,
    maxHeight: 55,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderWidth: 0.5,
    //borderRadius: 10
  },
  headerText: {
    flex: 0.5,
    fontSize: 20,
    textAlign: "center",
    fontWeight: "500",
    color:'#fff'
  },
  bottomView: {
    flex: 1,
    height: 50,
  },
  A1C1: {
    height: 40,
    borderRadius: 2,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15
  },
  shadowStyle: {
    elevation: 10,
    shadowOffset: { width: 0, height: 7 }, 
    shadowOpacity: 0.2,
    //shadowColor: Colors.rootsyOffOrange3,
    //backgroundColor: "#f1f8fd",
  }
})
