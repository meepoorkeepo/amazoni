const { ESLint } = require("eslint");

Module.exports = {
    env:{
        es2016:true,
        node:true
    },
    extends:['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
    parser:'@typescript-eslint/parser',
    parserOptions:{
        ecmaVersion:'es2016',
        sourceType:'module',
    },
    Plugins:['@typescript-eslint'],
}