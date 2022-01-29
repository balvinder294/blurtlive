"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.callNotificationsApi = callNotificationsApi;
exports.getStateAsync = getStateAsync;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _blurtjs = require("@blurtfoundation/blurtjs");

var _axios = _interopRequireDefault(require("axios"));

var _busyjs = require("@busyorg/busyjs");

var _stateCleaner = _interopRequireDefault(require("app/redux/stateCleaner"));

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function getStateAsync(_x) {
  return _getStateAsync.apply(this, arguments);
}

function _getStateAsync() {
  _getStateAsync = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(url) {
    var raw, chainProperties, rewardFund, blurtConfig, cleansed;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // strip off query string
            url = url.split('?')[0]; // strip off leading and trailing slashes

            if (url.length > 0 && url[0] == '/') url = url.substring(1, url.length);

            if (url.length > 0 && url[url.length - 1] == '/') {
              url = url.substring(0, url.length - 1);
            } // blank URL defaults to `trending`


            if (url === '') url = 'hot'; // curation and author rewards pages are alias of `transfers`

            if (url.indexOf('/curation-rewards') !== -1) {
              url = url.replace('/curation-rewards', '/transfers');
            }

            if (url.indexOf('/author-rewards') !== -1) {
              url = url.replace('/author-rewards', '/transfers');
            }

            _context.next = 8;
            return _blurtjs.api.getStateAsync(url);

          case 8:
            raw = _context.sent;
            _context.next = 11;
            return getChainProperties();

          case 11:
            chainProperties = _context.sent;

            if (chainProperties) {
              raw.props.operation_flat_fee = parseFloat(chainProperties.operation_flat_fee);
              raw.props.bandwidth_kbytes_fee = parseFloat(chainProperties.bandwidth_kbytes_fee);
            }

            _context.next = 15;
            return _axios["default"].get($STM_Config.price_info_url, {
              timeout: 3000
            }).then(function (response) {
              if (response.status === 200) {
                raw.props.price_per_blurt = Number(response.data.price_usd).toFixed(8);
              }
            })["catch"](function (error) {
              console.error(error);
            });

          case 15:
            _context.next = 17;
            return _axios["default"].get('https://blurt-coal.tekraze.com', {
              timeout: 3000
            }).then(function (response) {
              var map = new Map();

              if (response.status === 200) {
                // eslint-disable-next-line no-restricted-syntax
                var _iterator = _createForOfIteratorHelper(response.data),
                    _step;

                try {
                  // eslint-disable-next-line no-restricted-syntax
                  for (_iterator.s(); !(_step = _iterator.n()).done;) {
                    var data = _step.value;
                    map.set(data.name, data);
                  }
                } catch (err) {
                  _iterator.e(err);
                } finally {
                  _iterator.f();
                }

                raw.blacklist = map;
              }
            })["catch"](function (error) {
              console.error(error);
            });

          case 17:
            _context.next = 19;
            return _axios["default"].get("https://gitlab.com/blurt/openblurt/condenser-pinned/-/raw/master/dapps.json", {
              timeout: 2000
            }).then(function (response) {
              if (response.status === 200) {
                raw.dapps = response.data;
              }
            })["catch"](function (error) {
              console.error(error);
            });

          case 19:
            _context.next = 21;
            return getRewardFund();

          case 21:
            rewardFund = _context.sent;

            if (rewardFund) {
              raw.reward_fund = rewardFund;
            }

            _context.next = 25;
            return getConfig();

          case 25:
            blurtConfig = _context.sent;

            if (blurtConfig) {
              raw.blurt_config = blurtConfig;
            }

            cleansed = (0, _stateCleaner["default"])(raw);
            return _context.abrupt("return", cleansed);

          case 29:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getStateAsync.apply(this, arguments);
}

function getChainProperties() {
  return new Promise(function (resolve) {
    _blurtjs.api.getChainProperties(function (err, result) {
      if (result) {
        resolve(result);
      } else {
        resolve({});
      }
    });
  });
}

function getRewardFund() {
  return new Promise(function (resolve) {
    _blurtjs.api.getRewardFund('post', function (err, result) {
      if (result) {
        resolve(result);
      } else {
        resolve({});
      }
    });
  });
}

function getConfig() {
  return new Promise(function (resolve) {
    _blurtjs.api.getConfig(function (err, result) {
      if (result) {
        resolve(result);
      } else {
        resolve({});
      }
    });
  });
}

function callNotificationsApi(_x2) {
  return _callNotificationsApi.apply(this, arguments);
}

function _callNotificationsApi() {
  _callNotificationsApi = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(account) {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            console.log('call notifications api', account);
            return _context2.abrupt("return", new Promise(function (resolve, reject) {
              var client = new _busyjs.Client('wss://notifications.blurt.world');
              client.call('get_notifications', [account], function (err, result) {
                if (err !== null) reject(err);
                resolve(result);
              });
            }));

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _callNotificationsApi.apply(this, arguments);
}