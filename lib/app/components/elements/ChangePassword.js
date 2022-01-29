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

var _counterpart = _interopRequireDefault(require("counterpart"));

var _reactRouter = require("react-router");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var ChangePassword = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(ChangePassword, _React$Component);

  var _super = _createSuper(ChangePassword);

  function ChangePassword() {
    (0, _classCallCheck2["default"])(this, ChangePassword);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(ChangePassword, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react["default"].createElement("div", null, (0, _counterpart["default"])('g.external_link_message'), ': ', /*#__PURE__*/_react["default"].createElement(_reactRouter.Link, {
        to: "".concat($STM_Config.wallet_url)
      }, "Wallet"));
    }
  }]);
  return ChangePassword;
}(_react["default"].Component);

var _default = reduxForm()(ChangePassword);

exports["default"] = _default;