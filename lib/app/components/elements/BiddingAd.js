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

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var BiddingAd = /*#__PURE__*/function (_Component) {
  (0, _inherits2["default"])(BiddingAd, _Component);

  var _super = _createSuper(BiddingAd);

  function BiddingAd(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, BiddingAd);
    _this = _super.call(this, props);
    var ad = props.ad,
        enabled = props.enabled,
        type = props.type;
    _this.ad = {};
    _this.type = type;
    _this.enabled = false;

    if (ad) {
      // console.info(
      //     `Slot named '${props.slotName}' will render with given data:`,
      //     ad
      // );
      _this.enabled = enabled;
      _this.ad = ad.toJS();
    } else {// console.info(
      //     `Slot named '${
      //         props.slotName
      //     }' will be disabled because we were unable to find the ad details.`
      // );
    }

    return _this;
  }

  (0, _createClass2["default"])(BiddingAd, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      if (!this.ad.path || !this.enabled) return;
      googletag.cmd.push(function () {
        var slot = googletag.defineSlot(_this2.ad.path, _this2.ad.dimensions, _this2.ad.path);

        if (slot) {
          slot.addService(googletag.pubads());
          googletag.pubads().enableSingleRequest();
          googletag.enableServices();
          googletag.cmd.push(function () {
            googletag.display(_this2.ad.path);

            _this2.refreshBid(_this2.ad.path, slot);

            googletag.pubads().addEventListener('impressionViewable', function (e) {
              window.dispatchEvent(new Event('gptadshown', e));
            });
            googletag.pubads().addEventListener('slotRenderEnded', function (e) {
              window.dispatchEvent(new Event('gptadshown', e));
            });
          });
        }
      });
    }
  }, {
    key: "refreshBid",
    value: function refreshBid(path, slot) {
      pbjs.que.push(function () {
        pbjs.requestBids({
          timeout: 2000,
          adUnitCodes: [path],
          bidsBackHandler: function bidsBackHandler() {
            pbjs.setTargetingForGPTAsync([path]);
            googletag.pubads().refresh([slot]);
          }
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "bidding-ad gpt-ad",
        style: {
          width: '100%'
        },
        id: this.ad.path
      });
    }
  }]);
  return BiddingAd;
}(_react.Component);

BiddingAd.propTypes = {
  ad: _react.PropTypes.shape({
    path: _react.PropTypes.string,
    dimensions: _react.PropTypes.array
  }).isRequired,
  enabled: _react.PropTypes.bool.isRequired,
  type: _react.PropTypes.oneOf(['Bidding', 'Category', 'Basic'])
};

var _default = (0, _reactRedux.connect)(function (state, props) {
  var enabled = !!state.app.getIn(['googleAds', 'gptEnabled']) && !!process.env.BROWSER && !!window.googletag;
  var postCategory = state.global.get('postCategory');
  var basicSlots = state.app.getIn(['googleAds', 'gptBasicSlots']);
  var biddingSlots = state.app.getIn(['googleAds', 'gptBiddingSlots']);
  var categorySlots = state.app.getIn(['googleAds', 'gptCategorySlots']);
  var slotName = props.slotName;
  var type = props.type;
  var slot = state.app.getIn(['googleAds', "gpt".concat(type, "Slots"), slotName]);
  return _objectSpread({
    enabled: enabled,
    ad: slot
  }, props);
}, function (dispatch) {
  return {};
})(BiddingAd);

exports["default"] = _default;