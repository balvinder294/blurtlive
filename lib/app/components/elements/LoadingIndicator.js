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

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var LoadingIndicator = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(LoadingIndicator, _React$Component);

  var _super = _createSuper(LoadingIndicator);

  function LoadingIndicator(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, LoadingIndicator);
    _this = _super.call(this, props);
    _this.state = {
      progress: 0
    };
    return _this;
  }

  (0, _createClass2["default"])(LoadingIndicator, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          type = _this$props.type,
          inline = _this$props.inline,
          style = _this$props.style;

      switch (type) {
        case 'dots':
          return /*#__PURE__*/_react["default"].createElement("div", {
            style: style,
            className: "LoadingIndicator three-bounce"
          }, /*#__PURE__*/_react["default"].createElement("div", {
            className: "bounce1"
          }), /*#__PURE__*/_react["default"].createElement("div", {
            className: "bounce2"
          }), /*#__PURE__*/_react["default"].createElement("div", {
            className: "bounce3"
          }));

        case 'circle':
          return /*#__PURE__*/_react["default"].createElement("div", {
            style: style,
            className: 'LoadingIndicator circle' + (inline ? ' inline' : '')
          }, /*#__PURE__*/_react["default"].createElement("div", null));
        //'strong' may be an evolving load indicator.

        case 'circle-strong':
          return /*#__PURE__*/_react["default"].createElement("div", {
            style: style,
            className: 'LoadingIndicator circle circle-strong'
          }, /*#__PURE__*/_react["default"].createElement("div", null));

        default:
          return /*#__PURE__*/_react["default"].createElement("div", {
            className: 'LoadingIndicator loading-overlay' + (this.progress > 0 ? ' with-progress' : ''),
            style: style
          }, /*#__PURE__*/_react["default"].createElement("div", {
            className: "loading-panel"
          }, /*#__PURE__*/_react["default"].createElement("div", {
            className: "spinner"
          }, /*#__PURE__*/_react["default"].createElement("div", {
            className: "bounce1"
          }), /*#__PURE__*/_react["default"].createElement("div", {
            className: "bounce2"
          }), /*#__PURE__*/_react["default"].createElement("div", {
            className: "bounce3"
          })), /*#__PURE__*/_react["default"].createElement("div", {
            className: "progress-indicator"
          }, /*#__PURE__*/_react["default"].createElement("span", null, this.state.progress))));
      }
    }
  }]);
  return LoadingIndicator;
}(_react["default"].Component);

(0, _defineProperty2["default"])(LoadingIndicator, "propTypes", {
  // html component attributes
  type: _propTypes["default"].oneOf(['dots', 'circle', 'circle-strong']),
  inline: _propTypes["default"].bool,
  style: _propTypes["default"].object
});
(0, _defineProperty2["default"])(LoadingIndicator, "defaultProps", {
  style: {}
});
var _default = LoadingIndicator;
exports["default"] = _default;