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

var Qr = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(Qr, _React$Component);

  var _super = _createSuper(Qr);

  function Qr(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, Qr);
    _this = _super.call(this);

    _this.handleError = function (error) {
      console.error(error);
    };

    var onClose = props.onClose,
        handleScan = props.handleScan;

    _this.handleScan = function (data) {
      handleScan(data);
      if (onClose) onClose();
    };

    return _this;
  }

  (0, _createClass2["default"])(Qr, [{
    key: "render",
    value: function render() {
      var handleError = this.handleError,
          handleScan = this.handleScan; // Watch out, QrReader can mess up the nodejs server, tries to ref `navigator`
      // The server does not need a QrReader anyways

      if (!process.env.BROWSER) return /*#__PURE__*/_react["default"].createElement("span", null);
      return /*#__PURE__*/_react["default"].createElement("span", null); // a) Leaves the camera on when closing dialog - react-qr-reader v0.2.4
      // b) Only saw this work in Chrome - 0.2.4
      // try {
      //     const QrReader = require("react-qr-reader").default
      //     return <QrReader width={320} height={240} handleError={handleError}
      //         {...this.props} handleScan={handleScan} />
      // } catch(error) {
      //     console.log(error)
      //     return <span></span>
      // }
    }
  }]);
  return Qr;
}(_react["default"].Component);

exports["default"] = Qr;
(0, _defineProperty2["default"])(Qr, "propTypes", {
  handleScan: _propTypes["default"].func.isRequired,
  onClose: _propTypes["default"].func
});