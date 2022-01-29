"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchFollowCount = fetchFollowCount;
exports.loadFollows = loadFollows;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _immutable = require("immutable");

var _effects = require("redux-saga/effects");

var _blurtjs = require("@blurtfoundation/blurtjs");

var globalActions = _interopRequireWildcard(require("app/redux/GlobalReducer"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var _marked = /*#__PURE__*/_regenerator["default"].mark(fetchFollowCount),
    _marked2 = /*#__PURE__*/_regenerator["default"].mark(loadFollows),
    _marked3 = /*#__PURE__*/_regenerator["default"].mark(loadFollowsLoop);

/**
    This loadFollows both 'blog' and 'ignore'
*/
// fetch for follow/following count
function fetchFollowCount(account) {
  var counts;
  return _regenerator["default"].wrap(function fetchFollowCount$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return (0, _effects.call)([_blurtjs.api, _blurtjs.api.getFollowCountAsync], account);

        case 2:
          counts = _context.sent;
          _context.next = 5;
          return (0, _effects.put)(globalActions.update({
            key: ['follow_count', account],
            updater: function updater(m) {
              return m.mergeDeep({
                follower_count: counts.follower_count,
                following_count: counts.following_count
              });
            }
          }));

        case 5:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
} // Test limit with 2 (not 1, infinate looping)


function loadFollows(method, account, type) {
  var force,
      hasResult,
      _args2 = arguments;
  return _regenerator["default"].wrap(function loadFollows$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          force = _args2.length > 3 && _args2[3] !== undefined ? _args2[3] : false;
          _context2.next = 3;
          return (0, _effects.select)(function (state) {
            return state.global.getIn(['follow', method, account, type + '_loading']);
          });

        case 3:
          if (!_context2.sent) {
            _context2.next = 5;
            break;
          }

          return _context2.abrupt("return");

        case 5:
          if (force) {
            _context2.next = 11;
            break;
          }

          _context2.next = 8;
          return (0, _effects.select)(function (state) {
            return state.global.hasIn(['follow', method, account, type + '_result']);
          });

        case 8:
          hasResult = _context2.sent;

          if (!hasResult) {
            _context2.next = 11;
            break;
          }

          return _context2.abrupt("return");

        case 11:
          _context2.next = 13;
          return (0, _effects.put)(globalActions.update({
            key: ['follow', method, account],
            notSet: (0, _immutable.Map)(),
            updater: function updater(m) {
              return m.set(type + '_loading', true);
            }
          }));

        case 13:
          _context2.next = 15;
          return loadFollowsLoop(method, account, type);

        case 15:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2);
}

function loadFollowsLoop(method, account, type) {
  var start,
      limit,
      res,
      cnt,
      lastAccountName,
      _args3 = arguments;
  return _regenerator["default"].wrap(function loadFollowsLoop$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          start = _args3.length > 3 && _args3[3] !== undefined ? _args3[3] : '';
          limit = _args3.length > 4 && _args3[4] !== undefined ? _args3[4] : 1000;
          _context3.t0 = _immutable.fromJS;
          _context3.next = 5;
          return _blurtjs.api[method](account, start, type, limit);

        case 5:
          _context3.t1 = _context3.sent;
          res = (0, _context3.t0)(_context3.t1);
          // console.log('res.toJS()', res.toJS())
          cnt = 0;
          lastAccountName = null;
          _context3.next = 11;
          return (0, _effects.put)(globalActions.update({
            key: ['follow_inprogress', method, account],
            notSet: (0, _immutable.Map)(),
            updater: function updater(m) {
              m = m.asMutable();
              res.forEach(function (value) {
                cnt += 1;
                var whatList = value.get('what');
                var accountNameKey = method === 'getFollowingAsync' ? 'following' : 'follower';
                var accountName = lastAccountName = value.get(accountNameKey);
                whatList.forEach(function (what) {
                  // currently this is always true: what === type
                  m.update(what, (0, _immutable.OrderedSet)(), function (s) {
                    return s.add(accountName);
                  });
                });
              });
              return m.asImmutable();
            }
          }));

        case 11:
          if (!(cnt === limit)) {
            _context3.next = 16;
            break;
          }

          _context3.next = 14;
          return (0, _effects.call)(loadFollowsLoop, method, account, type, lastAccountName);

        case 14:
          _context3.next = 18;
          break;

        case 16:
          _context3.next = 18;
          return (0, _effects.put)(globalActions.update({
            key: [],
            updater: function updater(m) {
              m = m.asMutable();
              var result = m.getIn(['follow_inprogress', method, account, type], (0, _immutable.OrderedSet)());
              m.deleteIn(['follow_inprogress', method, account, type]);
              m.updateIn(['follow', method, account], (0, _immutable.Map)(), function (mm) {
                var _mm$merge;

                return mm.merge((_mm$merge = {}, (0, _defineProperty2["default"])(_mm$merge, type + '_count', result.size), (0, _defineProperty2["default"])(_mm$merge, type + '_result', result.reverse()), (0, _defineProperty2["default"])(_mm$merge, type + '_loading', false), _mm$merge));
              });
              return m.asImmutable();
            }
          }));

        case 18:
        case "end":
          return _context3.stop();
      }
    }
  }, _marked3);
}