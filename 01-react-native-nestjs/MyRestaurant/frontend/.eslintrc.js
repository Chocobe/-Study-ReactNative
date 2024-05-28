module.exports = {
  "root": true,
  "env": {
    "react-native/react-native": true
  },
  "extends": [
    "plugin:@typescript-eslint/recommended",
    "plugin:react-native/all",
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "plugins": [
    "@typescript-eslint",
    "react",
    "react-native",
  ],
  "rules": {
    "@typescript-eslint/no-unused-vars": ["warn", {
      "ignoreRestSiblings": true,
      "argsIgnorePattern": "^_"
    }],
    "@typescript-eslint/semi": "error",
    "@typescript-eslint/quotes": ["warn", "single"],
    "@typescript-eslint/indent": ["error", 4, {
      "SwitchCase": 1,
      "ignoredNodes": ["TSTypeParameterInstantiation"],
    }],
    "@typescript-eslint/no-explicit-any": "off",

    "react-native/no-unused-styles": "off",
    "react-native/no-inline-styles": "off",
    "react-native/sort-styles": "off",
    "react-native/no-color-literals": "off",
  },
  "ignorePatterns": [
    "*.js",
    "*.json",
    "*.config.js",
    ".eslintrc.js"
  ]
}
