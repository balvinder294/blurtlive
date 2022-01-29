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

var GptAd = /*#__PURE__*/function (_Component) {
  (0, _inherits2["default"])(GptAd, _Component);

  var _super = _createSuper(GptAd);

  function GptAd(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, GptAd);
    _this = _super.call(this, props);
    var ad_identifier = props.ad_identifier,
        enabled = props.enabled,
        type = props.type,
        tags = props.tags,
        bannedTags = props.bannedTags;
    _this.ad_identifier = '';
    _this.type = type;
    _this.enabled = false;
    _this.tags = tags;
    _this.bannedTags = bannedTags;

    if (ad_identifier != '') {
      // console.info(
      //     `ad_identifier of '${ad_identifier}' will render.`,
      //     ad_identifier
      // );
      _this.enabled = enabled;
      _this.ad_identifier = ad_identifier;
    } else {// console.info(
      //     `Slot named '${
      //         props.slotName
      //     }' will be disabled because we were unable to find the ad details.`
      // );
    }

    _this.unique_slot_id = "".concat(_this.ad_identifier, "_").concat(Date.now());
    return _this;
  }

  (0, _createClass2["default"])(GptAd, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (!this.ad_identifier || !this.enabled) return;
      var ad_identifier = this.ad_identifier;
      var unique_slot_id = this.unique_slot_id;
      window.optimize.queue.push(function () {
        window.optimize.push(unique_slot_id);
        googletag.pubads().addEventListener('impressionViewable', function (e) {
          window.dispatchEvent(new Event('gptadshown', e));
        });
        googletag.pubads().addEventListener('slotRenderEnded', function (e) {
          window.dispatchEvent(new Event('gptadshown', e));
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      if (!this.ad_identifier || !this.enabled) {
        return /*#__PURE__*/_react["default"].createElement("div", {
          id: "disabled_ad",
          style: {
            display: 'none'
          }
        });
      }

      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "gpt-ad",
        style: {
          width: '100%'
        },
        id: this.unique_slot_id
      });
    }
  }]);
  return GptAd;
}(_react.Component);

GptAd.propTypes = {
  ad_identifier: _react.PropTypes.string.isRequired,
  enabled: _react.PropTypes.bool.isRequired,
  type: _react.PropTypes.oneOf(['Bidding', 'Category', 'Basic', 'Freestar']),
  tags: _react.PropTypes.arrayOf(_react.PropTypes.string),
  bannedTags: _react.PropTypes.arrayOf(_react.PropTypes.string).isRequired
};
GptAd.defaultProps = {
  type: 'Freestar',
  tags: []
};

var _default = (0, _reactRedux.connect)(function (state, props) {
  var enabled = !!state.app.getIn(['googleAds', 'gptEnabled']) && !!process.env.BROWSER && !!window.googletag;
  var postCategory = state.global.get('postCategory');
  var basicSlots = state.app.getIn(['googleAds', 'gptBasicSlots']);
  var biddingSlots = state.app.getIn(['googleAds', 'gptBiddingSlots']);
  var categorySlots = state.app.getIn(['googleAds', 'gptCategorySlots']);
  var bannedTags = state.app.getIn(['googleAds', 'gptBannedTags']);
  var bannedTagsJS = bannedTags ? bannedTags.toJS() : [];
  var slotName = props.slotName;

  if (!slotName) {
    slotName = props.id;
  }

  var type = props.type;
  var slot = slotName; // in case it's Freestar

  if (type != 'Freestar') {
    slot = state.app.getIn(['googleAds', "gpt".concat(type, "Slots"), slotName]);
  }

  return _objectSpread({
    enabled: enabled,
    ad: slot,
    // TODO: Clean this up. This is from old GPT/Coinzilla stuffs
    ad_identifier: slotName,
    bannedTagsJS: bannedTagsJS
  }, props);
}, function (dispatch) {
  return {};
})(GptAd);

exports["default"] = _default;