"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = stateCleaner;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _GDPRUserList = _interopRequireDefault(require("../utils/GDPRUserList"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var accountsToRemove = _GDPRUserList["default"];

var gdprFilterAccounts = function gdprFilterAccounts(stateAccounts) {
  return Object.keys(stateAccounts).filter(function (name) {
    return !accountsToRemove.includes(name);
  }).reduce(function (acc, cur) {
    return _objectSpread(_objectSpread({}, acc), {}, (0, _defineProperty2["default"])({}, cur, stateAccounts[cur]));
  }, {});
};

var gdprFilterContent = function gdprFilterContent(stateContent) {
  var contentToRemove = Object.keys(stateContent).filter(function (key) {
    return accountsToRemove.includes(stateContent[key].author);
  });
  var contentToKeep = Object.keys(stateContent).filter(function (key) {
    return !accountsToRemove.includes(stateContent[key].author);
  }); // First, remove content authored by GDPR users.

  var removedByAuthor = contentToKeep.reduce(function (acc, cur) {
    return _objectSpread(_objectSpread({}, acc), {}, (0, _defineProperty2["default"])({}, cur, stateContent[cur]));
  }, {}); // Finally, remove GDPR-authored replies referenced in other content.

  return Object.keys(removedByAuthor).reduce(function (acc, cur) {
    return _objectSpread(_objectSpread({}, acc), {}, (0, _defineProperty2["default"])({}, cur, _objectSpread(_objectSpread({}, removedByAuthor[cur]), {}, {
      replies: removedByAuthor[cur].replies.filter(function (url) {
        return !contentToRemove.includes(url);
      })
    })));
  }, {});
};

function stateCleaner(state) {
  return _objectSpread(_objectSpread({}, state), {}, {
    accounts: gdprFilterAccounts(state.accounts),
    content: gdprFilterContent(state.content)
  });
}