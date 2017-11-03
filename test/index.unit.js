'use strict';

var should = require('chai').should();

describe('Index Exports', function() {
  it('will export alohacore-lib', function() {
    var bitcore = require('../');
    should.exist(alohacore.lib);
    should.exist(alohacore.lib.Transaction);
    should.exist(alohacore.lib.Block);
  });
});
