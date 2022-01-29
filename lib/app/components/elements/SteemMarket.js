"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _react = _interopRequireWildcard(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _reactRedux = require("react-redux");

var _reactSparklines = require("react-sparklines");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var Coin = /*#__PURE__*/function (_Component) {
  (0, _inherits2["default"])(Coin, _Component);

  var _super = _createSuper(Coin);

  function Coin(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, Coin);
    _this = _super.call(this, props);
    _this.onPointMouseMove = _this.onPointMouseMove.bind((0, _assertThisInitialized2["default"])(_this));
    _this.onPointMouseOut = _this.onPointMouseOut.bind((0, _assertThisInitialized2["default"])(_this));
    return _this;
  }

  (0, _createClass2["default"])(Coin, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var node = _reactDom["default"].findDOMNode(this.refs.coin);

      node.querySelectorAll('circle').forEach(function (circle) {
        circle.setAttribute('r', '8');
        circle.style.fillOpacity = 0;
        circle.style.cursor = 'pointer';
        circle.addEventListener('mouseover', _this2.onPointMouseMove);
      });
      node.querySelectorAll('polyline').forEach(function (circle) {
        circle.style.pointerEvents = 'none';
      });
      node.addEventListener('mouseout', this.onPointMouseOut);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var _this3 = this;

      var node = _reactDom["default"].findDOMNode(this.refs.coin);

      node.querySelectorAll('circle').forEach(function (circle) {
        circle.removeEventListener('mouseover', _this3.onPointMouseMove);
      });
      node.removeEventListener('mouseout', this.onPointMouseOut);
    }
  }, {
    key: "render",
    value: function render() {
      var color = this.props.color;
      var coin = this.props.coin;
      var name = coin.get('name');
      var symbol = coin.get('symbol');
      var timepoints = coin.get('timepoints');
      var priceUsd = timepoints.last().get('price_usd');
      var pricesUsd = timepoints.map(function (point) {
        return parseFloat(point.get('price_usd'));
      }).toJS();
      return /*#__PURE__*/_react["default"].createElement("div", {
        ref: "coin",
        className: "coin"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "chart"
      }, /*#__PURE__*/_react["default"].createElement(_reactSparklines.Sparklines, {
        data: pricesUsd
      }, /*#__PURE__*/_react["default"].createElement(_reactSparklines.SparklinesLine, {
        color: color,
        style: {
          strokeWidth: 3.0
        },
        onMouseMove: function onMouseMove(e) {
          console.log(e);
        }
      })), /*#__PURE__*/_react["default"].createElement("div", {
        className: "caption"
      })), /*#__PURE__*/_react["default"].createElement("div", {
        className: "coin-label"
      }, /*#__PURE__*/_react["default"].createElement("span", {
        className: "symbol"
      }, symbol), ' ', /*#__PURE__*/_react["default"].createElement("span", {
        className: "price"
      }, parseFloat(priceUsd).toFixed(2))));
    }
  }, {
    key: "onPointMouseMove",
    value: function onPointMouseMove(e) {
      var node = _reactDom["default"].findDOMNode(this.refs.coin);

      var caption = node.querySelector('.caption');
      var circle = e.currentTarget;
      var circles = node.querySelectorAll('circle');
      var index = Array.prototype.indexOf.call(circles, circle);
      var points = this.props.coin.get('timepoints');
      var point = points.get(index);
      var priceUsd = parseFloat(point.get('price_usd')).toFixed(2);
      var timepoint = point.get('timepoint');
      var time = new Date(timepoint).toLocaleString();
      caption.innerText = "$".concat(priceUsd, " ").concat(time);
    }
  }, {
    key: "onPointMouseOut",
    value: function onPointMouseOut(e) {
      var node = _reactDom["default"].findDOMNode(this.refs.coin);

      var caption = node.querySelector('.caption');
      caption.innerText = '';
    }
  }]);
  return Coin;
}(_react.Component);

var SteemMarket = /*#__PURE__*/function (_Component2) {
  (0, _inherits2["default"])(SteemMarket, _Component2);

  var _super2 = _createSuper(SteemMarket);

  function SteemMarket() {
    (0, _classCallCheck2["default"])(this, SteemMarket);
    return _super2.apply(this, arguments);
  }

  (0, _createClass2["default"])(SteemMarket, [{
    key: "render",
    value: function render() {
      var steemMarketData = this.props.steemMarketData;

      if (steemMarketData.isEmpty()) {
        return null;
      }

      var topCoins = steemMarketData.get('top_coins');
      var blurt = steemMarketData.get('blurt');
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "c-sidebar__module"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "c-sidebar__header"
      }, /*#__PURE__*/_react["default"].createElement("h3", {
        className: "c-sidebar__h3"
      }, "Coin Marketplace")), /*#__PURE__*/_react["default"].createElement("div", {
        className: "c-sidebar__content"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "blurt-market"
      }, /*#__PURE__*/_react["default"].createElement(Coin, {
        coin: blurt,
        color: "#09d6a8"
      }), topCoins.map(function (coin) {
        return /*#__PURE__*/_react["default"].createElement(Coin, {
          key: coin.get('name'),
          coin: coin,
          color: "#788187"
        });
      }))));
    }
  }]);
  return SteemMarket;
}(_react.Component);

var _default = (0, _reactRedux.connect)( // mapStateToProps
function (state, ownProps) {
  var steemMarketData = state.app.get('steemMarket');
  return _objectSpread(_objectSpread({}, ownProps), {}, {
    steemMarketData: steemMarketData
  });
}, // mapDispatchToProps
function (dispatch) {
  return {};
})(SteemMarket);

exports["default"] = _default;