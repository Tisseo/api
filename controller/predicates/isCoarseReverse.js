const _ = require('lodash');
const Debug = require('../../helper/debug');
const debugLog = new Debug('controller:predicates:is_coarse_reverse');
const non_coarse_layers = ['address', 'street', 'venue'];
const stackTraceLine = require('../../helper/stackTraceLine');
const allLayers = require('../../helper/type_mapping').layers;
const coarseLayers = [
  'neighbourhood',
  'borough',
  'locality',
  'localadmin',
  'county',
  'macrocounty',
  'region',
  'macroregion',
  'dependency',
  'country',
  'empire',
  'continent',
  'ocean',
  'marinearea'
];

module.exports = (req, res) => {
  // returns true if layers is undefined, empty, or contains 'address', 'street', or 'venue'
  const allWitouhtCoarseLayers  = _.without(allLayers, ...coarseLayers);
  const is_coarse_reverse = !_.isEmpty(req.clean.layers) &&
          _.isEmpty(_.intersection(req.clean.layers, allWitouhtCoarseLayers));
  debugLog.push(req, () => ({
    reply: is_coarse_reverse,
    stack_trace: stackTraceLine()
  }));
  return is_coarse_reverse;
};
