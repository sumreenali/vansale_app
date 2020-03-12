import { StyleSheet } from "react-native"

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
    alignItems: "center",
  },
  header: {
    width: "96%",
    backgroundColor: "#FFD25B",
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
    fontSize: 15,
    textAlign: "center",
    fontWeight: "500",
    color:'#fff'
  },
  bottomView: {
    flex: 1,
    height: 50,
  },
  dropdownContainer:
  {
    flexDirection: 'row',
    width: '100%',
    height: 35,
    justifyContent: 'space-around',
    alignSelf: 'center'
  },
  dropdownTextContainer: {
    flex:1,
    alignItems: 'flex-start',
    marginLeft: 4,
    justifyContent:'center'
  },
  dropdownText: {
    fontSize: 15,
    color: 'black',
  },
  dropdownIcon: {
    fontSize: 20,
    justifyContent: 'center',
    alignSelf: 'center'
  },
  shadowStyle: {
    elevation: 10,
    shadowOffset: { width: 0, height: 7 }, 
    shadowOpacity: 0.2,
    //shadowColor: Colors.rootsyOffOrange3,
    //backgroundColor: "#f1f8fd",
  }
})
