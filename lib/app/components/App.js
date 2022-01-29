"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

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

var _AppPropTypes = _interopRequireDefault(require("app/utils/AppPropTypes"));

var _Header = _interopRequireDefault(require("app/components/modules/Header"));

var userActions = _interopRequireWildcard(require("app/redux/UserReducer"));

var _classnames = _interopRequireDefault(require("classnames"));

var _ConnectedSidePanel = _interopRequireDefault(require("app/components/modules/ConnectedSidePanel"));

var _CloseButton = _interopRequireDefault(require("app/components/elements/CloseButton"));

var _Dialogs = _interopRequireDefault(require("app/components/modules/Dialogs"));

var _Modals = _interopRequireDefault(require("app/components/modules/Modals"));

var _WelcomePanel = _interopRequireDefault(require("app/components/elements/WelcomePanel"));

var _counterpart = _interopRequireDefault(require("counterpart"));

var _constants = require("shared/constants");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var App = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(App, _React$Component);

  var _super = _createSuper(App);

  function App(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, App);
    _this = _super.call(this, props); // TODO: put both of these and associated toggles into Redux Store.

    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "setShowBannerFalse", function () {
      _this.setState({
        showBanner: false
      });
    });
    _this.state = {
      showCallout: true,
      showBanner: true
    };
    _this.listenerActive = null;
    return _this;
  }

  (0, _createClass2["default"])(App, [{
    key: "toggleBodyNightmode",
    value: function toggleBodyNightmode(nightmodeEnabled) {
      if (nightmodeEnabled) {
        document.body.classList.remove('theme-light');
        document.body.classList.add('theme-dark');
      } else {
        document.body.classList.remove('theme-dark');
        document.body.classList.add('theme-light');
      }
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var nightmodeEnabled = nextProps.nightmodeEnabled;
      this.toggleBodyNightmode(nightmodeEnabled);
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {
      if (process.env.BROWSER) localStorage.removeItem('autopost'); // July 14 '16 compromise, renamed to autopost2

      this.props.loginUser();
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var nightmodeEnabled = this.props.nightmodeEnabled;
      this.toggleBodyNightmode(nightmodeEnabled);
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      var _this$props = this.props,
          pathname = _this$props.pathname,
          new_visitor = _this$props.new_visitor,
          nightmodeEnabled = _this$props.nightmodeEnabled,
          showAnnouncement = _this$props.showAnnouncement;
      var n = nextProps;
      return pathname !== n.pathname || new_visitor !== n.new_visitor || this.state.showBanner !== nextState.showBanner || this.state.showCallout !== nextState.showCallout || nightmodeEnabled !== n.nightmodeEnabled || showAnnouncement !== n.showAnnouncement;
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props2 = this.props,
          params = _this$props2.params,
          children = _this$props2.children,
          new_visitor = _this$props2.new_visitor,
          nightmodeEnabled = _this$props2.nightmodeEnabled,
          viewMode = _this$props2.viewMode,
          pathname = _this$props2.pathname,
          category = _this$props2.category,
          order = _this$props2.order;
      var whistleView = viewMode === _constants.VIEW_MODE_WHISTLE;
      var headerHidden = whistleView;
      var params_keys = Object.keys(params);
      var ip = pathname === '/' || params_keys.length === 2 && params_keys[0] === 'order' && params_keys[1] === 'category';
      var alert = this.props.error;
      var callout = null;

      if (this.state.showCallout && alert) {
        callout = /*#__PURE__*/_react["default"].createElement("div", {
          className: "App__announcement row"
        }, /*#__PURE__*/_react["default"].createElement("div", {
          className: "column"
        }, /*#__PURE__*/_react["default"].createElement("div", {
          className: (0, _classnames["default"])('callout', {
            alert: alert
          })
        }, /*#__PURE__*/_react["default"].createElement(_CloseButton["default"], {
          onClick: function onClick() {
            return _this2.setState({
              showCallout: false
            });
          }
        }), /*#__PURE__*/_react["default"].createElement("p", null, alert))));
      } else if (false && ip && this.state.showCallout) {
        callout = /*#__PURE__*/_react["default"].createElement("div", {
          className: "App__announcement row"
        }, /*#__PURE__*/_react["default"].createElement("div", {
          className: "column"
        }, /*#__PURE__*/_react["default"].createElement("div", {
          className: (0, _classnames["default"])('callout success', {
            alert: alert
          }, {
            warning: warning
          }, {
            success: success
          })
        }, /*#__PURE__*/_react["default"].createElement(_CloseButton["default"], {
          onClick: function onClick() {
            return _this2.setState({
              showCallout: false
            });
          }
        }), /*#__PURE__*/_react["default"].createElement("ul", null))));
      }

      if ($STM_Config.read_only_mode && this.state.showCallout) {
        callout = /*#__PURE__*/_react["default"].createElement("div", {
          className: "App__announcement row"
        }, /*#__PURE__*/_react["default"].createElement("div", {
          className: "column"
        }, /*#__PURE__*/_react["default"].createElement("div", {
          className: (0, _classnames["default"])('callout warning', {
            alert: alert
          }, {
            warning: warning
          }, {
            success: success
          })
        }, /*#__PURE__*/_react["default"].createElement(_CloseButton["default"], {
          onClick: function onClick() {
            return _this2.setState({
              showCallout: false
            });
          }
        }), /*#__PURE__*/_react["default"].createElement("p", null, (0, _counterpart["default"])('g.read_only_mode')))));
      }

      var themeClass = nightmodeEnabled ? ' theme-dark' : ' theme-light';
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _classnames["default"])('App', themeClass, {
          'index-page': ip,
          'whistle-view': whistleView,
          withAnnouncement: this.props.showAnnouncement
        }),
        ref: "App_root"
      }, /*#__PURE__*/_react["default"].createElement(_ConnectedSidePanel["default"], {
        alignment: "right"
      }), headerHidden ? null : /*#__PURE__*/_react["default"].createElement(_Header["default"], {
        pathname: pathname,
        category: category,
        order: order
      }), /*#__PURE__*/_react["default"].createElement("div", {
        className: "App__content"
      }, process.env.BROWSER && ip && new_visitor && this.state.showBanner ? /*#__PURE__*/_react["default"].createElement(_WelcomePanel["default"], {
        setShowBannerFalse: this.setShowBannerFalse
      }) : null, callout, children), /*#__PURE__*/_react["default"].createElement(_Dialogs["default"], null), /*#__PURE__*/_react["default"].createElement(_Modals["default"], null));
    }
  }]);
  return App;
}(_react["default"].Component);

App.propTypes = {
  error: _propTypes["default"].string,
  children: _AppPropTypes["default"].Children,
  pathname: _propTypes["default"].string,
  category: _propTypes["default"].string,
  order: _propTypes["default"].string,
  loginUser: _propTypes["default"].func.isRequired
};

var _default = (0, _reactRedux.connect)(function (state, ownProps) {
  var current_user = state.user.get('current');
  var current_account_name = current_user ? current_user.get('username') : state.offchain.get('account');
  return {
    viewMode: state.app.get('viewMode'),
    error: state.app.get('error'),
    new_visitor: !state.user.get('current') && !state.offchain.get('user') && !state.offchain.get('account') && state.offchain.get('new_visit'),
    nightmodeEnabled: state.app.getIn(['user_preferences', 'nightmode']),
    pathname: ownProps.location.pathname,
    order: ownProps.params.order,
    category: ownProps.params.category,
    showAnnouncement: state.user.get('showAnnouncement')
  };
}, function (dispatch) {
  return {
    loginUser: function loginUser() {
      return dispatch(userActions.usernamePasswordLogin({}));
    }
  };
})(App);

exports["default"] = _default;