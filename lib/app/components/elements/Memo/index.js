"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.Memo = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var _shouldComponentUpdate = _interopRequireDefault(require("app/utils/shouldComponentUpdate"));

var _counterpart = _interopRequireDefault(require("counterpart"));

var _classnames = _interopRequireDefault(require("classnames"));

var _blurtjs = require("@blurtfoundation/blurtjs");

var _BadActorList = _interopRequireDefault(require("app/utils/BadActorList"));

var _ParsersAndFormatters = require("app/utils/ParsersAndFormatters");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var MINIMUM_REPUTATION = 15;

var Memo = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(Memo, _React$Component);

  var _super = _createSuper(Memo);

  function Memo() {
    var _this;

    (0, _classCallCheck2["default"])(this, Memo);
    _this = _super.call(this);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onRevealMemo", function (e) {
      e.preventDefault();

      _this.setState({
        revealMemo: true
      });
    });
    _this.shouldComponentUpdate = (0, _shouldComponentUpdate["default"])((0, _assertThisInitialized2["default"])(_this), 'Memo');
    _this.state = {
      revealMemo: false
    };
    return _this;
  }

  (0, _createClass2["default"])(Memo, [{
    key: "decodeMemo",
    value: function decodeMemo(memo_private, text) {
      try {
        return _blurtjs.memo.decode(memo_private, text);
      } catch (e) {
        console.error('memo decryption error', text, e);
        return 'Invalid memo';
      }
    }
  }, {
    key: "render",
    value: function render() {
      var decodeMemo = this.decodeMemo;
      var _this$props = this.props,
          memo_private = _this$props.memo_private,
          text = _this$props.text,
          myAccount = _this$props.myAccount,
          fromAccount = _this$props.fromAccount,
          fromNegativeRepUser = _this$props.fromNegativeRepUser;
      var isEncoded = /^#/.test(text);
      var isFromBadActor = _BadActorList["default"].indexOf(fromAccount) > -1;
      if (!text || text.length < 1) return /*#__PURE__*/_react["default"].createElement("span", null);
      var classes = (0, _classnames["default"])({
        Memo: true,
        'Memo--badActor': isFromBadActor,
        'Memo--fromNegativeRepUser': fromNegativeRepUser,
        'Memo--private': memo_private
      });
      var renderText = '';

      if (!isEncoded) {
        renderText = text;
      } else if (memo_private) {
        renderText = myAccount ? decodeMemo(memo_private, text) : (0, _counterpart["default"])('g.login_to_see_memo');
      }

      return /*#__PURE__*/_react["default"].createElement("span", {
        className: classes
      }, renderText);
    }
  }]);
  return Memo;
}(_react["default"].Component);

exports.Memo = Memo;
(0, _defineProperty2["default"])(Memo, "propTypes", {
  text: _propTypes["default"].string,
  username: _propTypes["default"].string,
  fromAccount: _propTypes["default"].string,
  // redux props
  myAccount: _propTypes["default"].bool,
  memo_private: _propTypes["default"].object,
  fromNegativeRepUser: _propTypes["default"].bool.isRequired
});

var _default = (0, _reactRedux.connect)(function (state, ownProps) {
  var currentUser = state.user.get('current');
  var myAccount = currentUser && ownProps.username === currentUser.get('username');
  var memo_private = myAccount && currentUser ? currentUser.getIn(['private_keys', 'memo_private']) : null;
  var fromNegativeRepUser = (0, _ParsersAndFormatters.repLog10)(state.global.getIn(['accounts', ownProps.fromAccount, 'reputation'])) < MINIMUM_REPUTATION;
  return _objectSpread(_objectSpread({}, ownProps), {}, {
    memo_private: memo_private,
    myAccount: myAccount,
    fromNegativeRepUser: fromNegativeRepUser
  });
})(Memo);

exports["default"] = _default;