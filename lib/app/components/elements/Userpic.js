"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.avatarSize = exports.SIZE_SMALL = exports.SIZE_MED = exports.SIZE_LARGE = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var _shouldComponentUpdate = _interopRequireDefault(require("app/utils/shouldComponentUpdate"));

var _ProxifyUrl = require("app/utils/ProxifyUrl");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var SIZE_SMALL = '64x64';
exports.SIZE_SMALL = SIZE_SMALL;
var SIZE_MED = '128x128';
exports.SIZE_MED = SIZE_MED;
var SIZE_LARGE = '512x512';
exports.SIZE_LARGE = SIZE_LARGE;
var sizeList = [SIZE_SMALL, SIZE_MED, SIZE_LARGE];
var avatarSize = {
  small: SIZE_SMALL,
  medium: SIZE_MED,
  large: SIZE_LARGE
};
exports.avatarSize = avatarSize;

var Userpic = /*#__PURE__*/function (_Component) {
  (0, _inherits2["default"])(Userpic, _Component);

  var _super = _createSuper(Userpic);

  function Userpic() {
    var _this;

    (0, _classCallCheck2["default"])(this, Userpic);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "shouldComponentUpdate", (0, _shouldComponentUpdate["default"])((0, _assertThisInitialized2["default"])(_this), 'Userpic'));
    return _this;
  }

  (0, _createClass2["default"])(Userpic, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          account = _this$props.account,
          json_metadata = _this$props.json_metadata,
          size = _this$props.size;
      var hideIfDefault = this.props.hideIfDefault || false;
      var avSize = size && sizeList.indexOf(size) > -1 ? '/' + size : '';

      if (avSize === '') {
        avSize = '/64x64';
      }

      if (hideIfDefault) {
        // try to extract image url from users metaData
        try {
          var md = JSON.parse(json_metadata);

          if (!/^(https?:)\/\//.test(md.profile.profile_image)) {
            return null;
          }
        } catch (e) {
          return null;
        }
      }

      var style = {
        backgroundImage: 'url(' + (0, _ProxifyUrl.imageProxy)() + "profileimage/".concat(account).concat(avSize, ")")
      };
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "Userpic",
        style: style
      });
    }
  }]);
  return Userpic;
}(_react.Component);

Userpic.propTypes = {
  account: _propTypes["default"].string.isRequired
};

var _default = (0, _reactRedux.connect)(function (state, ownProps) {
  var account = ownProps.account,
      hideIfDefault = ownProps.hideIfDefault;
  return {
    account: account,
    json_metadata: state.global.getIn(['accounts', account, 'json_metadata']),
    hideIfDefault: hideIfDefault
  };
})(Userpic);

exports["default"] = _default;