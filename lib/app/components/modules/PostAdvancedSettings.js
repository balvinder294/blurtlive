"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _ReactForm = _interopRequireDefault(require("app/utils/ReactForm"));

var _constants = require("shared/constants");

var _counterpart = _interopRequireDefault(require("counterpart"));

var _immutable = require("immutable");

var _BeneficiarySelector = _interopRequireWildcard(require("app/components/cards/BeneficiarySelector"));

var userActions = _interopRequireWildcard(require("app/redux/UserReducer"));

var _reactRedux = require("react-redux");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var PostAdvancedSettings = /*#__PURE__*/function (_Component) {
  (0, _inherits2["default"])(PostAdvancedSettings, _Component);

  var _super = _createSuper(PostAdvancedSettings);

  function PostAdvancedSettings(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, PostAdvancedSettings);
    _this = _super.call(this);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "handlePayoutChange", function (event) {
      _this.setState({
        payoutType: event.target.value
      });
    });
    _this.state = {
      payoutType: props.initialPayoutType
    };

    _this.initForm(props);

    return _this;
  }

  (0, _createClass2["default"])(PostAdvancedSettings, [{
    key: "initForm",
    value: function initForm(props) {
      var fields = props.fields;
      (0, _ReactForm["default"])({
        fields: fields,
        instance: this,
        name: 'advancedSettings',
        initialValues: props.initialValues,
        validation: function validation(values) {
          return {
            beneficiaries: (0, _BeneficiarySelector.validateBeneficiaries)(props.username, values.beneficiaries, false)
          };
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          formId = _this$props.formId,
          username = _this$props.username,
          defaultPayoutType = _this$props.defaultPayoutType,
          initialPayoutType = _this$props.initialPayoutType;
      var _this$state = this.state,
          beneficiaries = _this$state.beneficiaries,
          payoutType = _this$state.payoutType;
      var _this$state$advancedS = this.state.advancedSettings,
          submitting = _this$state$advancedS.submitting,
          valid = _this$state$advancedS.valid,
          handleSubmit = _this$state$advancedS.handleSubmit;
      var disabled = submitting || !(valid || payoutType !== initialPayoutType);

      var form = /*#__PURE__*/_react["default"].createElement("form", {
        onSubmit: handleSubmit(function (_ref) {
          var data = _ref.data;
          var err = (0, _BeneficiarySelector.validateBeneficiaries)(_this2.props.username, data.beneficiaries, true);

          if (!err) {
            _this2.props.setPayoutType(formId, payoutType);

            _this2.props.setBeneficiaries(formId, data.beneficiaries);

            _this2.props.hideAdvancedSettings();
          }
        })
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "row"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "column"
      }, /*#__PURE__*/_react["default"].createElement("h4", null, (0, _counterpart["default"])('post_advanced_settings_jsx.payout_option_header')), /*#__PURE__*/_react["default"].createElement("p", null, (0, _counterpart["default"])('post_advanced_settings_jsx.payout_option_description')))), /*#__PURE__*/_react["default"].createElement("div", {
        className: "row"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "small-12 medium-6 large-12 columns"
      }, /*#__PURE__*/_react["default"].createElement("select", {
        defaultValue: payoutType,
        onChange: this.handlePayoutChange
      }, /*#__PURE__*/_react["default"].createElement("option", {
        value: "0%"
      }, (0, _counterpart["default"])('reply_editor.decline_payout')), /*#__PURE__*/_react["default"].createElement("option", {
        value: "75%"
      }, (0, _counterpart["default"])('reply_editor.power_up_25_75')), /*#__PURE__*/_react["default"].createElement("option", {
        value: "100%"
      }, (0, _counterpart["default"])('reply_editor.power_up_100'))))), /*#__PURE__*/_react["default"].createElement("br", null), /*#__PURE__*/_react["default"].createElement("div", {
        className: "row"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "column"
      }, (0, _counterpart["default"])('post_advanced_settings_jsx.current_default'), ":", ' ', defaultPayoutType === '0%' ? (0, _counterpart["default"])('reply_editor.decline_payout') : (0, _counterpart["default"])('reply_editor.power_up_25_75'))), /*#__PURE__*/_react["default"].createElement("div", {
        className: "row"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "column"
      }, /*#__PURE__*/_react["default"].createElement("a", {
        href: '/@' + username + '/settings'
      }, (0, _counterpart["default"])('post_advanced_settings_jsx.update_default_in_settings')))), /*#__PURE__*/_react["default"].createElement("br", null), /*#__PURE__*/_react["default"].createElement("div", {
        className: "row"
      }, /*#__PURE__*/_react["default"].createElement("h4", {
        className: "column"
      }, (0, _counterpart["default"])('beneficiary_selector_jsx.header'))), /*#__PURE__*/_react["default"].createElement(_BeneficiarySelector["default"], (0, _extends2["default"])({}, beneficiaries.props, {
        tabIndex: 1
      })), /*#__PURE__*/_react["default"].createElement("div", {
        className: "error"
      }, (beneficiaries.touched || beneficiaries.value) && beneficiaries.error, "\xA0"), /*#__PURE__*/_react["default"].createElement("div", {
        className: "row"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "column"
      }, /*#__PURE__*/_react["default"].createElement("span", null, /*#__PURE__*/_react["default"].createElement("button", {
        type: "submit",
        className: "button",
        disabled: disabled,
        tabIndex: 2
      }, (0, _counterpart["default"])('g.save'))))));

      return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("div", {
        className: "row"
      }, /*#__PURE__*/_react["default"].createElement("h3", {
        className: "column"
      }, (0, _counterpart["default"])('reply_editor.advanced_settings'))), /*#__PURE__*/_react["default"].createElement("hr", null), form);
    }
  }]);
  return PostAdvancedSettings;
}(_react.Component);

(0, _defineProperty2["default"])(PostAdvancedSettings, "propTypes", {
  formId: _react["default"].PropTypes.string.isRequired
});

var _default = (0, _reactRedux.connect)( // mapStateToProps
function (state, ownProps) {
  var formId = ownProps.formId;
  var username = state.user.getIn(['current', 'username']);
  var isStory = formId === _constants.SUBMIT_FORM_ID;
  var defaultPayoutType = state.app.getIn(['user_preferences', isStory ? 'defaultBlogPayout' : 'defaultCommentPayout'], '100%');
  var initialPayoutType = state.user.getIn(['current', 'post', formId, 'payoutType']);
  var beneficiaries = state.user.getIn(['current', 'post', formId, 'beneficiaries']);
  console.log(beneficiaries);
  beneficiaries = beneficiaries ? beneficiaries.toJS() : [];
  return _objectSpread(_objectSpread({}, ownProps), {}, {
    fields: ['beneficiaries'],
    defaultPayoutType: defaultPayoutType,
    initialPayoutType: initialPayoutType,
    username: username,
    initialValues: {
      beneficiaries: beneficiaries
    }
  });
}, // mapDispatchToProps
function (dispatch) {
  return {
    hideAdvancedSettings: function hideAdvancedSettings() {
      return dispatch(userActions.hidePostAdvancedSettings());
    },
    setPayoutType: function setPayoutType(formId, payoutType) {
      return dispatch(userActions.set({
        key: ['current', 'post', formId, 'payoutType'],
        value: payoutType
      }));
    },
    setBeneficiaries: function setBeneficiaries(formId, beneficiaries) {
      return dispatch(userActions.set({
        key: ['current', 'post', formId, 'beneficiaries'],
        value: (0, _immutable.fromJS)(beneficiaries)
      }));
    }
  };
})(PostAdvancedSettings);

exports["default"] = _default;