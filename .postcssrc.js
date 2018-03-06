// https://github.com/michael-ciniawsky/postcss-load-config
const saladConfig = require('./salad.config.json')

// console.log(saladConfig);

module.exports = {
  "plugins": {
    "postcss-import": {},
    "postcss-salad": saladConfig,
    "postcss-url": {},
    "precss": {},
    // to edit target browsers: use "browserslist" field in package.json
    "autoprefixer": {},
  }
}
