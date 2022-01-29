"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var _immutable = require("immutable");

var _TimeAgoWrapper = _interopRequireDefault(require("app/components/elements/TimeAgoWrapper"));

var _FetchDataSaga = require("app/redux/FetchDataSaga");

var _Callout = _interopRequireDefault(require("app/components/elements/Callout"));

var _Icon = _interopRequireDefault(require("app/components/elements/Icon"));

var _Userpic = _interopRequireDefault(require("app/components/elements/Userpic"));

var _counterpart = _interopRequireDefault(require("counterpart"));

var _classnames = _interopRequireDefault(require("classnames"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var notificationsIcon = function notificationsIcon(type) {
  var types = {
    reply: 'chatbox',
    reply_post: 'chatbox',
    reply_comment: 'chatbox',
    follow: 'voters',
    set_label: 'pencil2',
    set_role: 'pencil2',
    error: 'cog',
    reblog: 'reblog',
    mention: 'chatboxes',
    transfer: 'transfer',
    witness_vote: 'witness',
    vote: 'chevron-up-circle'
  };
  var icon = 'chain';

  if (type in types) {
    icon = types[type];
  } else {
    console.error('no icon for type: ', type);
  }

  return /*#__PURE__*/_react["default"].createElement(_Icon["default"], {
    size: "1x",
    name: icon
  });
};

var notificationFilter = 'all';
var notificationFilterToTypes = {
  replies: ['reply_comment', 'reply'],
  follows: ['follow'],
  upvotes: ['vote'],
  reblogs: ['reblog'],
  mentions: ['mention']
};

var highlightText = function highlightText(text, highlight) {
  if (!highlight) return text;
  var parts = text.split(new RegExp("(".concat(highlight, ")"), 'gi'));
  return /*#__PURE__*/_react["default"].createElement("span", null, ' ', parts.map(function (part, i) {
    return /*#__PURE__*/_react["default"].createElement("span", {
      // eslint-disable-next-line react/no-array-index-key
      key: i,
      style: part.toLowerCase() === highlight.toLowerCase() ? {
        fontWeight: 'bold'
      } : {}
    }, part);
  }), ' ');
};

var pic = function pic(author) {
  return /*#__PURE__*/_react["default"].createElement("a", {
    href: '/@' + author
  }, /*#__PURE__*/_react["default"].createElement(_Userpic["default"], {
    account: author
  }));
};

var NotificationsList = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(NotificationsList, _React$Component);

  var _super = _createSuper(NotificationsList);

  // eslint-disable-next-line no-undef
  // eslint-disable-next-line no-undef
  // eslint-disable-next-line no-useless-constructor
  function NotificationsList() {
    var _this;

    (0, _classCallCheck2["default"])(this, NotificationsList);
    _this = _super.call(this);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onClickMarkAsRead", function (e) {
      e.preventDefault();
      var _this$props = _this.props,
          username = _this$props.username,
          markAsRead = _this$props.markAsRead;
      markAsRead(username);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "applyFilter", function () {
      var notificationElements = document.getElementsByClassName('notification__item');
      var visibleCount = 0;

      for (var ni = 0; ni < notificationElements.length; ni += 1) {
        var notificationElement = notificationElements[ni];

        if (notificationFilter === 'all') {
          notificationElement.classList.remove('hide');
          visibleCount += 1;

          if (visibleCount % 2 === 0) {
            notificationElement.classList.add('even');
          } else {
            notificationElement.classList.remove('even');
          }
        } else if (Object.prototype.hasOwnProperty.call(notificationFilterToTypes, notificationFilter)) {
          var notificationTypes = notificationFilterToTypes[notificationFilter];
          var matchType = false;

          for (var ti = 0; ti < notificationTypes.length; ti += 1) {
            var notificationType = notificationTypes[ti];

            if (notificationElement.classList.contains("notification__".concat(notificationType))) {
              matchType = true;
            }
          }

          if (matchType === false) {
            notificationElement.classList.add('hide');
          } else {
            notificationElement.classList.remove('hide');
            visibleCount += 1;
          }

          if (visibleCount % 2 === 0) {
            notificationElement.classList.add('even');
          } else {
            notificationElement.classList.remove('even');
          }
        }
      }
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onClickFilter", function (e) {
      e.preventDefault();
      var target = e.target;
      var filterElements = document.getElementsByClassName('notification__filter'); // reset

      for (var fi = 0; fi < filterElements.length; fi += 1) {
        var filterElement = filterElements[fi];
        filterElement.classList.remove('selected');
      }

      target.classList.add('selected');
      notificationFilter = target.dataset.type;

      _this.applyFilter();

      target.blur();
    });
    return _this;
  }

  (0, _createClass2["default"])(NotificationsList, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      var _this$props2 = this.props,
          username = _this$props2.username,
          getAccountNotifications = _this$props2.getAccountNotifications;

      if (username) {
        getAccountNotifications(username);
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this$props3 = this.props,
          username = _this$props3.username,
          getAccountNotifications = _this$props3.getAccountNotifications;

      if (prevProps.username !== username) {
        getAccountNotifications(username);
      }

      this.applyFilter();
    } // eslint-disable-next-line no-undef

  }, {
    key: "render",
    value: function render() {
      var _this$props4 = this.props,
          notifications = _this$props4.notifications,
          isOwnAccount = _this$props4.isOwnAccount,
          accountName = _this$props4.accountName; // eslint-disable-next-line consistent-return

      var renderItem = function renderItem(item, index) {
        var lastRead = localStorage.getItem('last_timestamp');
        var unRead = lastRead <= item.timestamp;
        var key = "".concat(index).concat(item.timestamp);

        if (item.type === 'mention') {
          var type = item.type;
          var account = item.author;
          var timestamp = item.timestamp;
          var permlink = item.permlink;
          return /*#__PURE__*/_react["default"].createElement("div", {
            key: key,
            className: "notification__item flex-body notification__".concat(item.type)
          }, /*#__PURE__*/_react["default"].createElement("div", {
            className: "flex-row"
          }, pic("".concat(account))), /*#__PURE__*/_react["default"].createElement("div", {
            className: "flex-column"
          }, /*#__PURE__*/_react["default"].createElement("div", {
            className: "notification__message"
          }, /*#__PURE__*/_react["default"].createElement("a", {
            href: "/@".concat(account, "/").concat(permlink)
          }, highlightText("".concat((0, _counterpart["default"])('notificationsList_jsx.mention', {
            account: account
          })), "".concat(account))))), /*#__PURE__*/_react["default"].createElement("div", {
            className: "flex-row"
          }, /*#__PURE__*/_react["default"].createElement("div", {
            className: "notification__icon"
          }, notificationsIcon(type)), /*#__PURE__*/_react["default"].createElement("div", {
            className: "notification__date"
          }, /*#__PURE__*/_react["default"].createElement(_TimeAgoWrapper["default"], {
            date: new Date(timestamp * 1000).toJSON()
          }))), unRead && /*#__PURE__*/_react["default"].createElement("span", {
            className: "notification__unread"
          }, "\u2022"));
        } else if (item.type === 'transfer') {
          var _type = item.type;
          var _account = item.from;
          var _timestamp = item.timestamp;
          var amount = item.amount;
          return /*#__PURE__*/_react["default"].createElement("div", {
            key: key,
            className: "notification__item flex-body notification__".concat(item.type)
          }, /*#__PURE__*/_react["default"].createElement("div", {
            className: "flex-row"
          }, pic("".concat(_account))), /*#__PURE__*/_react["default"].createElement("div", {
            className: "flex-column"
          }, /*#__PURE__*/_react["default"].createElement("div", {
            className: "notification__message"
          }, /*#__PURE__*/_react["default"].createElement("a", {
            href: "https://blurtwallet.com/@".concat(accountName, "/transfers")
          }, highlightText("".concat((0, _counterpart["default"])('notificationsList_jsx.transfer', {
            account: _account,
            amount: amount
          })), "".concat(_account))))), /*#__PURE__*/_react["default"].createElement("div", {
            className: "flex-row"
          }, /*#__PURE__*/_react["default"].createElement("div", {
            className: "notification__icon"
          }, notificationsIcon(_type)), /*#__PURE__*/_react["default"].createElement("div", {
            className: "notification__date"
          }, /*#__PURE__*/_react["default"].createElement(_TimeAgoWrapper["default"], {
            date: new Date(_timestamp * 1000).toJSON()
          }))), unRead && /*#__PURE__*/_react["default"].createElement("span", {
            className: "notification__unread"
          }, "\u2022"));
        } else if (item.type === 'reply') {
          var _type2 = item.type;
          var _account2 = item.author;
          var _timestamp2 = item.timestamp;
          var _permlink = item.permlink;
          return /*#__PURE__*/_react["default"].createElement("div", {
            key: key,
            className: "notification__item flex-body notification__".concat(item.type)
          }, /*#__PURE__*/_react["default"].createElement("div", {
            className: "flex-row"
          }, pic("".concat(_account2))), /*#__PURE__*/_react["default"].createElement("div", {
            className: "flex-column"
          }, /*#__PURE__*/_react["default"].createElement("div", {
            className: "notification__message"
          }, /*#__PURE__*/_react["default"].createElement("a", {
            href: "/@".concat(_account2, "/").concat(_permlink)
          }, highlightText("".concat((0, _counterpart["default"])('notificationsList_jsx.reply', {
            account: _account2
          })), "".concat(_account2))))), /*#__PURE__*/_react["default"].createElement("div", {
            className: "flex-row"
          }, /*#__PURE__*/_react["default"].createElement("div", {
            className: "notification__icon"
          }, notificationsIcon(_type2)), /*#__PURE__*/_react["default"].createElement("div", {
            className: "notification__date"
          }, /*#__PURE__*/_react["default"].createElement(_TimeAgoWrapper["default"], {
            date: new Date(_timestamp2 * 1000).toJSON()
          }))), unRead && /*#__PURE__*/_react["default"].createElement("span", {
            className: "notification__unread"
          }, "\u2022"));
        } else if (item.type === 'reblog') {
          var _type3 = item.type;
          var _account3 = item.account;
          var _timestamp3 = item.timestamp;
          var _permlink2 = item.permlink;
          return /*#__PURE__*/_react["default"].createElement("div", {
            key: key,
            className: "notification__item flex-body notification__".concat(item.type)
          }, /*#__PURE__*/_react["default"].createElement("div", {
            className: "flex-row"
          }, pic("".concat(_account3))), /*#__PURE__*/_react["default"].createElement("div", {
            className: "flex-column"
          }, /*#__PURE__*/_react["default"].createElement("div", {
            className: "notification__message"
          }, /*#__PURE__*/_react["default"].createElement("a", {
            href: "/@".concat(accountName, "/").concat(_permlink2)
          }, highlightText("".concat((0, _counterpart["default"])('notificationsList_jsx.reblog', {
            account: _account3
          })), "".concat(_account3))))), /*#__PURE__*/_react["default"].createElement("div", {
            className: "flex-row"
          }, /*#__PURE__*/_react["default"].createElement("div", {
            className: "notification__icon"
          }, notificationsIcon(_type3)), /*#__PURE__*/_react["default"].createElement("div", {
            className: "notification__date"
          }, /*#__PURE__*/_react["default"].createElement(_TimeAgoWrapper["default"], {
            date: new Date(_timestamp3 * 1000).toJSON()
          }))), unRead && /*#__PURE__*/_react["default"].createElement("span", {
            className: "notification__unread"
          }, "\u2022"));
        } else if (item.type === 'follow') {
          var _type4 = item.type;
          var _account4 = item.follower;
          var _timestamp4 = item.timestamp;
          return /*#__PURE__*/_react["default"].createElement("div", {
            key: key,
            className: "notification__item flex-body notification__".concat(item.type)
          }, /*#__PURE__*/_react["default"].createElement("div", {
            className: "flex-row"
          }, pic("".concat(_account4))), /*#__PURE__*/_react["default"].createElement("div", {
            className: "flex-column"
          }, /*#__PURE__*/_react["default"].createElement("div", {
            className: "notification__message"
          }, /*#__PURE__*/_react["default"].createElement("a", {
            href: "/@".concat(_account4)
          }, highlightText("".concat((0, _counterpart["default"])('notificationsList_jsx.follow', {
            account: _account4
          })), "".concat(_account4))))), /*#__PURE__*/_react["default"].createElement("div", {
            className: "flex-row"
          }, /*#__PURE__*/_react["default"].createElement("div", {
            className: "notification__icon"
          }, notificationsIcon(_type4)), /*#__PURE__*/_react["default"].createElement("div", {
            className: "notification__date"
          }, /*#__PURE__*/_react["default"].createElement(_TimeAgoWrapper["default"], {
            date: new Date(_timestamp4 * 1000).toJSON()
          }))), unRead && /*#__PURE__*/_react["default"].createElement("span", {
            className: "notification__unread"
          }, "\u2022"));
        } else if (item.type === 'witness_vote') {
          var _type5 = item.type;
          var _account5 = item.account;
          var _timestamp5 = item.timestamp;
          return /*#__PURE__*/_react["default"].createElement("div", {
            key: key,
            className: "notification__item flex-body notification__".concat(item.type)
          }, /*#__PURE__*/_react["default"].createElement("div", {
            className: "flex-row"
          }, pic("".concat(_account5))), /*#__PURE__*/_react["default"].createElement("div", {
            className: "flex-column"
          }, /*#__PURE__*/_react["default"].createElement("div", {
            className: "notification__message"
          }, /*#__PURE__*/_react["default"].createElement("a", {
            href: "/@".concat(_account5)
          }, highlightText("".concat((0, _counterpart["default"])('notificationsList_jsx.witness_vote', {
            account: _account5
          })), "".concat(_account5))))), /*#__PURE__*/_react["default"].createElement("div", {
            className: "flex-row"
          }, /*#__PURE__*/_react["default"].createElement("div", {
            className: "notification__icon"
          }, notificationsIcon(_type5)), /*#__PURE__*/_react["default"].createElement("div", {
            className: "notification__date"
          }, /*#__PURE__*/_react["default"].createElement(_TimeAgoWrapper["default"], {
            date: new Date(_timestamp5 * 1000).toJSON()
          }))), unRead && /*#__PURE__*/_react["default"].createElement("span", {
            className: "notification__unread"
          }, "\u2022"));
        } else if (item.type === 'vote') {
          var _type6 = item.type;
          var voter = item.voter;
          var _timestamp6 = item.timestamp;
          var _permlink3 = item.permlink;
          var _account6 = accountName;
          return /*#__PURE__*/_react["default"].createElement("div", {
            key: key,
            className: "notification__item flex-body notification__".concat(item.type)
          }, /*#__PURE__*/_react["default"].createElement("div", {
            className: "flex-row"
          }, pic("".concat(voter))), /*#__PURE__*/_react["default"].createElement("div", {
            className: "flex-column"
          }, /*#__PURE__*/_react["default"].createElement("div", {
            className: "notification__message"
          }, /*#__PURE__*/_react["default"].createElement("a", {
            href: "/@".concat(_account6, "/").concat(_permlink3)
          }, highlightText("".concat((0, _counterpart["default"])('notificationsList_jsx.vote', {
            voter: voter
          })), "".concat(voter))))), /*#__PURE__*/_react["default"].createElement("div", {
            className: "flex-row"
          }, /*#__PURE__*/_react["default"].createElement("div", {
            className: "notification__icon"
          }, notificationsIcon(_type6)), /*#__PURE__*/_react["default"].createElement("div", {
            className: "notification__date"
          }, /*#__PURE__*/_react["default"].createElement(_TimeAgoWrapper["default"], {
            date: new Date(_timestamp6 * 1000).toJSON()
          }))), unRead && /*#__PURE__*/_react["default"].createElement("span", {
            className: "notification__unread"
          }, "\u2022"));
        }
      };

      return /*#__PURE__*/_react["default"].createElement("div", {
        className: ""
      }, isOwnAccount, notifications && notifications.length > 0 && /*#__PURE__*/_react["default"].createElement("center", null, /*#__PURE__*/_react["default"].createElement("br", null), /*#__PURE__*/_react["default"].createElement("a", {
        href: "#",
        onClick: this.onClickMarkAsRead
      }, /*#__PURE__*/_react["default"].createElement("strong", null, (0, _counterpart["default"])('notificationsList_jsx.mark_all_as_read'))), /*#__PURE__*/_react["default"].createElement("br", null)), /*#__PURE__*/_react["default"].createElement("center", null, /*#__PURE__*/_react["default"].createElement("div", {
        className: "notification__filter_select"
      }, /*#__PURE__*/_react["default"].createElement("a", {
        className: (0, _classnames["default"])('notification__filter', {
          selected: notificationFilter === 'all'
        }),
        role: "link",
        "data-type": "all",
        tabIndex: 0,
        onClick: this.onClickFilter
      }, (0, _counterpart["default"])('notificationsList_jsx.all')), /*#__PURE__*/_react["default"].createElement("a", {
        className: (0, _classnames["default"])('notification__filter', {
          selected: notificationFilter === 'replies'
        }),
        role: "link",
        "data-type": "replies",
        tabIndex: 0,
        onClick: this.onClickFilter
      }, (0, _counterpart["default"])('notificationsList_jsx.replies')), /*#__PURE__*/_react["default"].createElement("a", {
        className: (0, _classnames["default"])('notification__filter', {
          selected: notificationFilter === 'mentions'
        }),
        role: "link",
        "data-type": "mentions",
        tabIndex: 0,
        onClick: this.onClickFilter
      }, (0, _counterpart["default"])('notificationsList_jsx.mentions')), /*#__PURE__*/_react["default"].createElement("a", {
        className: (0, _classnames["default"])('notification__filter', {
          selected: notificationFilter === 'follows'
        }),
        role: "link",
        "data-type": "follows",
        tabIndex: 0,
        onClick: this.onClickFilter
      }, (0, _counterpart["default"])('notificationsList_jsx.follows')), /*#__PURE__*/_react["default"].createElement("a", {
        className: (0, _classnames["default"])('notification__filter', {
          selected: notificationFilter === 'upvotes'
        }),
        role: "link",
        "data-type": "upvotes",
        tabIndex: 0,
        onClick: this.onClickFilter
      }, (0, _counterpart["default"])('notificationsList_jsx.upvotes')), /*#__PURE__*/_react["default"].createElement("a", {
        className: (0, _classnames["default"])('notification__filter', {
          selected: notificationFilter === 'reblogs'
        }),
        role: "link",
        "data-type": "reblogs",
        tabIndex: 0,
        onClick: this.onClickFilter
      }, (0, _counterpart["default"])('notificationsList_jsx.reblogs')))), notifications && notifications.length > 0 && /*#__PURE__*/_react["default"].createElement("div", {
        style: {
          lineHeight: '1rem'
        }
      }, notifications.map(function (item, index) {
        return renderItem(item, index);
      })), !notifications && process.env.BROWSER && /*#__PURE__*/_react["default"].createElement(_Callout["default"], null, "Welcome! You don't have any notifications yet."));
    }
  }]);
  return NotificationsList;
}(_react["default"].Component);

(0, _defineProperty2["default"])(NotificationsList, "propTypes", {
  username: _propTypes["default"].string.isRequired,
  markAsRead: _propTypes["default"].func.isRequired
});
(0, _defineProperty2["default"])(NotificationsList, "defaultProps", {
  notifications: []
});

var _default = (0, _reactRedux.connect)(function (state, props) {
  var accountName = props.username;
  var isOwnAccount = state.user.getIn(['current', 'username'], '') == accountName;
  var notifications = state.global.getIn(['notifications', accountName, 'notifications'], (0, _immutable.List)()).toJS();
  return _objectSpread(_objectSpread({}, props), {}, {
    isOwnAccount: isOwnAccount,
    accountName: accountName,
    notifications: notifications
  });
}, function (dispatch) {
  return {
    getAccountNotifications: function getAccountNotifications(username) {
      var query = {
        account: username
      };
      return dispatch(_FetchDataSaga.actions.getAccountNotifications(query));
    },
    markAsRead: function markAsRead(username) {
      var query = {
        account: username
      };

      if (typeof localStorage != 'undefined') {
        localStorage.setItem('last_timestamp', Math.floor(Date.now() / 1000));
      }

      return dispatch(_FetchDataSaga.actions.getAccountNotifications(query));
    }
  };
})(NotificationsList);

exports["default"] = _default;