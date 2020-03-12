import React, { Component } from "react"
import { ScrollView, Dimensions } from "react-native"
import { connect } from "react-redux"
import { TabView, SceneMap, TabBar } from "react-native-tab-view"
import FreezerCustomer from "../Components/Freezercustomer"
import FreezerSerial from "../Components/Freezerserial"
import styles from "./Styles/FreezerScreenStyle"
import { translate } from "../i18n"
import FreezerClaimGroupComponent from "../Components/FreezerClaimGroupComponent"

class FreezerScreen extends Component {
  state = {
    index: 0,
    routes: [
      { key: "customer", title: translate("freezerScreen.customerTitle") },
      { key: "claim", title: translate("freezerScreen.claimTitle") },
    ],
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <TabView
          navigationState={this.state}
          activeColor="#777"
          inactiveColor="#000"
          renderTabBar={props => (
            <TabBar
              {...props}
              indicatorStyle={styles.indicator}
              style={styles.tabBar}
              labelStyle={styles.labelStyle}
            />
          )}
          renderScene={SceneMap({
            customer: FreezerClaimGroupComponent,
            claim: FreezerSerial,
          })}
          onIndexChange={index => this.setState({ index })}
          initialLayout={{ width: Dimensions.get("window").width }}
        />
      </ScrollView>
    )
  }
}

const mapStateToProps = state => {
  return { state }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FreezerScreen)
