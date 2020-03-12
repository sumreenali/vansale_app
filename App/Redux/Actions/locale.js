export function toggleLocale(val) {
  const requestParam = {
    locale: val ? val : "en",
  }
  return {
    type: "LOCALE_TOGGLE",
    payload: requestParam,
  }
}
