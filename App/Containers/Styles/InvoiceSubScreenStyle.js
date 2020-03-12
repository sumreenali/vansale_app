import { StyleSheet } from "react-native"
import { ApplicationStyles } from "../../Themes/"

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  body: {
    flex: 1,
    alignItems: "center",
    paddingTop: 10
  },
  header: {
    width: "96%",
    backgroundColor: "#FFD25B",
    minHeight: 45,
    maxHeight: 75,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderWidth: 0.5,
  },
  backButton:{
    width: 60,
    backgroundColor: "#188bea",
    minHeight: 40,
    maxHeight: 40,
    marginBottom: 10,
    //flexDirection: "row",
     alignSelf: 'flex-start',
    //alignItems: "center",
    borderWidth: 0.5,
    marginLeft: 10
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
    width:'96%',
    height: 80,
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
