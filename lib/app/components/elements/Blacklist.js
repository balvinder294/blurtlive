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

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _Icon = _interopRequireDefault(require("./Icon"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var Blacklist = /*#__PURE__*/function (_Component) {
  (0, _inherits2["default"])(Blacklist, _Component);

  var _super = _createSuper(Blacklist);

  function Blacklist() {
    (0, _classCallCheck2["default"])(this, Blacklist);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(Blacklist, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          blacklist = _this$props.blacklist,
          author = _this$props.author,
          coalStatus = _this$props.coalStatus; // redux

      if (coalStatus === 'enabled') {
        var blacklisted = blacklist.get(author);

        if (blacklisted !== undefined) {
          var description = "@".concat(blacklisted.reason, ": ").concat(blacklisted.notes, "\nIf you believe this is in error, please contact us in #apeals discord.blurt.world");
          return /*#__PURE__*/_react["default"].createElement("span", {
            title: description
          }, /*#__PURE__*/_react["default"].createElement(_Icon["default"], {
            name: "alert"
          }));
        }
      }

      return null;
    }
  }]);
  return Blacklist;
}(_react.Component);

var _default = (0, _reactRedux.connect)(function (state, ownProps) {
  var userPreferences = state.app.get('user_preferences').toJS();
  var coalStatus = 'enabled';
  var blacklist = state.global.getIn(['blacklist']) == undefined ? undefined : state.global.getIn(['blacklist']);
  return {
    blacklist: blacklist,
    coalStatus: coalStatus
  };
})(Blacklist);

exports["default"] = _default;