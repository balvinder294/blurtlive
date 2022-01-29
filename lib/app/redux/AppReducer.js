"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addNotification = exports.TOGGLE_NIGHTMODE = exports.TOGGLE_BLOGMODE = exports.SET_USER_PREFERENCES = exports.RECEIVE_FEATURE_FLAGS = void 0;
exports["default"] = reducer;
exports.toggleNightmode = exports.toggleBlogmode = exports.steemApiError = exports.setUserPreferences = exports.selectors = exports.removeNotification = exports.receiveFeatureFlags = exports.fetchDataEnd = exports.fetchDataBegin = exports.defaultState = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _immutable = require("immutable");

var _counterpart = _interopRequireDefault(require("counterpart"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var BLURT_API_ERROR = 'app/BLURT_API_ERROR';
var FETCH_DATA_BEGIN = 'app/FETCH_DATA_BEGIN';
var FETCH_DATA_END = 'app/FETCH_DATA_END';
var ADD_NOTIFICATION = 'app/ADD_NOTIFICATION';
var REMOVE_NOTIFICATION = 'app/REMOVE_NOTIFICATION';
var SET_USER_PREFERENCES = 'app/SET_USER_PREFERENCES';
exports.SET_USER_PREFERENCES = SET_USER_PREFERENCES;
var TOGGLE_NIGHTMODE = 'app/TOGGLE_NIGHTMODE';
exports.TOGGLE_NIGHTMODE = TOGGLE_NIGHTMODE;
var TOGGLE_BLOGMODE = 'app/TOGGLE_BLOGMODE';
exports.TOGGLE_BLOGMODE = TOGGLE_BLOGMODE;
var RECEIVE_FEATURE_FLAGS = 'app/RECEIVE_FEATURE_FLAGS';
exports.RECEIVE_FEATURE_FLAGS = RECEIVE_FEATURE_FLAGS;
var defaultState = (0, _immutable.Map)({
  loading: false,
  error: '',
  location: {},
  notifications: null,
  user_preferences: (0, _immutable.Map)({
    locale: null,
    nsfwPref: 'warn',
    nightmode: false,
    blogmode: false,
    currency: 'USD',
    defaultBlogPayout: '50%',
    defaultCommentPayout: '50%'
  }),
  featureFlags: (0, _immutable.Map)({})
});
exports.defaultState = defaultState;

function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  switch (action.type) {
    case '@@router/LOCATION_CHANGE':
      return state.set('location', {
        pathname: action.payload.pathname
      });

    case BLURT_API_ERROR:
      // Until we figure out how to better handle these errors, let em slide.
      // This action is the only part of the app that marks an error in state.app.error,
      // and the only part of the app which pays attn to this part of the state is in App.jsx.
      // return  state.set('error', action.error).set('loading', false);
      // It is also worth noting that showTransactionErrorNotification in SagaShared
      // Will check state.transaction.errors and create a notification for whatever it finds there.
      // While TransactionReducer will add items to state.transaction.errors.
      return state;

    case FETCH_DATA_BEGIN:
      return state.set('loading', true);

    case FETCH_DATA_END:
      return state.set('loading', false);

    case ADD_NOTIFICATION:
      {
        var n = _objectSpread({
          action: (0, _counterpart["default"])('g.dismiss'),
          dismissAfter: 10000
        }, action.payload);

        return state.update('notifications', function (s) {
          return s ? s.set(n.key, n) : (0, _immutable.OrderedMap)((0, _defineProperty2["default"])({}, n.key, n));
        });
      }

    case REMOVE_NOTIFICATION:
      return state.update('notifications', function (s) {
        return s["delete"](action.payload.key);
      });

    case SET_USER_PREFERENCES:
      return state.set('user_preferences', (0, _immutable.Map)(action.payload));

    case TOGGLE_NIGHTMODE:
      return state.setIn(['user_preferences', 'nightmode'], !state.getIn(['user_preferences', 'nightmode']));

    case TOGGLE_BLOGMODE:
      return state.setIn(['user_preferences', 'blogmode'], !(state.getIn(['user_preferences', 'blogmode']) === undefined ? true : state.getIn(['user_preferences', 'blogmode'])));

    case RECEIVE_FEATURE_FLAGS:
      var newFlags = state.get('featureFlags') ? state.get('featureFlags').merge(action.flags) : (0, _immutable.Map)(action.flags);
      return state.set('featureFlags', newFlags);

    default:
      return state;
  }
}

var steemApiError = function steemApiError(error) {
  return {
    type: BLURT_API_ERROR,
    error: error
  };
};

exports.steemApiError = steemApiError;

var fetchDataBegin = function fetchDataBegin() {
  return {
    type: FETCH_DATA_BEGIN
  };
};

exports.fetchDataBegin = fetchDataBegin;

var fetchDataEnd = function fetchDataEnd() {
  return {
    type: FETCH_DATA_END
  };
};

exports.fetchDataEnd = fetchDataEnd;

var addNotification = function addNotification(payload) {
  return {
    type: ADD_NOTIFICATION,
    payload: payload
  };
};

exports.addNotification = addNotification;

var removeNotification = function removeNotification(payload) {
  return {
    type: REMOVE_NOTIFICATION,
    payload: payload
  };
};

exports.removeNotification = removeNotification;

var setUserPreferences = function setUserPreferences(payload) {
  return {
    type: SET_USER_PREFERENCES,
    payload: payload
  };
};

exports.setUserPreferences = setUserPreferences;

var toggleNightmode = function toggleNightmode() {
  return {
    type: TOGGLE_NIGHTMODE
  };
};

exports.toggleNightmode = toggleNightmode;

var toggleBlogmode = function toggleBlogmode() {
  return {
    type: TOGGLE_BLOGMODE
  };
};

exports.toggleBlogmode = toggleBlogmode;

var receiveFeatureFlags = function receiveFeatureFlags(flags) {
  return {
    type: RECEIVE_FEATURE_FLAGS,
    flags: flags
  };
};

exports.receiveFeatureFlags = receiveFeatureFlags;
var selectors = {
  getFeatureFlag: function getFeatureFlag(state, flagName) {
    return state.getIn(['featureFlags', flagName], false);
  }
};
exports.selectors = selectors;