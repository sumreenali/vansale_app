import { AsyncStorage } from "react-native"
import * as RNLocalize from "react-native-localize"
import i18n from "i18n-js"
import { connect } from "react-redux"
import { Cache } from "react-native-cache"

const en = require("./en")
const ar = require("./ar")

i18n.fallbacks = true
i18n.translations = { en, ar }

const fallback = { languageTag: "en", isRTL: false }

const { languageTag } =
  RNLocalize.findBestAvailableLanguage(Object.keys(i18n.translations)) || fallback

// i18n.locale = "en"

export function translate(key, options) {
  return key ? i18n.t(key, options) : null
}

function mapStateToProps(state) {
  return {
    state,
  }
}

connect(mapStateToProps)(translate)
