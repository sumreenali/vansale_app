import React, { Component } from "react"
import { ScrollView, Text, KeyboardAvoidingView } from "react-native"
import { connect } from "react-redux"

import styles from "./Styles/FreezerSerialsScreenStyle"

class FreezerSerialsScreen extends Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView behavior="position">
          <Text>FreezerSerialsScreen</Text>
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FreezerSerialsScreen)
