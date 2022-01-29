"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _react = _interopRequireDefault(require("react"));

var _reactRedux = require("react-redux");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var GoogleAd = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(GoogleAd, _React$Component);

  var _super = _createSuper(GoogleAd);

  function GoogleAd() {
    (0, _classCallCheck2["default"])(this, GoogleAd);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(GoogleAd, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (!this.props.shouldSeeAds) {
        return;
      }

      (window.adsbygoogle = window.adsbygoogle || []).push({});
    }
  }, {
    key: "render",
    value: function render() {
      if (!this.props.shouldSeeAds) {
        return null;
      }

      var style = Object.assign({
        display: 'inline-block',
        width: '100%'
      }, this.props.style || {});
      var className = ['adsbygoogle'].concat(this.props.env === 'development' ? ['ad-dev'] : []).concat(this.props.name ? [this.props.name] : []).join(' ');
      return /*#__PURE__*/_react["default"].createElement("ins", {
        className: className,
        style: style,
        "data-adtest": this.props.test,
        "data-ad-client": this.props.client,
        "data-ad-slot": this.props.slot,
        "data-ad-format": this.props.format || 'auto',
        "data-ad-layout-key": this.props.layoutKey,
        "data-full-width-responsive": this.props.fullWidthResponsive
      });
    }
  }]);
  return GoogleAd;
}(_react["default"].Component);

var _default = (0, _reactRedux.connect)(function (state, ownProps) {
  var env = state.app.get('env');
  var shouldSeeAds = state.app.getIn(['googleAds', 'enabled']);
  var test = state.app.getIn(['googleAds', 'test']);
  var client = state.app.getIn(['googleAds', 'client']);
  return _objectSpread({
    env: env,
    shouldSeeAds: shouldSeeAds,
    test: test,
    client: client
  }, ownProps);
})(GoogleAd);

exports["default"] = _default;