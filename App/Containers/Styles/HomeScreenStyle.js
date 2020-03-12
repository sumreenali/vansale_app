import { StyleSheet } from "react-native"
import { ApplicationStyles, Colors } from "../../Themes/"

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  SafeAreaView: {
    flex: 1,
  },
  homeSliderContainer: {
    flex: 1,
  },

  upcomingMainViewContainer: {
    flex: 1,
    width: "100%",
    marginTop: 10,
    backgroundColor: Colors.snow,
    justifyContent: "center",
  },
  upcomingViewHeaderContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  upcomingMainViewRight: {
    paddingRight: "3%",
    paddingTop: "2%",
    paddingBottom: "2%",
  },
  upcomingMainViewLeft: {
    paddingLeft: "3%",
    paddingTop: "2%",
    paddingBottom: "2%",
  },
  todayEventContainer: {
    flex: 1,
    marginTop: 10,
  },
  SecondaryCardView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  bottomSocialLinkView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
    marginBottom: 20,
  },
  shadowStyle: {
    elevation: 10,
    shadowOffset: {width: 0, height: 7}, 
    shadowOpacity: 0.2,
    //shadowColor: Colors.rootsyOffOrange3,
    backgroundColor: Colors.rootsyOffOrange3,
  }
})
