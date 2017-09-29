// for .env vars
try {
    require('dotenv').config()
} catch (err) {
    console.log(err)
}
// enable @std/esm loader
require = require('@std/esm')(module, { cjs: true, esm: "js" })
module.exports = require('./main.js').default
