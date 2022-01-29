"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.actions = void 0;
exports.fetchData = fetchData;
exports.fetchDataWatches = void 0;
exports.fetchState = fetchState;
exports.getAccountNotifications = getAccountNotifications;
exports.getAccountUnreadNotifications = getAccountUnreadNotifications;
exports.getContentCaller = getContentCaller;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _effects = require("redux-saga/effects");

var _blurtjs = require("@blurtfoundation/blurtjs");

var _FollowSaga = require("app/redux/FollowSaga");

var _SagaShared = require("app/redux/SagaShared");

var globalActions = _interopRequireWildcard(require("./GlobalReducer"));

var appActions = _interopRequireWildcard(require("./AppReducer"));

var _constants = _interopRequireDefault(require("./constants"));

var _immutable = require("immutable");

var _steemApi = require("app/utils/steemApi");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var _marked = /*#__PURE__*/_regenerator["default"].mark(getContentCaller),
    _marked2 = /*#__PURE__*/_regenerator["default"].mark(fetchState),
    _marked3 = /*#__PURE__*/_regenerator["default"].mark(syncSpecialPosts),
    _marked4 = /*#__PURE__*/_regenerator["default"].mark(getAccounts),
    _marked5 = /*#__PURE__*/_regenerator["default"].mark(getAccountNotifications),
    _marked6 = /*#__PURE__*/_regenerator["default"].mark(getAccountUnreadNotifications),
    _marked7 = /*#__PURE__*/_regenerator["default"].mark(fetchData),
    _marked8 = /*#__PURE__*/_regenerator["default"].mark(fetchJson);

var REQUEST_DATA = 'fetchDataSaga/REQUEST_DATA';
var GET_CONTENT = 'fetchDataSaga/GET_CONTENT';
var FETCH_STATE = 'fetchDataSaga/FETCH_STATE';
var GET_ACCOUNT_NOTIFICATIONS = 'fetchDataSaga/GET_ACCOUNT_NOTIFICATIONS';
var GET_ACCOUNT_UNREAD_NOTIFICATIONS = 'fetchDataSaga/GET_ACCOUNT_UNREAD_NOTIFICATIONS';
var fetchDataWatches = [(0, _effects.takeLatest)(REQUEST_DATA, fetchData), (0, _effects.takeEvery)(GET_CONTENT, getContentCaller), (0, _effects.takeLatest)('@@router/LOCATION_CHANGE', fetchState), (0, _effects.takeLatest)(FETCH_STATE, fetchState), (0, _effects.takeEvery)('global/FETCH_JSON', fetchJson), (0, _effects.takeEvery)(GET_ACCOUNT_NOTIFICATIONS, getAccountNotifications), (0, _effects.takeEvery)(GET_ACCOUNT_UNREAD_NOTIFICATIONS, getAccountUnreadNotifications)];
exports.fetchDataWatches = fetchDataWatches;

function getContentCaller(action) {
  return _regenerator["default"].wrap(function getContentCaller$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return (0, _SagaShared.getContent)(action.payload);

        case 2:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}

var is_initial_state = true;

function fetchState(location_change_action) {
  var pathname, m, username, server_location, ignore_fetch, url, state;
  return _regenerator["default"].wrap(function fetchState$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          pathname = location_change_action.payload.pathname;
          m = pathname.match(/^\/@([a-z0-9\.-]+)/);

          if (!(m && m.length === 2)) {
            _context2.next = 10;
            break;
          }

          username = m[1];
          _context2.next = 6;
          return (0, _effects.fork)(_FollowSaga.fetchFollowCount, username);

        case 6:
          _context2.next = 8;
          return (0, _effects.fork)(_FollowSaga.loadFollows, 'getFollowersAsync', username, 'blog');

        case 8:
          _context2.next = 10;
          return (0, _effects.fork)(_FollowSaga.loadFollows, 'getFollowingAsync', username, 'blog');

        case 10:
          _context2.next = 12;
          return (0, _effects.select)(function (state) {
            return state.offchain.get('server_location');
          });

        case 12:
          server_location = _context2.sent;
          ignore_fetch = pathname === server_location && is_initial_state;

          if (!ignore_fetch) {
            _context2.next = 16;
            break;
          }

          return _context2.abrupt("return");

        case 16:
          is_initial_state = false;

          if (process.env.BROWSER && window && window.optimize) {
            console.log('REFRESH ADS');
            window.optimize.refreshAll({
              refresh: false
            });
          }

          url = pathname;
          _context2.next = 21;
          return (0, _effects.put)(appActions.fetchDataBegin());

        case 21:
          _context2.prev = 21;
          _context2.next = 24;
          return (0, _effects.call)(_steemApi.getStateAsync, url);

        case 24:
          state = _context2.sent;
          _context2.next = 27;
          return (0, _effects.put)(globalActions.receiveState(state));

        case 27:
          _context2.next = 29;
          return (0, _effects.call)(syncSpecialPosts);

        case 29:
          _context2.next = 36;
          break;

        case 31:
          _context2.prev = 31;
          _context2.t0 = _context2["catch"](21);
          console.error('~~ Saga fetchState error ~~>', url, _context2.t0);
          _context2.next = 36;
          return (0, _effects.put)(appActions.steemApiError(_context2.t0.message));

        case 36:
          _context2.next = 38;
          return (0, _effects.put)(appActions.fetchDataEnd());

        case 38:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2, null, [[21, 31]]);
}

function syncSpecialPosts() {
  var specialPosts, seenFeaturedPosts, seenPromotedPosts;
  return _regenerator["default"].wrap(function syncSpecialPosts$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          if (process.env.BROWSER) {
            _context3.next = 2;
            break;
          }

          return _context3.abrupt("return", null);

        case 2:
          _context3.next = 4;
          return (0, _effects.select)(function (state) {
            return state.offchain.get('special_posts');
          });

        case 4:
          specialPosts = _context3.sent;
          // Mark seen featured posts.
          seenFeaturedPosts = specialPosts.get('featured_posts').map(function (post) {
            var id = "".concat(post.get('author'), "/").concat(post.get('permlink'));
            return post.set('seen', localStorage.getItem("featured-post-seen:".concat(id)) === 'true');
          }); // Mark seen promoted posts.

          seenPromotedPosts = specialPosts.get('promoted_posts').map(function (post) {
            var id = "".concat(post.get('author'), "/").concat(post.get('permlink'));
            return post.set('seen', localStorage.getItem("promoted-post-seen:".concat(id)) === 'true');
          }); // Look up seen post URLs.

          _context3.next = 9;
          return (0, _effects.put)(globalActions.syncSpecialPosts({
            featuredPosts: seenFeaturedPosts,
            promotedPosts: seenPromotedPosts
          }));

        case 9:
          // Mark all featured posts as seen.
          specialPosts.get('featured_posts').forEach(function (post) {
            var id = "".concat(post.get('author'), "/").concat(post.get('permlink'));
            localStorage.setItem("featured-post-seen:".concat(id), 'true');
          }); // Mark all promoted posts as seen.

          specialPosts.get('promoted_posts').forEach(function (post) {
            var id = "".concat(post.get('author'), "/").concat(post.get('permlink'));
            localStorage.setItem("promoted-post-seen:".concat(id), 'true');
          });

        case 11:
        case "end":
          return _context3.stop();
      }
    }
  }, _marked3);
}
/**
 * Request account data for a set of usernames.
 *
 * @todo batch the put()s
 *
 * @param {Iterable} usernames
 */


function getAccounts(usernames) {
  var accounts;
  return _regenerator["default"].wrap(function getAccounts$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return (0, _effects.call)([_blurtjs.api, _blurtjs.api.getAccountsAsync], usernames);

        case 2:
          accounts = _context4.sent;
          _context4.next = 5;
          return (0, _effects.put)(globalActions.receiveAccounts({
            accounts: accounts
          }));

        case 5:
        case "end":
          return _context4.stop();
      }
    }
  }, _marked4);
}
/**
 * Request notifications for given account
 * @param {object} payload containing:
 *   - account (string)
 *   - last_id (string), optional, for pagination
 *   - limit (int), optional, defualt is 100
 */


function getAccountNotifications(action) {
  var notifications;
  return _regenerator["default"].wrap(function getAccountNotifications$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          if (action.payload) {
            _context5.next = 2;
            break;
          }

          throw 'no account specified';

        case 2:
          _context5.prev = 2;
          _context5.next = 5;
          return (0, _effects.call)(_steemApi.callNotificationsApi, action.payload.account);

        case 5:
          notifications = _context5.sent;

          if (!(notifications && notifications.error)) {
            _context5.next = 12;
            break;
          }

          console.error('~~ Saga getAccountNotifications error ~~>', notifications.error);
          _context5.next = 10;
          return (0, _effects.put)(appActions.steemApiError(notifications.error.message));

        case 10:
          _context5.next = 14;
          break;

        case 12:
          _context5.next = 14;
          return (0, _effects.put)(globalActions.receiveNotifications({
            name: action.payload.account,
            notifications: notifications
          }));

        case 14:
          _context5.next = 21;
          break;

        case 16:
          _context5.prev = 16;
          _context5.t0 = _context5["catch"](2);
          console.error('~~ Saga getAccountNotifications error ~~>', _context5.t0);
          _context5.next = 21;
          return (0, _effects.put)(appActions.steemApiError(_context5.t0.message));

        case 21:
        case "end":
          return _context5.stop();
      }
    }
  }, _marked5, null, [[2, 16]]);
}

function getAccountUnreadNotifications(action) {
  var notifications;
  return _regenerator["default"].wrap(function getAccountUnreadNotifications$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          if (action.payload) {
            _context6.next = 2;
            break;
          }

          throw 'no account specified';

        case 2:
          _context6.prev = 2;
          _context6.next = 5;
          return (0, _effects.call)(_steemApi.callNotificationsApi, action.payload.account);

        case 5:
          notifications = _context6.sent;

          if (!(notifications && notifications.error)) {
            _context6.next = 12;
            break;
          }

          console.error('~~ Saga getAccountUnreadNotifications error ~~>', notifications.error);
          _context6.next = 10;
          return (0, _effects.put)(appActions.steemApiError(notifications.error.message));

        case 10:
          _context6.next = 14;
          break;

        case 12:
          _context6.next = 14;
          return (0, _effects.put)(globalActions.receiveUnreadNotifications({
            name: action.payload.account,
            notifications: notifications
          }));

        case 14:
          _context6.next = 21;
          break;

        case 16:
          _context6.prev = 16;
          _context6.t0 = _context6["catch"](2);
          console.error('~~ Saga getAccountUnreadNotifications error ~~>', _context6.t0);
          _context6.next = 21;
          return (0, _effects.put)(appActions.steemApiError(_context6.t0.message));

        case 21:
        case "end":
          return _context6.stop();
      }
    }
  }, _marked6, null, [[2, 16]]);
}

function fetchData(action) {
  var _action$payload, order, author, permlink, accountname, postFilter, category, call_name, args, firstPermlink, fetched, endOfData, fetchLimitReached, fetchDone, batch, data, lastValue;

  return _regenerator["default"].wrap(function fetchData$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _action$payload = action.payload, order = _action$payload.order, author = _action$payload.author, permlink = _action$payload.permlink, accountname = _action$payload.accountname, postFilter = _action$payload.postFilter;
          category = action.payload.category;
          if (!category) category = '';
          category = category.toLowerCase();
          _context7.next = 6;
          return (0, _effects.put)(globalActions.fetchingData({
            order: order,
            category: category
          }));

        case 6:
          if (order === 'trending') {
            call_name = 'getDiscussionsByTrendingAsync';
            args = [{
              tag: category,
              limit: _constants["default"].FETCH_DATA_BATCH_SIZE,
              start_author: author,
              start_permlink: permlink
            }];
          } else if (order === 'hot') {
            call_name = 'getDiscussionsByHotAsync';
            args = [{
              tag: category,
              limit: _constants["default"].FETCH_DATA_BATCH_SIZE,
              start_author: author,
              start_permlink: permlink
            }];
          } else if (order === 'promoted') {
            call_name = 'getDiscussionsByPromotedAsync';
            args = [{
              tag: category,
              limit: _constants["default"].FETCH_DATA_BATCH_SIZE,
              start_author: author,
              start_permlink: permlink
            }];
          } else if (order === 'payout') {
            call_name = 'getPostDiscussionsByPayoutAsync';
            args = [{
              tag: category,
              limit: _constants["default"].FETCH_DATA_BATCH_SIZE,
              start_author: author,
              start_permlink: permlink
            }];
          } else if (order === 'payout_comments') {
            call_name = 'getCommentDiscussionsByPayoutAsync';
            args = [{
              tag: category,
              limit: _constants["default"].FETCH_DATA_BATCH_SIZE,
              start_author: author,
              start_permlink: permlink
            }];
          } else if (order === 'created') {
            call_name = 'getDiscussionsByCreatedAsync';
            args = [{
              tag: category,
              limit: _constants["default"].FETCH_DATA_BATCH_SIZE,
              start_author: author,
              start_permlink: permlink
            }];
          } else if (order === 'by_replies') {
            call_name = 'getRepliesByLastUpdateAsync';
            args = [author, permlink, _constants["default"].FETCH_DATA_BATCH_SIZE];
          } else if (order === 'by_feed') {
            // https://github.com/steemit/steem/issues/249
            call_name = 'getDiscussionsByFeedAsync';
            args = [{
              tag: accountname,
              limit: _constants["default"].FETCH_DATA_BATCH_SIZE,
              start_author: author,
              start_permlink: permlink
            }];
          } else if (order === 'by_author') {
            call_name = 'getDiscussionsByBlogAsync';
            args = [{
              tag: accountname,
              limit: _constants["default"].FETCH_DATA_BATCH_SIZE,
              start_author: author,
              start_permlink: permlink
            }];
          } else if (order === 'by_comments') {
            call_name = 'getDiscussionsByCommentsAsync';
            args = [{
              limit: _constants["default"].FETCH_DATA_BATCH_SIZE,
              start_author: author,
              start_permlink: permlink
            }];
          } else {
            // this should never happen. undefined behavior
            call_name = 'getDiscussionsByTrendingAsync';
            args = [{
              limit: _constants["default"].FETCH_DATA_BATCH_SIZE
            }];
          }

          _context7.next = 9;
          return (0, _effects.put)(appActions.fetchDataBegin());

        case 9:
          _context7.prev = 9;
          firstPermlink = permlink;
          fetched = 0;
          endOfData = false;
          fetchLimitReached = false;
          fetchDone = false;
          batch = 0;

        case 16:
          if (fetchDone) {
            _context7.next = 31;
            break;
          }

          _context7.next = 19;
          return _effects.call.apply(void 0, [[_blurtjs.api, _blurtjs.api[call_name]]].concat((0, _toConsumableArray2["default"])(args)));

        case 19:
          data = _context7.sent;
          endOfData = data.length < _constants["default"].FETCH_DATA_BATCH_SIZE;
          batch++;
          fetchLimitReached = batch >= _constants["default"].MAX_BATCHES; // next arg. Note 'by_replies' does not use same structure.

          lastValue = data.length > 0 ? data[data.length - 1] : null;

          if (lastValue && order !== 'by_replies') {
            args[0].start_author = lastValue.author;
            args[0].start_permlink = lastValue.permlink;
          } // Still return all data but only count ones matching the filter.
          // Rely on UI to actually hide the posts.


          fetched += postFilter ? data.filter(postFilter).length : data.length;
          fetchDone = endOfData || fetchLimitReached || fetched >= _constants["default"].FETCH_DATA_BATCH_SIZE;
          _context7.next = 29;
          return (0, _effects.put)(globalActions.receiveData({
            data: data,
            order: order,
            category: category,
            author: author,
            firstPermlink: firstPermlink,
            accountname: accountname,
            fetching: !fetchDone,
            endOfData: endOfData
          }));

        case 29:
          _context7.next = 16;
          break;

        case 31:
          _context7.next = 38;
          break;

        case 33:
          _context7.prev = 33;
          _context7.t0 = _context7["catch"](9);
          console.error('~~ Saga fetchData error ~~>', call_name, args, _context7.t0);
          _context7.next = 38;
          return (0, _effects.put)(appActions.steemApiError(_context7.t0.message));

        case 38:
          _context7.next = 40;
          return (0, _effects.put)(appActions.fetchDataEnd());

        case 40:
        case "end":
          return _context7.stop();
      }
    }
  }, _marked7, null, [[9, 33]]);
}
/**
    @arg {string} id unique key for result global['fetchJson_' + id]
    @arg {string} url
    @arg {object} body (for JSON.stringify)
*/


function fetchJson(_ref) {
  var _ref$payload, id, url, body, successCallback, _ref$payload$skipLoad, skipLoading, payload, result;

  return _regenerator["default"].wrap(function fetchJson$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _ref$payload = _ref.payload, id = _ref$payload.id, url = _ref$payload.url, body = _ref$payload.body, successCallback = _ref$payload.successCallback, _ref$payload$skipLoad = _ref$payload.skipLoading, skipLoading = _ref$payload$skipLoad === void 0 ? false : _ref$payload$skipLoad;
          _context8.prev = 1;
          payload = {
            method: body ? 'POST' : 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: body ? JSON.stringify(body) : undefined
          };
          _context8.next = 5;
          return skipLoading ? fetch(url, payload) : (0, _effects.call)(fetch, url, payload);

        case 5:
          result = _context8.sent;
          _context8.next = 8;
          return result.json();

        case 8:
          result = _context8.sent;
          if (successCallback) result = successCallback(result);
          _context8.next = 12;
          return (0, _effects.put)(globalActions.fetchJsonResult({
            id: id,
            result: result
          }));

        case 12:
          _context8.next = 19;
          break;

        case 14:
          _context8.prev = 14;
          _context8.t0 = _context8["catch"](1);
          console.error('fetchJson', _context8.t0);
          _context8.next = 19;
          return (0, _effects.put)(globalActions.fetchJsonResult({
            id: id,
            error: _context8.t0
          }));

        case 19:
        case "end":
          return _context8.stop();
      }
    }
  }, _marked8, null, [[1, 14]]);
} // Action creators


var actions = {
  requestData: function requestData(payload) {
    return {
      type: REQUEST_DATA,
      payload: payload
    };
  },
  getContent: function getContent(payload) {
    return {
      type: GET_CONTENT,
      payload: payload
    };
  },
  fetchState: function fetchState(payload) {
    return {
      type: FETCH_STATE,
      payload: payload
    };
  },
  getAccountNotifications: function getAccountNotifications(payload) {
    return {
      type: GET_ACCOUNT_NOTIFICATIONS,
      payload: payload
    };
  },
  getAccountUnreadNotifications: function getAccountUnreadNotifications(payload) {
    return {
      type: GET_ACCOUNT_UNREAD_NOTIFICATIONS,
      payload: payload
    };
  }
};
exports.actions = actions;