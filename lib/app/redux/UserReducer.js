"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.closeLogin = exports.checkKeyType = exports.changeLanguage = exports.accountAuthLookup = exports.acceptTerms = exports.USERNAME_PASSWORD_LOGIN = exports.UPLOAD_IMAGE = exports.SET_USER = exports.SAVE_LOGIN_CONFIRM = exports.SAVE_LOGIN = exports.LOGOUT = exports.LOGIN_ERROR = exports.CHECK_KEY_TYPE = exports.ACCEPT_TERMS = void 0;
exports["default"] = reducer;
exports.usernamePasswordLogin = exports.uploadImage = exports.showTerms = exports.showSidePanel = exports.showPromotePost = exports.showPostAdvancedSettings = exports.showLoginWarning = exports.showLogin = exports.showAnnouncement = exports.setUser = exports.setLatestFeedPrice = exports.setAuthority = exports.set = exports.saveLoginConfirm = exports.saveLogin = exports.removeHighSecurityKeys = exports.logout = exports.loginError = exports.keysError = exports.hideSidePanel = exports.hidePromotePost = exports.hidePostAdvancedSettings = exports.hideLoginWarning = exports.hideLogin = exports.hideConnectionErrorModal = exports.hideAnnouncement = void 0;

var _immutable = require("immutable");

var _client_config = require("app/client_config");

// Action constants
var SHOW_LOGIN = 'user/SHOW_LOGIN';
var SHOW_LOGIN_WARNING = 'user/SHOW_LOGIN_WARNING';
var HIDE_LOGIN = 'user/HIDE_LOGIN';
var HIDE_LOGIN_WARNING = 'user/HIDE_LOGIN_WARNING';
var SHOW_TERMS = 'user/SHOW_TERMS';
var ACCEPT_TERMS = 'user/ACCEPT_TERMS';
exports.ACCEPT_TERMS = ACCEPT_TERMS;
var SAVE_LOGIN_CONFIRM = 'user/SAVE_LOGIN_CONFIRM';
exports.SAVE_LOGIN_CONFIRM = SAVE_LOGIN_CONFIRM;
var SAVE_LOGIN = 'user/SAVE_LOGIN';
exports.SAVE_LOGIN = SAVE_LOGIN;
var REMOVE_HIGH_SECURITY_KEYS = 'user/REMOVE_HIGH_SECURITY_KEYS';
var CHANGE_LANGUAGE = 'user/CHANGE_LANGUAGE';
var SHOW_PROMOTE_POST = 'user/SHOW_PROMOTE_POST';
var HIDE_PROMOTE_POST = 'user/HIDE_PROMOTE_POST';
var CHECK_KEY_TYPE = 'user/CHECK_KEY_TYPE';
exports.CHECK_KEY_TYPE = CHECK_KEY_TYPE;
var USERNAME_PASSWORD_LOGIN = 'user/USERNAME_PASSWORD_LOGIN';
exports.USERNAME_PASSWORD_LOGIN = USERNAME_PASSWORD_LOGIN;
var SET_USER = 'user/SET_USER';
exports.SET_USER = SET_USER;
var CLOSE_LOGIN = 'user/CLOSE_LOGIN';
var LOGIN_ERROR = 'user/LOGIN_ERROR';
exports.LOGIN_ERROR = LOGIN_ERROR;
var LOGOUT = 'user/LOGOUT';
exports.LOGOUT = LOGOUT;
var SET_LATEST_FEED_PRICE = 'user/SET_LATEST_FEED_PRICE';
var SHOW_SIGN_UP = 'user/SHOW_SIGN_UP';
var HIDE_SIGN_UP = 'user/HIDE_SIGN_UP';
var KEYS_ERROR = 'user/KEYS_ERROR';
var ACCOUNT_AUTH_LOOKUP = 'user/ACCOUNT_AUTH_LOOKUP';
var SET_AUTHORITY = 'user/SET_AUTHORITY';
var HIDE_CONNECTION_ERROR_MODAL = 'user/HIDE_CONNECTION_ERROR_MODAL';
var SET = 'user/SET';
var SHOW_SIDE_PANEL = 'user/SHOW_SIDE_PANEL';
var HIDE_SIDE_PANEL = 'user/HIDE_SIDE_PANEL';
var SHOW_POST_ADVANCED_SETTINGS = 'user/SHOW_POST_ADVANCED_SETTINGS';
var HIDE_POST_ADVANCED_SETTINGS = 'user/HIDE_POST_ADVANCED_SETTINGS';
var HIDE_ANNOUNCEMENT = 'user/HIDE_ANNOUNCEMENT';
var SHOW_ANNOUNCEMENT = 'user/SHOW_ANNOUNCEMENT'; // Saga-related

var UPLOAD_IMAGE = 'user/UPLOAD_IMAGE';
exports.UPLOAD_IMAGE = UPLOAD_IMAGE;
var defaultState = (0, _immutable.fromJS)({
  current: null,
  show_login_modal: false,
  show_promote_post_modal: false,
  show_post_advanced_settings_modal: '',
  // formId
  pub_keys_used: null,
  locale: _client_config.DEFAULT_LANGUAGE,
  show_side_panel: false,
  maybeLoggedIn: false,
  showAnnouncement: true
});

function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
  var action = arguments.length > 1 ? arguments[1] : undefined;
  var payload = action.payload;

  switch (action.type) {
    case SHOW_LOGIN:
      {
        var operation, loginDefault;

        if (payload) {
          operation = (0, _immutable.fromJS)(payload.operation);
          loginDefault = (0, _immutable.fromJS)(payload.loginDefault);
        }

        return state.merge({
          login_error: undefined,
          show_login_modal: true,
          login_type: payload.type,
          loginBroadcastOperation: operation,
          loginDefault: loginDefault
        });
      }

    case SHOW_LOGIN_WARNING:
      return state.set('show_login_warning', true);

    case SET_LATEST_FEED_PRICE:
      return state.set('latest_feed_price', payload);

    case HIDE_LOGIN:
      return state.merge({
        show_login_modal: false,
        loginBroadcastOperation: undefined,
        loginDefault: undefined
      });

    case HIDE_LOGIN_WARNING:
      return state.set('show_login_warning', false);

    case SHOW_TERMS:
      {
        var termsDefault;

        if (payload) {
          termsDefault = (0, _immutable.fromJS)(payload.termsDefault);
        }

        return state.merge({
          show_terms_modal: true,
          termsDefault: termsDefault
        });
      }

    case ACCEPT_TERMS:
      return state.merge({
        show_terms_modal: false,
        termsDefault: undefined
      });

    case SAVE_LOGIN_CONFIRM:
      return state.set('saveLoginConfirm', payload);

    case SAVE_LOGIN:
      // Use only for low security keys (like posting only keys)
      return state;

    case REMOVE_HIGH_SECURITY_KEYS:
      {
        if (!state.hasIn(['current', 'private_keys'])) return state;
        var empty = false;
        state = state.updateIn(['current', 'private_keys'], function (private_keys) {
          if (!private_keys) return null;

          if (private_keys.has('active_private')) {
            console.log('removeHighSecurityKeys');
          }

          private_keys = private_keys["delete"]('active_private');
          empty = private_keys.size === 0;
          return private_keys;
        });

        if (empty) {
          // LOGOUT
          return defaultState.merge({
            logged_out: true
          });
        }

        var username = state.getIn(['current', 'username']);
        state = state.setIn(['authority', username, 'active'], 'none');
        state = state.setIn(['authority', username, 'owner'], 'none');
        return state;
      }

    case CHANGE_LANGUAGE:
      return state.set('locale', payload);

    case SHOW_PROMOTE_POST:
      return state.set('show_promote_post_modal', true);

    case HIDE_PROMOTE_POST:
      return state.set('show_promote_post_modal', false);

    case CHECK_KEY_TYPE:
      return state;
    // saga

    case USERNAME_PASSWORD_LOGIN:
      return state;
    // saga

    case SET_USER:
      if (payload.vesting_shares) {
        payload.vesting_shares = parseFloat(payload.vesting_shares);
      }

      if (payload.delegated_vesting_shares) {
        payload.delegated_vesting_shares = parseFloat(payload.delegated_vesting_shares);
      }

      if (payload.received_vesting_shares) {
        payload.received_vesting_shares = parseFloat(payload.received_vesting_shares);
      }

      return state.mergeDeep({
        current: payload,
        show_login_modal: false,
        show_login_warning: false,
        loginBroadcastOperation: undefined,
        loginDefault: undefined,
        logged_out: undefined
      });

    case CLOSE_LOGIN:
      return state.merge({
        login_error: undefined,
        show_login_modal: false,
        loginBroadcastOperation: undefined,
        loginDefault: undefined
      });

    case LOGIN_ERROR:
      return state.merge({
        login_error: payload.error,
        logged_out: undefined
      });

    case LOGOUT:
      return defaultState.merge({
        logged_out: true
      });

    case KEYS_ERROR:
      return state.merge({
        keys_error: payload.error
      });

    case ACCOUNT_AUTH_LOOKUP:
      // AuthSaga
      return state;

    case SET_AUTHORITY:
      {
        // AuthSaga
        var accountName = payload.accountName,
            auth = payload.auth,
            pub_keys_used = payload.pub_keys_used;
        state = state.setIn(['authority', accountName], (0, _immutable.fromJS)(auth));

        if (pub_keys_used) {
          state = state.set('pub_keys_used', pub_keys_used);
        }

        return state;
      }

    case HIDE_CONNECTION_ERROR_MODAL:
      return state.set('hide_connection_error_modal', true);

    case SET:
      return state.setIn(Array.isArray(payload.key) ? payload.key : [payload.key], (0, _immutable.fromJS)(payload.value));

    case SHOW_SIDE_PANEL:
      return state.set('show_side_panel', true);

    case HIDE_SIDE_PANEL:
      return state.set('show_side_panel', false);

    case SHOW_POST_ADVANCED_SETTINGS:
      return state.set('show_post_advanced_settings_modal', payload.formId);

    case HIDE_POST_ADVANCED_SETTINGS:
      return state.set('show_post_advanced_settings_modal', '');

    case SHOW_ANNOUNCEMENT:
      typeof sessionStorage !== 'undefined' && sessionStorage.setItem('hideAnnouncement', 'false');
      return state.set('showAnnouncement', true);

    case HIDE_ANNOUNCEMENT:
      typeof sessionStorage !== 'undefined' && sessionStorage.setItem('hideAnnouncement', 'true');
      return state.set('showAnnouncement', false);

    default:
      return state;
  }
} // Action creators


var showLogin = function showLogin(payload) {
  return {
    type: SHOW_LOGIN,
    payload: payload
  };
};

exports.showLogin = showLogin;

var showLoginWarning = function showLoginWarning(payload) {
  return {
    type: SHOW_LOGIN_WARNING,
    payload: payload
  };
};

exports.showLoginWarning = showLoginWarning;

var hideLogin = function hideLogin(payload) {
  return {
    type: HIDE_LOGIN,
    payload: payload
  };
};

exports.hideLogin = hideLogin;

var hideLoginWarning = function hideLoginWarning(payload) {
  return {
    type: HIDE_LOGIN_WARNING,
    payload: payload
  };
};

exports.hideLoginWarning = hideLoginWarning;

var showTerms = function showTerms(payload) {
  return {
    type: SHOW_TERMS,
    payload: payload
  };
};

exports.showTerms = showTerms;

var acceptTerms = function acceptTerms() {
  return {
    type: ACCEPT_TERMS
  };
};

exports.acceptTerms = acceptTerms;

var saveLoginConfirm = function saveLoginConfirm(payload) {
  return {
    type: SAVE_LOGIN_CONFIRM,
    payload: payload
  };
};

exports.saveLoginConfirm = saveLoginConfirm;

var saveLogin = function saveLogin(payload) {
  return {
    type: SAVE_LOGIN,
    payload: payload
  };
};

exports.saveLogin = saveLogin;

var removeHighSecurityKeys = function removeHighSecurityKeys(payload) {
  return {
    type: REMOVE_HIGH_SECURITY_KEYS,
    payload: payload
  };
};

exports.removeHighSecurityKeys = removeHighSecurityKeys;

var changeLanguage = function changeLanguage(payload) {
  return {
    type: CHANGE_LANGUAGE,
    payload: payload
  };
};

exports.changeLanguage = changeLanguage;

var showPromotePost = function showPromotePost(payload) {
  return {
    type: SHOW_PROMOTE_POST,
    payload: payload
  };
};

exports.showPromotePost = showPromotePost;

var hidePromotePost = function hidePromotePost(payload) {
  return {
    type: HIDE_PROMOTE_POST,
    payload: payload
  };
};

exports.hidePromotePost = hidePromotePost;

var checkKeyType = function checkKeyType(payload) {
  return {
    type: CHECK_KEY_TYPE,
    payload: payload
  };
};

exports.checkKeyType = checkKeyType;

var usernamePasswordLogin = function usernamePasswordLogin(payload) {
  return {
    type: USERNAME_PASSWORD_LOGIN,
    payload: payload
  };
};

exports.usernamePasswordLogin = usernamePasswordLogin;

var setUser = function setUser(payload) {
  return {
    type: SET_USER,
    payload: payload
  };
};

exports.setUser = setUser;

var closeLogin = function closeLogin(payload) {
  return {
    type: CLOSE_LOGIN,
    payload: payload
  };
};

exports.closeLogin = closeLogin;

var loginError = function loginError(payload) {
  return {
    type: LOGIN_ERROR,
    payload: payload
  };
};

exports.loginError = loginError;

var logout = function logout(payload) {
  return {
    type: LOGOUT,
    payload: payload
  };
};

exports.logout = logout;

var keysError = function keysError(payload) {
  return {
    type: KEYS_ERROR,
    payload: payload
  };
};

exports.keysError = keysError;

var accountAuthLookup = function accountAuthLookup(payload) {
  return {
    type: ACCOUNT_AUTH_LOOKUP,
    payload: payload
  };
};

exports.accountAuthLookup = accountAuthLookup;

var setAuthority = function setAuthority(payload) {
  return {
    type: SET_AUTHORITY,
    payload: payload
  };
};

exports.setAuthority = setAuthority;

var setLatestFeedPrice = function setLatestFeedPrice(payload) {
  return {
    type: SET_LATEST_FEED_PRICE,
    payload: payload
  };
};

exports.setLatestFeedPrice = setLatestFeedPrice;

var hideConnectionErrorModal = function hideConnectionErrorModal(payload) {
  return {
    type: HIDE_CONNECTION_ERROR_MODAL,
    payload: payload
  };
};

exports.hideConnectionErrorModal = hideConnectionErrorModal;

var set = function set(payload) {
  return {
    type: SET,
    payload: payload
  };
};

exports.set = set;

var uploadImage = function uploadImage(payload) {
  return {
    type: UPLOAD_IMAGE,
    payload: payload
  };
};

exports.uploadImage = uploadImage;

var showSidePanel = function showSidePanel() {
  return {
    type: SHOW_SIDE_PANEL
  };
};

exports.showSidePanel = showSidePanel;

var hideSidePanel = function hideSidePanel() {
  return {
    type: HIDE_SIDE_PANEL
  };
};

exports.hideSidePanel = hideSidePanel;

var showPostAdvancedSettings = function showPostAdvancedSettings(payload) {
  return {
    type: SHOW_POST_ADVANCED_SETTINGS,
    payload: payload
  };
};

exports.showPostAdvancedSettings = showPostAdvancedSettings;

var hidePostAdvancedSettings = function hidePostAdvancedSettings() {
  return {
    type: HIDE_POST_ADVANCED_SETTINGS
  };
};

exports.hidePostAdvancedSettings = hidePostAdvancedSettings;

var hideAnnouncement = function hideAnnouncement() {
  return {
    type: HIDE_ANNOUNCEMENT
  };
};

exports.hideAnnouncement = hideAnnouncement;

var showAnnouncement = function showAnnouncement() {
  return {
    type: SHOW_ANNOUNCEMENT
  };
};

exports.showAnnouncement = showAnnouncement;