var peliasQuery = require('pelias-query');
var _ = require('lodash');

// Tisseo custom properties
module.exports = _.merge({}, peliasQuery.defaults, {
   "SIZE:MAX": "10000"
});
