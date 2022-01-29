"use strict";

var _regeneratorRuntime2 = require("@babel/runtime/regenerator");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stopPolling = exports.startPolling = void 0;
exports.watchPollingTasks = watchPollingTasks;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _effects = require("redux-saga/effects");

var _reduxSaga = require("redux-saga");

var _marked = /*#__PURE__*/_regeneratorRuntime2.mark(poll),
    _marked2 = /*#__PURE__*/_regeneratorRuntime2.mark(watchPollingTasks);

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var START_POLLING = 'START_POLLING';
var STOP_POLLING = 'STOP_POLLING';

function poll(action) {
  var params;
  return _regenerator["default"].wrap(function poll$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          params = _objectSpread({}, action.payload);

        case 1:
          if (!true) {
            _context.next = 15;
            break;
          }

          _context.prev = 2;
          _context.next = 5;
          return (0, _effects.put)(params.pollAction(params.pollPayload));

        case 5:
          _context.next = 7;
          return (0, _effects.call)(_reduxSaga.delay, params.delay);

        case 7:
          _context.next = 13;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](2);
          _context.next = 13;
          return (0, _effects.put)(stopPolling());

        case 13:
          _context.next = 1;
          break;

        case 15:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, null, [[2, 9]]);
}

function watchPollingTasks() {
  var action;
  return _regenerator["default"].wrap(function watchPollingTasks$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          if (!true) {
            _context2.next = 8;
            break;
          }

          _context2.next = 3;
          return (0, _effects.take)(START_POLLING);

        case 3:
          action = _context2.sent;
          _context2.next = 6;
          return (0, _effects.race)([(0, _effects.call)(poll, action), (0, _effects.take)(STOP_POLLING)]);

        case 6:
          _context2.next = 0;
          break;

        case 8:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2);
}

var startPolling = function startPolling(payload) {
  return {
    type: START_POLLING,
    payload: payload
  };
};

exports.startPolling = startPolling;

var stopPolling = function stopPolling(payload) {
  return {
    type: STOP_POLLING,
    payload: payload
  };
};

exports.stopPolling = stopPolling;