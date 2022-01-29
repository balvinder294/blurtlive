"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.packLoginData = exports.isLoggedIn = exports.extractLoginData = exports["default"] = void 0;

/**
 *
 * @returns {boolean}
 */
var isLoggedIn = function isLoggedIn() {
  return typeof localStorage !== 'undefined' && !!localStorage.getItem('autopost2');
};
/**
 *
 * @returns {string}
 */


exports.isLoggedIn = isLoggedIn;

var packLoginData = function packLoginData(username, password, memoWif, login_owner_pubkey, login_with_keychain) {
  return new Buffer("".concat(username, "\t").concat(password, "\t").concat(memoWif || '', "\t").concat(login_owner_pubkey || '', "\t").concat(login_with_keychain || '')).toString('hex');
};
/**
 *
 * @returns {array} [username, password, memoWif, login_owner_pubkey, login_with_keychain]
 */


exports.packLoginData = packLoginData;

var extractLoginData = function extractLoginData(data) {
  return new Buffer(data, 'hex').toString().split('\t');
};

exports.extractLoginData = extractLoginData;
var _default = {
  isLoggedIn: isLoggedIn,
  extractLoginData: extractLoginData
};
exports["default"] = _default;