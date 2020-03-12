import { StyleSheet, Dimensions } from "react-native";
import { ApplicationStyles, Colors } from "../../Themes/";
const screenHeight = Math.round(Dimensions.get("window").height);
const screenWidth = Math.round(Dimensions.get("window").width);

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  logoStyles: {
    width: "60%"
  },
  headerView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  loginViewContainer: {
    height: screenHeight * 0.9,
    justifyContent: "space-between",
    flexDirection: "column"
  },
  loginInputPane: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  loginWithSocial: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },
  loginInputCC: {
    width: "16.5%",
    left: "4%",
    marginRight: "1%"
  },
  loginInputPhone: {
    width: "100%",
    color: Colors.bgLogin,
    letterSpacing: 10,
    fontWeight: "500",
    justifyContent: "center",
    alignItems: "center",
  },
  loginButton: {
    width: "35%",
    backgroundColor: Colors.rootsyOffOrange,
    borderColor: Colors.bgLogin,
    borderWidth: 0.75,
    justifyContent: "center",
    alignItems: "center",
    left: "155%"
  },
  loginButtonTxt: {
    color: Colors.bgLogin,
    fontSize: 16,
    fontWeight: "600"
  },
  loginButtonView: {
    marginTop: "8%",
    justifyContent: "center",
    alignItems: "center"
  },
  loginInputItem: {
    width: "80%",
    height: 37.5,
    borderColor: Colors.bgLogin,
    borderWidth: 0.75,
    backgroundColor: Colors.rootsyOffOrange,
  },
  loginFbLogo: {
    width: 60,
    height: 60,
    margin: "5%",
    shadowColor: "#fff",
    shadowOpacity: 0.25,
    shadowOffset: {
      height: 1,
      width: 1
    }
  },
  bottomDivider: {
   
    height: 0.75,
    width: screenWidth*0.75,
    backgroundColor: "#ccc"
  },
  bottomDividerView: {
     position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    top: "10%"
  },
  loadingView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: screenHeight
  },
  loadingViewTxt: {
    marginTop: 7.5,
    color: Colors.snow,
    fontWeight: "500",
    fontStyle: "italic"
  },
  OTPLoader: {
    position: "absolute",
    width: screenWidth,
    height: screenHeight,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(250,105,47, 0.75)"
  }
});
