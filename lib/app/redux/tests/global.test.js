"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

var _immutable = _interopRequireDefault(require("immutable"));

var globalActions = _interopRequireWildcard(require("../GlobalReducer"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/* global describe, it, before, beforeEach, after, afterEach */
describe('global reducer', function () {
  it('should return empty state', function () {
    var reduced = (0, globalActions["default"])(undefined, {});
    expect(reduced.toJS()).toEqual({
      status: {}
    });
  });
  it('should apply new global state', function () {
    var state = _immutable["default"].fromJS(require('./global.json'));

    var reduced = (0, globalActions["default"])(undefined, globalActions.receiveState(state)); // const action = {type: 'global/RECEIVE_STATE', payload: state};

    expect(reduced.toJS()).toEqual(state.toJS());
  });
});