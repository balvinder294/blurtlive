"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _react = _interopRequireDefault(require("react"));

var _reactIntl = require("react-intl");

var _Tooltip = _interopRequireDefault(require("app/components/elements/Tooltip"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var TimeAgoWrapper = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(TimeAgoWrapper, _React$Component);

  var _super = _createSuper(TimeAgoWrapper);

  function TimeAgoWrapper() {
    (0, _classCallCheck2["default"])(this, TimeAgoWrapper);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(TimeAgoWrapper, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          date = _this$props.date,
          className = _this$props.className;

      if (date && /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d$/.test(date)) {
        date = date + 'Z'; // Firefox really wants this Z (Zulu)
      }

      var dt = new Date(date);
      var date_time = "".concat(this.props.intl.formatDate(dt), " ").concat(this.props.intl.formatTime(dt));
      return /*#__PURE__*/_react["default"].createElement(_Tooltip["default"], {
        t: date_time,
        className: className
      }, /*#__PURE__*/_react["default"].createElement(_reactIntl.FormattedRelative, (0, _extends2["default"])({}, this.props, {
        value: date
      })));
    }
  }]);
  return TimeAgoWrapper;
}(_react["default"].Component);

var _default = (0, _reactIntl.injectIntl)(TimeAgoWrapper);

exports["default"] = _default;