import React from "react"
import { Text } from "react-native"
import { translate } from "../i18n"

export default RNText = props => {
  const { tx, txOptions, text, children, style } = props
  const i18nText = tx && translate(tx, txOptions)
  const content = i18nText

  return (
    <Text {...props} style={style}>
      {content || ""}{text || ""}
    </Text>
  )
}
