// https://github.com/michael-ciniawsky/postcss-load-config
const saladConfig = require('./build/salad.config.json')

console.log(saladConfig);

module.exports = {
  "plugins": {
    "postcss-import": {},
    "postcss-salad": {
      'shortcuts': {'component': 'b', 'modifier': 'm', 'descendent': 'e'},
      'separators': {'descendent': '__', 'modifier': '--'}
    },
    "postcss-url": {},
    "precss": {},
    // to edit target browsers: use "browserslist" field in package.json
    "autoprefixer": {},
  }
}
