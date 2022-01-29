"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _react = _interopRequireDefault(require("react"));

var _CloseButton = _interopRequireDefault(require("app/components/elements/CloseButton"));

var _reactRouter = require("react-router");

var _counterpart = _interopRequireDefault(require("counterpart"));

var _constants = require("shared/constants");

var _blurtGirlSplash = _interopRequireDefault(require("app/assets/images/blurt-girl-splash.png"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var WelcomePanel = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(WelcomePanel, _React$Component);

  var _super = _createSuper(WelcomePanel);

  function WelcomePanel(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, WelcomePanel);
    _this = _super.call(this, props);
    _this.setShowBannerFalse = props.setShowBannerFalse;
    return _this;
  }

  (0, _createClass2["default"])(WelcomePanel, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "welcomeWrapper"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "welcomeBanner"
      }, /*#__PURE__*/_react["default"].createElement(_CloseButton["default"], {
        onClick: this.setShowBannerFalse
      }), /*#__PURE__*/_react["default"].createElement("div", {
        className: "row"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "text-center welcomeImage small-12 show-for-small-only"
      }, /*#__PURE__*/_react["default"].createElement("img", {
        className: "heroImage",
        src: _blurtGirlSplash["default"],
        alt: ""
      }))), /*#__PURE__*/_react["default"].createElement("div", {
        className: "row"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "large-1 show-for-large"
      }), /*#__PURE__*/_react["default"].createElement("div", {
        className: "small-12 medium-6 large-5 welcomePitch"
      }, /*#__PURE__*/_react["default"].createElement("h2", {
        className: "fade-in--1"
      }, (0, _counterpart["default"])('navigation.intro_tagline')), /*#__PURE__*/_react["default"].createElement("h4", {
        className: "fade-in--3"
      }, (0, _counterpart["default"])('navigation.intro_paragraph')), /*#__PURE__*/_react["default"].createElement("div", {
        className: "row buttonWrapper"
      }, /*#__PURE__*/_react["default"].createElement("a", {
        className: "button button--primary fade-in--5",
        href: _constants.SIGNUP_URL
      }, ' ', /*#__PURE__*/_react["default"].createElement("b", null, (0, _counterpart["default"])('navigation.sign_up')), ' '), /*#__PURE__*/_react["default"].createElement(_reactRouter.Link, {
        href: "/faq.html",
        className: "button ghost fade-in--7"
      }, /*#__PURE__*/_react["default"].createElement("b", null, (0, _counterpart["default"])('navigation.learn_more'))))), /*#__PURE__*/_react["default"].createElement("div", {
        className: "text-center welcomeImage medium-6 large-5 show-for-medium"
      }, /*#__PURE__*/_react["default"].createElement("img", {
        className: "heroImage",
        src: _blurtGirlSplash["default"],
        alt: ""
      })))));
    }
  }]);
  return WelcomePanel;
}(_react["default"].Component);

exports["default"] = WelcomePanel;