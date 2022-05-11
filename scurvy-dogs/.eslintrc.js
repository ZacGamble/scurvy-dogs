const NEVER = 'never'
const ERROR = 2
const WARN = 1
const PROD = process.env.NODE_ENV === 'production'

module.exports = {
  root: true,
  env: {
    node: true
  },
  parser: 'babel-eslint',
  extends: [
    'standard'
  ],
  parserOptions: {
    ecmaVersion: 2020,
    requireConfigFile: false
  },
  rules: {
    'no-unused-vars': PROD ? ERROR : WARN,
    'no-console': PROD ? ERROR : WARN,
    'no-debugger': PROD ? ERROR : WARN,
    'space-before-function-paren': [WARN, NEVER]
  }
}
