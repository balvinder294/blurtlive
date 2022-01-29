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

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var UserAvatar = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(UserAvatar, _React$Component);

  var _super = _createSuper(UserAvatar);

  function UserAvatar() {
    (0, _classCallCheck2["default"])(this, UserAvatar);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(UserAvatar, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      // to load google model viewer script
      var script = document.createElement('script');
      script.src = 'https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js';
      script.type = 'module';
      script.async = true;
      document.body.appendChild(script);
    }
  }, {
    key: "render",
    value: function render() {
      if (typeof window === 'undefined') return /*#__PURE__*/_react["default"].createElement("div", null);
      var avatarUrl = this.props.avatarUrl;
      if (!avatarUrl) return /*#__PURE__*/_react["default"].createElement("div", null);
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "row"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "column"
      }, /*#__PURE__*/_react["default"].createElement("model-viewer", {
        className: "Model-Viewer",
        src: avatarUrl,
        alt: "Ready Player me avatar",
        "camera-controls": true,
        "auto-rotate": true,
        poster: "/images/loading-animation.webp"
      })));
    }
  }]);
  return UserAvatar;
}(_react["default"].Component);

exports["default"] = UserAvatar;