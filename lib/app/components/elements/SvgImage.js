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

var SvgImage = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(SvgImage, _React$Component);

  var _super = _createSuper(SvgImage);

  function SvgImage() {
    (0, _classCallCheck2["default"])(this, SvgImage);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(SvgImage, [{
    key: "render",
    value: function render() {
      var style = {
        display: 'inline-block',
        width: this.props.width,
        height: this.props.height
      };

      var image = require("assets/images/".concat(this.props.name, ".svg"));

      var cn = 'SvgImage' + (this.props.className ? ' ' + this.props.className : '');
      return /*#__PURE__*/_react["default"].createElement("span", {
        className: cn,
        style: style,
        dangerouslySetInnerHTML: {
          __html: image
        }
      });
    }
  }]);
  return SvgImage;
}(_react["default"].Component);

exports["default"] = SvgImage;
(0, _defineProperty2["default"])(SvgImage, "propTypes", {
  name: _propTypes["default"].string.isRequired,
  width: _propTypes["default"].string.isRequired,
  height: _propTypes["default"].string.isRequired,
  className: _propTypes["default"].string
});