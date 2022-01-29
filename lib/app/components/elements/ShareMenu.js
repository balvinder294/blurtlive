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

var _reactRouter = require("react-router");

var _Icon = _interopRequireDefault(require("app/components/elements/Icon"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var ShareMenu = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(ShareMenu, _React$Component);

  var _super = _createSuper(ShareMenu);

  function ShareMenu() {
    (0, _classCallCheck2["default"])(this, ShareMenu);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(ShareMenu, [{
    key: "render",
    value: function render() {
      var title = this.props.title;
      var items = this.props.menu;
      return /*#__PURE__*/_react["default"].createElement("span", {
        className: 'shareMenu'
      }, /*#__PURE__*/_react["default"].createElement("ul", {
        className: 'shareItems'
      }, title && /*#__PURE__*/_react["default"].createElement("li", {
        className: "title"
      }, title), items.map(function (i) {
        return /*#__PURE__*/_react["default"].createElement("li", {
          key: i.value
        }, i.link ? /*#__PURE__*/_react["default"].createElement(_reactRouter.Link, {
          to: i.link,
          onClick: i.onClick,
          title: i.title
        }, i.icon && /*#__PURE__*/_react["default"].createElement(_Icon["default"], {
          name: i.icon
        }), "\xA0 ", i.addon) : /*#__PURE__*/_react["default"].createElement("span", null, i.icon && /*#__PURE__*/_react["default"].createElement(_Icon["default"], {
          name: i.icon
        }), i.label ? i.label : i.value));
      })));
    }
  }]);
  return ShareMenu;
}(_react["default"].Component);

exports["default"] = ShareMenu;
(0, _defineProperty2["default"])(ShareMenu, "propTypes", {
  menu: _propTypes["default"].arrayOf(_propTypes["default"].object).isRequired,
  title: _propTypes["default"].string
});