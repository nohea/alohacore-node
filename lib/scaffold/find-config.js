'use strict';

var bitcore = require('alohacore-lib');
var $ = bitcore.util.preconditions;
var _ = bitcore.deps._;
var path = require('path');
var fs = require('fs');
var utils = require('../utils');
require('json5/lib/register');

/**
 * Will return the path and bitcore-node configuration
 * @param {String} cwd - The absolute path to the current working directory
 */
function findConfig(cwd) {
  $.checkArgument(_.isString(cwd), 'Argument should be a string');
  $.checkArgument(utils.isAbsolutePath(cwd), 'Argument should be an absolute path');
  var directory = String(cwd);
  while (!fs.existsSync(path.resolve(directory, 'bitcore-node.json'))
	 && !fs.existsSync(path.resolve(directory, 'bitcore-node.json5'))
	) {
    directory = path.resolve(directory, '../');
    if (directory === '/') {
      return false;
    }
  }
  // try loading json5 first, then json file
  var config;
  if( fs.existsSync(path.resolve(directory, 'bitcore-node.json5') ) ) {
    config = require(path.resolve(directory, 'bitcore-node.json5'));
  }
  else {
    config = require(path.resolve(directory, 'bitcore-node.json'));
  }
  return {
    path: directory,
    config: config
  };
}

module.exports = findConfig;
