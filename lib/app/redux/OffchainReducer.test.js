"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _immutable = require("immutable");

var _OffchainReducer = _interopRequireDefault(require("./OffchainReducer"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var mockAction = {
  type: 'user/SAVE_LOGIN_CONFIRM'
};

var mockActionWithPayload = _objectSpread(_objectSpread({}, mockAction), {}, {
  payload: 'Foo Barman'
});

describe('offchain reducer', function () {
  it('should provide a nice initial state, with any payload', function () {
    var initial = (0, _OffchainReducer["default"])();
    var expected = (0, _immutable.Map)({
      user: (0, _immutable.Map)({})
    });
    expect(initial).toEqual(expected);
    var withPayload = (0, _OffchainReducer["default"])(initial, mockActionWithPayload);
    expect(withPayload).toEqual(expected);
  });
  it('should return an account of null when action has no payload', function () {
    var initial = (0, _OffchainReducer["default"])();
    var account = (0, _OffchainReducer["default"])(initial, mockAction);
    expect(account).toEqual((0, _immutable.Map)({
      user: (0, _immutable.Map)({}),
      account: null
    }));
  });
});