"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.accountAuthLookup = accountAuthLookup;
exports.authWatches = void 0;
exports.findSigningKey = findSigningKey;
exports.postingOps = void 0;
exports.threshold = threshold;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _effects = require("redux-saga/effects");

var _immutable = require("immutable");

var _blurtjs = require("@blurtfoundation/blurtjs");

var _ecc = require("@blurtfoundation/blurtjs/lib/auth/ecc");

var _SagaShared = require("app/redux/SagaShared");

var userActions = _interopRequireWildcard(require("app/redux/UserReducer"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var _marked = /*#__PURE__*/_regenerator["default"].mark(accountAuthLookup),
    _marked2 = /*#__PURE__*/_regenerator["default"].mark(authorityLookup),
    _marked3 = /*#__PURE__*/_regenerator["default"].mark(authStr),
    _marked4 = /*#__PURE__*/_regenerator["default"].mark(threshold),
    _marked5 = /*#__PURE__*/_regenerator["default"].mark(findSigningKey);

// operations that require only posting authority
var postingOps = (0, _immutable.Set)('vote, comment, delete_comment, custom_json, claim_reward_balance'.trim().split(/,\s*/));
exports.postingOps = postingOps;
var authWatches = [(0, _effects.takeEvery)('user/ACCOUNT_AUTH_LOOKUP', accountAuthLookup)];
exports.authWatches = authWatches;

function accountAuthLookup(_ref) {
  var _ref$payload, account, private_keys, login_owner_pubkey, stateUser, keys, toPub, posting, active, owner, memo, auth, accountName, pub_keys_used;

  return _regenerator["default"].wrap(function accountAuthLookup$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _ref$payload = _ref.payload, account = _ref$payload.account, private_keys = _ref$payload.private_keys, login_owner_pubkey = _ref$payload.login_owner_pubkey;
          account = (0, _immutable.fromJS)(account);
          private_keys = (0, _immutable.fromJS)(private_keys); // console.log('accountAuthLookup', account.name)

          _context.next = 5;
          return (0, _effects.select)(function (state) {
            return state.user;
          });

        case 5:
          stateUser = _context.sent;
          if (private_keys) keys = private_keys;else keys = stateUser.getIn(['current', 'private_keys']);

          if (!(!keys || !keys.has('posting_private'))) {
            _context.next = 9;
            break;
          }

          return _context.abrupt("return");

        case 9:
          toPub = function toPub(k) {
            return k ? k.toPublicKey().toString() : '-';
          };

          posting = keys.get('posting_private');
          active = keys.get('active_private');
          owner = keys.get('active_private');
          memo = keys.get('memo_private');

          if (!posting) {
            _context.next = 20;
            break;
          }

          _context.next = 17;
          return authorityLookup({
            pubkeys: (0, _immutable.Set)([toPub(posting)]),
            authority: account.get('posting'),
            authType: 'posting'
          });

        case 17:
          _context.t0 = _context.sent;
          _context.next = 21;
          break;

        case 20:
          _context.t0 = 'none';

        case 21:
          _context.t1 = _context.t0;

          if (!active) {
            _context.next = 28;
            break;
          }

          _context.next = 25;
          return authorityLookup({
            pubkeys: (0, _immutable.Set)([toPub(active)]),
            authority: account.get('active'),
            authType: 'active'
          });

        case 25:
          _context.t2 = _context.sent;
          _context.next = 29;
          break;

        case 28:
          _context.t2 = 'none';

        case 29:
          _context.t3 = _context.t2;

          if (!owner) {
            _context.next = 36;
            break;
          }

          _context.next = 33;
          return authorityLookup({
            pubkeys: (0, _immutable.Set)([toPub(active)]),
            authority: account.get('owner'),
            authType: 'owner'
          });

        case 33:
          _context.t4 = _context.sent;
          _context.next = 37;
          break;

        case 36:
          _context.t4 = 'none';

        case 37:
          _context.t5 = _context.t4;
          _context.t6 = account.get('memo_key') === toPub(memo) ? 'full' : 'none';
          auth = {
            posting: _context.t1,
            active: _context.t3,
            owner: _context.t5,
            memo: _context.t6
          };
          accountName = account.get('name');
          pub_keys_used = {
            posting: toPub(posting),
            active: toPub(active),
            owner: login_owner_pubkey
          };
          _context.next = 44;
          return (0, _effects.put)(userActions.setAuthority({
            accountName: accountName,
            auth: auth,
            pub_keys_used: pub_keys_used
          }));

        case 44:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}
/**
    @arg {object} data
    @arg {object} data.authority Immutable Map blockchain authority
    @arg {object} data.pubkeys Immutable Set public key strings
    @return {string} full, partial, none
*/


function authorityLookup(_ref2) {
  var pubkeys, authority, authType;
  return _regenerator["default"].wrap(function authorityLookup$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          pubkeys = _ref2.pubkeys, authority = _ref2.authority, authType = _ref2.authType;
          _context2.next = 3;
          return (0, _effects.call)(authStr, {
            pubkeys: pubkeys,
            authority: authority,
            authType: authType
          });

        case 3:
          return _context2.abrupt("return", _context2.sent);

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2);
}

function authStr(_ref3) {
  var pubkeys, authority, authType, _ref3$recurse, recurse, t, r;

  return _regenerator["default"].wrap(function authStr$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          pubkeys = _ref3.pubkeys, authority = _ref3.authority, authType = _ref3.authType, _ref3$recurse = _ref3.recurse, recurse = _ref3$recurse === void 0 ? 1 : _ref3$recurse;
          _context3.next = 3;
          return (0, _effects.call)(threshold, {
            pubkeys: pubkeys,
            authority: authority,
            authType: authType,
            recurse: recurse
          });

        case 3:
          t = _context3.sent;
          r = authority.get('weight_threshold');
          return _context3.abrupt("return", t >= r ? 'full' : t > 0 ? 'partial' : 'none');

        case 6:
        case "end":
          return _context3.stop();
      }
    }
  }, _marked3);
}

function threshold(_ref4) {
  var pubkeys, authority, authType, _ref4$recurse, recurse, t, account_auths, aaNames, aaAccounts, aaThreshes, i, aaAccount, auth, aaThresh;

  return _regenerator["default"].wrap(function threshold$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          pubkeys = _ref4.pubkeys, authority = _ref4.authority, authType = _ref4.authType, _ref4$recurse = _ref4.recurse, recurse = _ref4$recurse === void 0 ? 1 : _ref4$recurse;

          if (pubkeys.size) {
            _context4.next = 3;
            break;
          }

          return _context4.abrupt("return", 0);

        case 3:
          t = pubkeyThreshold({
            pubkeys: pubkeys,
            authority: authority
          });
          account_auths = authority.get('account_auths');
          aaNames = account_auths.map(function (v) {
            return v.get(0);
          }, (0, _immutable.List)());

          if (!aaNames.size) {
            _context4.next = 23;
            break;
          }

          _context4.next = 9;
          return _blurtjs.api.getAccountsAsync(aaNames);

        case 9:
          aaAccounts = _context4.sent;
          aaThreshes = account_auths.map(function (v) {
            return v.get(1);
          }, (0, _immutable.List)());
          i = 0;

        case 12:
          if (!(i < aaAccounts.size)) {
            _context4.next = 23;
            break;
          }

          aaAccount = aaAccounts.get(i);
          t += pubkeyThreshold({
            authority: aaAccount.get(authType),
            pubkeys: pubkeys
          });

          if (!(recurse <= 2)) {
            _context4.next = 20;
            break;
          }

          _context4.next = 18;
          return (0, _effects.call)(authStr, {
            authority: aaAccount,
            pubkeys: pubkeys,
            recurse: ++recurse
          });

        case 18:
          auth = _context4.sent;

          if (auth === 'full') {
            aaThresh = aaThreshes.get(i);
            t += aaThresh;
          }

        case 20:
          i++;
          _context4.next = 12;
          break;

        case 23:
          return _context4.abrupt("return", t);

        case 24:
        case "end":
          return _context4.stop();
      }
    }
  }, _marked4);
}

function pubkeyThreshold(_ref5) {
  var pubkeys = _ref5.pubkeys,
      authority = _ref5.authority;
  var available = 0;
  var key_auths = authority.get('key_auths');
  key_auths.forEach(function (k) {
    if (pubkeys.has(k.get(0))) {
      available += k.get(1);
    }
  });
  return available;
}

function findSigningKey(_ref6) {
  var opType, username, password, authTypes, currentUser, currentUsername, private_keys, account, _iterator, _step, authType, private_key, pubkey, pubkeys, authority, auth;

  return _regenerator["default"].wrap(function findSigningKey$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          opType = _ref6.opType, username = _ref6.username, password = _ref6.password;
          if (postingOps.has(opType)) authTypes = 'posting, active';else authTypes = 'active, owner';
          authTypes = authTypes.split(', ');
          _context5.next = 5;
          return (0, _effects.select)(function (state) {
            return state.user.get('current');
          });

        case 5:
          currentUser = _context5.sent;
          currentUsername = currentUser && currentUser.get('username');
          username = username || currentUsername;

          if (username) {
            _context5.next = 10;
            break;
          }

          return _context5.abrupt("return", null);

        case 10:
          if (username.indexOf('/') > -1) {
            // "alice/active" will login only with Alices active key
            username = username.split('/')[0];
          }

          private_keys = currentUsername === username ? currentUser.get('private_keys') : (0, _immutable.Map)();
          _context5.next = 14;
          return (0, _effects.call)(_SagaShared.getAccount, username);

        case 14:
          account = _context5.sent;

          if (account) {
            _context5.next = 17;
            break;
          }

          throw new Error('Account not found');

        case 17:
          _iterator = _createForOfIteratorHelper(authTypes);
          _context5.prev = 18;

          _iterator.s();

        case 20:
          if ((_step = _iterator.n()).done) {
            _context5.next = 35;
            break;
          }

          authType = _step.value;
          private_key = void 0;

          if (password) {
            try {
              private_key = _ecc.PrivateKey.fromWif(password);
            } catch (e) {
              private_key = _ecc.PrivateKey.fromSeed(username + authType + password);
            }
          } else {
            if (private_keys) {
              private_key = private_keys.get(authType + '_private');
            }
          }

          if (!private_key) {
            _context5.next = 33;
            break;
          }

          pubkey = private_key.toPublicKey().toString();
          pubkeys = (0, _immutable.Set)([pubkey]);
          authority = account.get(authType);
          _context5.next = 30;
          return (0, _effects.call)(authorityLookup, {
            pubkeys: pubkeys,
            authority: authority,
            authType: authType
          });

        case 30:
          auth = _context5.sent;

          if (!(auth === 'full')) {
            _context5.next = 33;
            break;
          }

          return _context5.abrupt("return", private_key);

        case 33:
          _context5.next = 20;
          break;

        case 35:
          _context5.next = 40;
          break;

        case 37:
          _context5.prev = 37;
          _context5.t0 = _context5["catch"](18);

          _iterator.e(_context5.t0);

        case 40:
          _context5.prev = 40;

          _iterator.f();

          return _context5.finish(40);

        case 43:
          return _context5.abrupt("return", null);

        case 44:
        case "end":
          return _context5.stop();
      }
    }
  }, _marked5, null, [[18, 37, 40, 43]]);
} // function isPostingOnlyKey(pubkey, account) {
//     // TODO Support account auths
//     // yield put(g.actions.authLookup({account, pubkeys: pubkey})
//     // authorityLookup({pubkeys, authority: Map(account.posting), authType: 'posting'})
//     for (const p of account.posting.key_auths) {
//         if (pubkey === p[0]) {
//             if (account.active.account_auths.length || account.owner.account_auths.length) {
//                 console.log('UserSaga, skipping save password, account_auths are not yet supported.')
//                 return false
//             }
//             for (const a of account.active.key_auths)
//                 if (pubkey === a[0]) return false
//             for (const a of account.owner.key_auths)
//                 if (pubkey === a[0]) return false
//             return true
//         }
//     }
//     return false
// }