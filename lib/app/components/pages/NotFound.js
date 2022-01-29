"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _react = _interopRequireDefault(require("react"));

var _Icon = _interopRequireDefault(require("app/components/elements/Icon"));

var _BlurtLogo = _interopRequireDefault(require("app/components/elements/BlurtLogo"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var NotFound = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(NotFound, _React$Component);

  var _super = _createSuper(NotFound);

  function NotFound() {
    (0, _classCallCheck2["default"])(this, NotFound);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(NotFound, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("div", {
        className: "row Header__nav"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "small-5 large-4 columns Header__logotype"
      }, /*#__PURE__*/_react["default"].createElement("a", {
        href: "/"
      }, /*#__PURE__*/_react["default"].createElement(_BlurtLogo["default"], null)))), /*#__PURE__*/_react["default"].createElement("div", {
        className: "NotFound float-center"
      }, /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_Icon["default"], {
        name: "blurt",
        size: "4x"
      }), /*#__PURE__*/_react["default"].createElement("h4", {
        className: "NotFound__header"
      }, "Sorry! This page doesn't exist."), /*#__PURE__*/_react["default"].createElement("p", null, "Not to worry. You can head back to", ' ', /*#__PURE__*/_react["default"].createElement("a", {
        style: {
          fontWeight: 800
        },
        href: "/"
      }, "our homepage"), ", or check out some great posts."), /*#__PURE__*/_react["default"].createElement("ul", {
        className: "NotFound__menu"
      }, /*#__PURE__*/_react["default"].createElement("li", null, /*#__PURE__*/_react["default"].createElement("a", {
        href: "/created"
      }, "new posts")), /*#__PURE__*/_react["default"].createElement("li", null, /*#__PURE__*/_react["default"].createElement("a", {
        href: "/hot"
      }, "hot posts")), /*#__PURE__*/_react["default"].createElement("li", null, /*#__PURE__*/_react["default"].createElement("a", {
        href: "/trending"
      }, "trending posts")), /*#__PURE__*/_react["default"].createElement("li", null, /*#__PURE__*/_react["default"].createElement("a", {
        href: "/promoted"
      }, "promoted posts")), /*#__PURE__*/_react["default"].createElement("li", null, /*#__PURE__*/_react["default"].createElement("a", {
        href: "/active"
      }, "active posts"))))));
    }
  }]);
  return NotFound;
}(_react["default"].Component);

module.exports = {
  path: '*',
  component: NotFound
};