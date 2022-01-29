"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

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

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _Links = _interopRequireDefault(require("app/utils/Links"));

var _reactRouter = require("react-router");

var _shouldComponentUpdate = _interopRequireDefault(require("app/utils/shouldComponentUpdate"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var Link = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(Link, _React$Component);

  var _super = _createSuper(Link);

  function Link(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, Link);
    _this = _super.call(this);
    var href = props.href;
    _this.shouldComponentUpdate = (0, _shouldComponentUpdate["default"])((0, _assertThisInitialized2["default"])(_this), 'Link');
    _this.localLink = href && _Links["default"].local.test(href);

    _this.onLocalClick = function (e) {
      e.preventDefault();

      _reactRouter.browserHistory.push(_this.props.href);
    };

    return _this;
  }

  (0, _createClass2["default"])(Link, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          href = _this$props.href,
          children = _this$props.children,
          onLocalClick = this.onLocalClick;
      if (this.localLink) return /*#__PURE__*/_react["default"].createElement("a", {
        onClick: onLocalClick
      }, children);
      return /*#__PURE__*/_react["default"].createElement("a", {
        target: "_blank",
        rel: "noopener",
        href: href
      }, children);
    }
  }]);
  return Link;
}(_react["default"].Component);

exports["default"] = Link;
(0, _defineProperty2["default"])(Link, "propTypes", {
  // HTML properties
  href: _propTypes["default"].string
});