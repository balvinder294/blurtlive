"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _react = _interopRequireDefault(require("react"));

var _counterpart = _interopRequireDefault(require("counterpart"));

var _client_config = require("app/client_config");

var _reactRouter = require("react-router");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var RecoverAccountStep1 = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(RecoverAccountStep1, _React$Component);

  var _super = _createSuper(RecoverAccountStep1);

  function RecoverAccountStep1() {
    (0, _classCallCheck2["default"])(this, RecoverAccountStep1);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(RecoverAccountStep1, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "RestoreAccount"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "row"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "column large-4"
      }, /*#__PURE__*/_react["default"].createElement("h2", null, (0, _counterpart["default"])('navigation.stolen_account_recovery')), /*#__PURE__*/_react["default"].createElement("p", null, (0, _counterpart["default"])('recoveraccountstep1_jsx.recover_account_intro', {
        APP_URL: _client_config.APP_DOMAIN,
        APP_NAME: _client_config.APP_NAME
      })), /*#__PURE__*/_react["default"].createElement("p", null, (0, _counterpart["default"])('g.external_link_message'), ': ', /*#__PURE__*/_react["default"].createElement(_reactRouter.Link, {
        to: "".concat($STM_Config.wallet_url, "/recover_account_step_1")
      }, (0, _counterpart["default"])('navigation.stolen_account_recovery'))))));
    }
  }]);
  return RecoverAccountStep1;
}(_react["default"].Component);

module.exports = {
  path: 'recover_account_step_1',
  component: RecoverAccountStep1
};