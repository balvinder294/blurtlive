"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

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

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var appActions = _interopRequireWildcard(require("app/redux/AppReducer"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var ArticleLayoutSelector = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(ArticleLayoutSelector, _React$Component);

  var _super = _createSuper(ArticleLayoutSelector);

  function ArticleLayoutSelector() {
    (0, _classCallCheck2["default"])(this, ArticleLayoutSelector);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(ArticleLayoutSelector, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "articles__layout-selector"
      }, /*#__PURE__*/_react["default"].createElement("svg", {
        className: "articles__icon--layout",
        onClick: this.props.toggleBlogmode
      }, /*#__PURE__*/_react["default"].createElement("g", {
        id: "svg-icon-symbol-layout",
        viewBox: "0 0 24 24",
        stroke: "none",
        strokeWidth: 1,
        fill: "none",
        fillRule: "evenodd"
      }, /*#__PURE__*/_react["default"].createElement("rect", {
        className: "icon-svg icon-svg--accent icon-svg--layout-line1",
        x: 6,
        y: 16,
        width: 12,
        height: 2
      }), /*#__PURE__*/_react["default"].createElement("rect", {
        className: "icon-svg icon-svg--accent icon-svg--layout-line2",
        x: 6,
        y: 11,
        width: 12,
        height: 2
      }), /*#__PURE__*/_react["default"].createElement("rect", {
        className: "icon-svg icon-svg--accent icon-svg--layout-line3",
        x: 6,
        y: 6,
        width: 12,
        height: 2
      }), /*#__PURE__*/_react["default"].createElement("path", {
        d: "M2,2 L2,22 L22,22 L22,2 L2,2 Z M1,1 L23,1 L23,23 L1,23 L1,1 Z",
        id: "icon-svg__border",
        className: "icon-svg icon-svg--accent",
        fillRule: "nonzero"
      }))));
    }
  }]);
  return ArticleLayoutSelector;
}(_react["default"].Component);

var _default = (0, _reactRedux.connect)(function (state) {
  return {
    blogmode: state.app.getIn(['user_preferences', 'blogmode']) === undefined ? true : state.app.getIn(['user_preferences', 'blogmode'])
  };
}, function (dispatch) {
  return {
    toggleBlogmode: function toggleBlogmode() {
      dispatch(appActions.toggleBlogmode());
    }
  };
})(ArticleLayoutSelector);

exports["default"] = _default;