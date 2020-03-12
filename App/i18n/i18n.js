import * as RNLocalize from "react-native-localize"
import i18n from "i18n-js"
import {AsyncStorage} from "react-native"

import { Cache } from "react-native-cache";

const en = require("./en")
const ar = require("./ar")

i18n.fallbacks = true
i18n.translations = { en, ar }

const fallback = { languageTag: "en", isRTL: false }
const { languageTag } =
  RNLocalize.findBestAvailableLanguage(Object.keys(i18n.translations)) || fallback
i18n.locale = languageTag

var cache = new Cache({
  namespace: "FGMM",
  policy: {
      maxEntries: 50000
  },
  backend: AsyncStorage
});

cache.getItem("languageTag", function(err, value) {
    console.log("I19 ",value);
});