import { StyleSheet } from "react-native"
import { ApplicationStyles, Colors } from "../../Themes/"

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  headerText: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 10,
  },
  inputContainer: {
    flex: 1,
    backgroundColor: "#fff",
    minHeight: 500,
    marginTop: 20,
  },
  R1: {
    width: "90%",
    alignSelf: "center",
    marginTop: 20,
  },
  inputText: {
    fontSize: 15,
    color: Colors.rootsyOffDark,
  },
  input: {
    width: "100%",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.rootsyOffOrange2,
  },
  btnText: {
    fontSize: 16,
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
  btnCont: {
    backgroundColor: Colors.rootsyPrimary,
    minWidth: 125,
    minHeight: 37,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
})
