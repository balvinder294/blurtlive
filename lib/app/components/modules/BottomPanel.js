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

var _CloseButton = _interopRequireDefault(require("app/components/elements/CloseButton"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var BottomPanel = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(BottomPanel, _React$Component);

  var _super = _createSuper(BottomPanel);

  function BottomPanel() {
    (0, _classCallCheck2["default"])(this, BottomPanel);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(BottomPanel, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.visible) {
        document.addEventListener('click', this.props.hide);
      } else {
        document.removeEventListener('click', this.props.hide);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      document.removeEventListener('click', this.props.hide);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          visible = _this$props.visible,
          hide = _this$props.hide;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "BottomPanel"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: visible ? 'visible ' : ''
      }, /*#__PURE__*/_react["default"].createElement(_CloseButton["default"], {
        onClick: hide
      }), children));
    }
  }]);
  return BottomPanel;
}(_react["default"].Component);

exports["default"] = BottomPanel;
(0, _defineProperty2["default"])(BottomPanel, "propTypes", {
  children: _propTypes["default"].object,
  visible: _propTypes["default"].bool,
  hide: _propTypes["default"].func.isRequired
});