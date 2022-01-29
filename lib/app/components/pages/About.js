"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _react = _interopRequireDefault(require("react"));

var _client_config = require("app/client_config");

var _counterpart = _interopRequireDefault(require("counterpart"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var About = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(About, _React$Component);

  var _super = _createSuper(About);

  function About() {
    (0, _classCallCheck2["default"])(this, About);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(About, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "About"
      }, /*#__PURE__*/_react["default"].createElement("section", {
        className: "AboutMission"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "AboutMission__heading-container"
      }, /*#__PURE__*/_react["default"].createElement("h1", {
        className: "AboutMission__heading"
      }, "About Blurt"))));
    }
  }]);
  return About;
}(_react["default"].Component);

module.exports = {
  path: 'about.html',
  component: About
};