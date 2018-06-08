'use strict';

var bitcore = require('alohacore-lib');
var $ = bitcore.util.preconditions;
var _ = bitcore.deps._;
var path = require('path');
var fs = require('fs');
var utils = require('../utils');
var json5 = require('json5');

/**
 * Will return the path and bitcore-node configuration
 * @param {String} cwd - The absolute path to the current working directory
 */
function findConfig(cwd) {
  $.checkArgument(_.isString(cwd), 'Argument should be a string');
  $.checkArgument(utils.isAbsolutePath(cwd), 'Argument should be an absolute path');
  var directory = String(cwd);
  while (!fs.existsSync(path.resolve(directory, 'bitcore-node.json'))) {
    directory = path.resolve(directory, '../');
    if (directory === '/') {
      return false;
    }
  }
  // try loading json5 first, then json file
  var config;
  var fileContent;
  if( fs.existsSync(path.resolve(directory, 'bitcore-node.json') ) ) {
    fileContent = fs.readFileSync(path.resolve(directory, 'bitcore-node.json'), 'utf8');
    config = json5.parse(fileContent);
  }
  return {
    path: directory,
    config: config
  };
}

module.exports = findConfig;
