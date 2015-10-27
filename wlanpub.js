/* *
 * Created by Juneja on 2015/9/9.
 *
 * Collect attributes and methods for public
 */
"use strict";

var basic  = require('./lib/basic'),
    mqoper = require('./lib/mqoper'),
    dboper = require('./lib/dboper'),
    casauth = require('./lib/cas-authentication');

module.exports = {
    "basic"   : basic,
    "mqhd"    : mqoper,
    "dbhd"    : dboper,
    "casauth" : casauth
}
