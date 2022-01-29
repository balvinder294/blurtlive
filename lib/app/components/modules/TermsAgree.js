"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

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

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var _counterpart = _interopRequireDefault(require("counterpart"));

var _Translator = require("app/Translator");

var _HelpContent = _interopRequireDefault(require("app/components/elements/HelpContent"));

var userActions = _interopRequireWildcard(require("app/redux/UserReducer"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var TermsAgree = /*#__PURE__*/function (_Component) {
  (0, _inherits2["default"])(TermsAgree, _Component);

  var _super = _createSuper(TermsAgree);

  function TermsAgree() {
    var _this;

    (0, _classCallCheck2["default"])(this, TermsAgree);
    _this = _super.call(this);
    _this.state = {
      tosChecked: false,
      privacyChecked: false
    };
    _this.termsAgree = _this.termsAgree.bind((0, _assertThisInitialized2["default"])(_this));
    _this.handleInputChange = _this.handleInputChange.bind((0, _assertThisInitialized2["default"])(_this));
    return _this;
  }

  (0, _createClass2["default"])(TermsAgree, [{
    key: "handleInputChange",
    value: function handleInputChange(event) {
      var target = event.target;
      var value = target.type === 'checkbox' ? target.checked : target.value;
      var name = target.name;
      this.setState((0, _defineProperty2["default"])({}, name, value));
    }
  }, {
    key: "termsAgree",
    value: function termsAgree(e) {
      // let user proceed
      this.props.acceptTerms(e);
    }
  }, {
    key: "render",
    value: function render() {
      var username = this.props.username;
      return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("h4", null, (0, _counterpart["default"])('termsagree_jsx.please_review')), /*#__PURE__*/_react["default"].createElement("p", null, (0, _counterpart["default"])('termsagree_jsx.hi_user', {
        username: username
      })), /*#__PURE__*/_react["default"].createElement("p", null, (0, _counterpart["default"])('termsagree_jsx.blurb')), /*#__PURE__*/_react["default"].createElement("p", null, /*#__PURE__*/_react["default"].createElement("label", null, /*#__PURE__*/_react["default"].createElement("input", {
        name: "tosChecked",
        type: "checkbox",
        checked: this.state.tosChecked,
        onChange: this.handleInputChange
      }), (0, _counterpart["default"])('termsagree_jsx.i_agree_to_steemits'), ' ', /*#__PURE__*/_react["default"].createElement("a", {
        target: "_blank",
        rel: "noopener noreferrer",
        href: "/tos.html"
      }, (0, _counterpart["default"])('termsagree_jsx.terms_of_service')))), /*#__PURE__*/_react["default"].createElement("p", null, /*#__PURE__*/_react["default"].createElement("label", null, /*#__PURE__*/_react["default"].createElement("input", {
        name: "privacyChecked",
        type: "checkbox",
        checked: this.state.privacyChecked,
        onChange: this.handleInputChange
      }), (0, _counterpart["default"])('termsagree_jsx.i_agree_to_steemits'), ' ', /*#__PURE__*/_react["default"].createElement("a", {
        target: "_blank",
        rel: "noopener noreferrer",
        href: "/privacy.html"
      }, (0, _counterpart["default"])('termsagree_jsx.privacy_policy')))), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("button", {
        type: "submit",
        className: "button",
        onClick: this.termsAgree,
        disabled: !this.state.tosChecked || !this.state.privacyChecked
      }, (0, _counterpart["default"])('termsagree_jsx.continue'))));
    }
  }]);
  return TermsAgree;
}(_react.Component);

(0, _defineProperty2["default"])(TermsAgree, "propTypes", {
  username: _propTypes["default"].string.isRequired,
  acceptTerms: _propTypes["default"].func.isRequired
});

var _default = (0, _reactRedux.connect)(function (state) {
  return {
    username: state.user.getIn(['current', 'username'])
  };
}, function (dispatch) {
  return {
    acceptTerms: function acceptTerms(e) {
      if (e) e.preventDefault();
      dispatch(userActions.acceptTerms());
    }
  };
})(TermsAgree); // mapStateToProps


exports["default"] = _default;