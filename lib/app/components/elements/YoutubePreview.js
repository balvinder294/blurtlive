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

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _shouldComponentUpdate = _interopRequireDefault(require("app/utils/shouldComponentUpdate"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var string = _propTypes["default"].string,
    number = _propTypes["default"].number;
/** Lots of iframes in a post can be very slow.  This component only inserts the iframe when it is actually needed. */

var YoutubePreview = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(YoutubePreview, _React$Component);

  var _super = _createSuper(YoutubePreview);

  function YoutubePreview() {
    var _this;

    (0, _classCallCheck2["default"])(this, YoutubePreview);
    _this = _super.call(this);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "shouldComponentUpdate", (0, _shouldComponentUpdate["default"])((0, _assertThisInitialized2["default"])(_this), 'YoutubePreview'));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onPlay", function () {
      _this.setState({
        play: true
      });
    });
    _this.state = {};
    return _this;
  }

  (0, _createClass2["default"])(YoutubePreview, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          youTubeId = _this$props.youTubeId,
          width = _this$props.width,
          height = _this$props.height,
          startTime = _this$props.startTime,
          dataParams = _this$props.dataParams;
      var play = this.state.play;

      if (!play) {
        // mqdefault.jpg (medium quality version, 320px × 180px)
        // hqdefault.jpg (high quality version, 480px × 360px
        // sddefault.jpg (standard definition version, 640px × 480px)
        var thumbnail = width <= 320 ? 'mqdefault.jpg' : width <= 480 ? 'hqdefault.jpg' : '0.jpg';
        var previewLink = "https://img.youtube.com/vi/".concat(youTubeId, "/").concat(thumbnail);
        return /*#__PURE__*/_react["default"].createElement("div", {
          className: "videoWrapper youtube",
          onClick: this.onPlay,
          style: {
            backgroundImage: 'url(' + previewLink + ')'
          }
        }, /*#__PURE__*/_react["default"].createElement("div", {
          className: "play"
        }));
      }

      var autoPlaySrc = "https://www.youtube.com/embed/".concat(youTubeId, "?autoplay=1&autohide=1&").concat(dataParams, "&start=").concat(startTime);
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "videoWrapper"
      }, /*#__PURE__*/_react["default"].createElement("iframe", {
        width: width,
        height: height,
        src: autoPlaySrc,
        frameBorder: "0",
        allowFullScreen: "true"
      }));
    }
  }]);
  return YoutubePreview;
}(_react["default"].Component);

exports["default"] = YoutubePreview;
(0, _defineProperty2["default"])(YoutubePreview, "propTypes", {
  youTubeId: string.isRequired,
  width: number,
  height: number,
  startTime: number,
  dataParams: string
});
(0, _defineProperty2["default"])(YoutubePreview, "defaultProps", {
  width: 640,
  height: 360,
  startTime: 0,
  dataParams: 'enablejsapi=0&rel=0&origin=https://blurt.world'
});