module.exports = {
  extends: 'algolia/react',
  rules: {
    "linebreak-style": ["error", "windows"],
    "react/prop-types": [
      "enabled",
      {"ignore": "ignore", "customValidators": "customValidator"}
    ]
  }
}
